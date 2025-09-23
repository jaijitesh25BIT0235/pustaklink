from pydantic import BaseModel
from datetime import datetime

class ReportBase(BaseModel):
    reason: str
    description: str
    listing_id: int

class ReportCreate(ReportBase):
    pass

class ReportResponse(ReportBase):
    id: int
    reporter_id: int
    created_at: datetime   # âœ… now works

    class Config:
        orm_mode = True


