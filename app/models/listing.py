# app/models/listing.py
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from datetime import datetime
from app.db.base import Base
from sqlalchemy.orm import relationship

class Listing(Base):
    __tablename__ = "listings"
    id = Column(Integer, primary_key=True, index=True)
    isbn = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    condition = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    semester = Column(Integer, nullable=False)
    edition = Column(Integer, nullable=False)
    description = Column(Text)
    images = Column(Text)
    location = Column(String, nullable=False)
    seller_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)

    seller = relationship("User", back_populates="listings")
    reports = relationship("Report", back_populates="listing")
