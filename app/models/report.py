# app/models/report.py
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from datetime import datetime
from app.db.base import Base
from sqlalchemy.orm import relationship

class Report(Base):
    __tablename__ = "reports"
    id = Column(Integer, primary_key=True, index=True)
    listing_id = Column(Integer, ForeignKey("listings.id"))
    reporter_id = Column(Integer, ForeignKey("users.id"))
    reason = Column(String, nullable=False)
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Back-populates to Listing.reports and User.reports
    listing = relationship("Listing", back_populates="reports")
    reporter = relationship("User", back_populates="reports")
