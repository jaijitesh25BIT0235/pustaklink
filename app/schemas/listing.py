# app/schemas/listing.py
from pydantic import BaseModel, confloat, validator
from typing import Optional, List
from datetime import datetime
import json

class ListingBase(BaseModel):
    isbn: str
    price: confloat(gt=0)
    condition: str
    subject: str
    semester: int
    edition: int
    description: Optional[str] = None
    images: Optional[List[str]] = None
    location: str

class ListingCreate(ListingBase):
    pass

class ListingResponse(ListingBase):
    id: int
    seller_id: int
    created_at: datetime
    is_active: bool

    class Config:
        orm_mode = True

    # Convert DB-stored JSON string back into a Python list for the API response
    @validator("images", pre=True)
    def parse_images(cls, v):
        if v is None:
            return []
        if isinstance(v, str):
            try:
                return json.loads(v)
            except Exception:
                return []
        return v
