from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base
from datetime import datetime

class Listing(Base):
    __tablename__ = "listings"

    id = Column(Integer, primary_key=True, index=True)
    isbn = Column(String, index=True, nullable=True)
    # lending duration (days) — we use time as currency instead of money
    lend_duration_days = Column(Integer, default=14, nullable=False)
    condition = Column(String, nullable=True)
    subject = Column(String, nullable=True)
    semester = Column(Integer, nullable=True)
    edition = Column(Integer, nullable=True)
    description = Column(String, nullable=True)
    # images stored as JSON string
    images = Column(String, nullable=True)
    location = Column(String, nullable=True)

    # the column that references the user who listed / owns the book
    seller_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    is_lent = Column(Boolean, default=False, nullable=False)

    # explicit relationship: owner -> User via seller_id
    owner = relationship("User", back_populates="listings", foreign_keys=[seller_id])

    # reports for this listing
    reports = relationship("Report", back_populates="listing", cascade="all, delete-orphan")

