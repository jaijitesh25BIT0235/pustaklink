# app/api/listings.py
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.api.deps import get_db, get_current_user
from app.schemas.listing import ListingCreate, ListingResponse
from app.models.listing import Listing
from app.models.user import User
import json

router = APIRouter()

@router.post("", response_model=ListingResponse)
def create_listing(listing: ListingCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Create a listing. We build a single dict (listing_data), convert images -> JSON string for DB,
    and then pass that dict into the SQLAlchemy model constructor along with seller_id.
    This avoids passing the same 'images' kwarg twice.
    """
    listing_data = listing.dict()
    # Convert images list -> JSON string for DB storage (or None)
    images_list = listing_data.get("images")
    listing_data["images"] = json.dumps(images_list) if images_list else None

    # Now create the SQLAlchemy object (no duplicate keyword args)
    db_listing = Listing(**listing_data, seller_id=current_user.id)
    db.add(db_listing)
    db.commit()
    db.refresh(db_listing)
    return db_listing

@router.get("", response_model=List[ListingResponse])
def get_listings(
    subject: Optional[str] = None,
    semester: Optional[int] = None,
    price_min: Optional[float] = None,
    price_max: Optional[float] = None,
    condition: Optional[str] = None,
    edition: Optional[int] = None,
    sort: Optional[str] = "newest",
    limit: int = Query(20, ge=1),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    query = db.query(Listing).filter(Listing.is_active == True)
    if subject:
        query = query.filter(Listing.subject.ilike(f"%{subject}%"))
    if semester:
        query = query.filter(Listing.semester == semester)
    if price_min is not None:
        query = query.filter(Listing.price >= price_min)
    if price_max is not None:
        query = query.filter(Listing.price <= price_max)
    if condition:
        query = query.filter(Listing.condition == condition)
    if edition:
        query = query.filter(Listing.edition == edition)
    if sort == "price_asc":
        query = query.order_by(Listing.price.asc())
    elif sort == "price_desc":
        query = query.order_by(Listing.price.desc())
    else:
        query = query.order_by(Listing.created_at.desc())

    items = query.offset(offset).limit(limit).all()
    return items

@router.get("/{listing_id}", response_model=ListingResponse)
def get_listing(listing_id: int, db: Session = Depends(get_db)):
    listing = db.query(Listing).filter(Listing.id == listing_id, Listing.is_active == True).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    return listing

@router.post("/{listing_id}/mark_sold")
def mark_sold(listing_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    if listing.seller_id != current_user.id:
        raise HTTPException(status_code=403, detail="Only seller can mark as sold")
    listing.is_active = False
    db.commit()
    return {"status": "ok", "message": "Listing marked as sold"}
