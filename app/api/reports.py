# app/api/reports.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.report import ReportCreate, ReportResponse
from app.models.listing import Listing
from app.models.report import Report
from app.api.deps import get_db, get_current_user
from app.models.user import User

router = APIRouter()

@router.post("", response_model=ReportResponse)
def report_listing(report: ReportCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    listing = db.query(Listing).filter(Listing.id == report.listing_id, Listing.is_active == True).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    db_report = Report(**report.dict(), reporter_id=current_user.id)
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report


