from fastapi import APIRouter, Depends, HTTPException
from typing import List
import json

from app.schemas.listing import ListingCreate, ListingResponse, listing_to_response
from app.models.listing import Listing
from app.db.session import get_db
from sqlalchemy.orm import Session
from app.api.deps import get_current_user

router = APIRouter()

@router.post("/listing", response_model=ListingResponse)
def create_listing(listing: ListingCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    images_json = json.dumps(listing.images) if listing.images else None
    db_listing = Listing(
        isbn=listing.isbn,
        lend_duration_days=listing.lend_duration_days,
        condition=listing.condition,
        subject=listing.subject,
        semester=listing.semester,
        edition=listing.edition,
        description=listing.description,
        images=images_json,
        location=listing.location,
        seller_id=current_user.id,
        is_active=True
    )
    db.add(db_listing)
    db.commit()
    db.refresh(db_listing)
    return listing_to_response(db_listing)

@router.get("/listing", response_model=List[ListingResponse])
def list_listings(limit: int = 20, offset: int = 0, subject: str = None, db: Session = Depends(get_db)):
    q = db.query(Listing).filter(Listing.is_active == True)
    if subject:
        q = q.filter(Listing.subject == subject)
    db_list = q.order_by(Listing.created_at.desc()).offset(offset).limit(limit).all()
    return [listing_to_response(x) for x in db_list]

@router.get("/listing/{listing_id}", response_model=ListingResponse)
def get_listing(listing_id: int, db: Session = Depends(get_db)):
    obj = db.query(Listing).filter(Listing.id == listing_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Listing not found")
    return listing_to_response(obj)

@router.post("/listing/{listing_id}/mark_lent", response_model=ListingResponse)
def mark_lent(listing_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    obj = db.query(Listing).filter(Listing.id == listing_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Listing not found")
    if obj.seller_id != current_user.id:
        raise HTTPException(status_code=403, detail="Only seller can mark lent")
    obj.is_active = False
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return listing_to_response(obj)



# ---- borrow/lend: mark_lent endpoint added ----

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.schemas.listing import MarkLentRequest
from app.db.session import get_db
from app.models.listing import Listing
from app.models.user import User

router = APIRouter()

@router.post("/listing/{listing_id}/mark_lent")
def mark_lent(listing_id: int, req: MarkLentRequest, db: Session = Depends(get_db)):
    """
    Mark a listing as lent to borrower_id for lend_days (if provided) or listing.lend_duration_days.
    No money involved; time (days) is the currency.
    """
    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    if listing.is_lent:
        raise HTTPException(status_code=400, detail="Listing already lent")

    # validate borrower exists
    borrower = db.query(User).filter(User.id == req.borrower_id).first()
    if not borrower:
        raise HTTPException(status_code=404, detail="Borrower not found")

    days = req.lend_days if (req.lend_days and req.lend_days > 0) else listing.lend_duration_days
    lent_until_dt = datetime.utcnow() + timedelta(days=days)

    listing.is_lent = True
    listing.lent_to_id = req.borrower_id
    listing.lent_until = lent_until_dt

    db.add(listing)
    db.commit()
    db.refresh(listing)

    return {"detail": "Marked as lent", "listing": listing}
