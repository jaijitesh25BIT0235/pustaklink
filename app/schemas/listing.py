# app/schemas/listing.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# base fields used for creation/update
class ListingBase(BaseModel):
    isbn: Optional[str] = None
    lend_duration_days: int = 14
    condition: Optional[str] = None
    subject: Optional[str] = None
    semester: Optional[int] = None
    edition: Optional[int] = None
    description: Optional[str] = None
    images: Optional[str] = None
    location: Optional[str] = None

class ListingCreate(ListingBase):
    # any create-specific validation can go here
    pass

class ListingUpdate(ListingBase):
    is_active: Optional[bool] = None

# canonical response model used by your API code
class ListingResponse(ListingBase):
    id: int
    seller_id: int
    is_lent: bool
    lent_to_id: Optional[int] = None
    lent_until: Optional[datetime] = None
    created_at: datetime
    is_active: bool

    class Config:
        orm_mode = True

# request body for marking lent (borrow action)
class MarkLentRequest(BaseModel):
    borrower_id: int
    lend_days: Optional[int] = None

# helper to convert ORM model to ListingResponse instance (used by some APIs)
def listing_to_response(listing) -> ListingResponse:
    """
    Accepts a SQLAlchemy ORM Listing instance and returns a ListingResponse pydantic model.
    """
    if listing is None:
        return None
    # Pydantic's from_orm will read attributes from the SQLAlchemy object
    return ListingResponse.from_orm(listing)
