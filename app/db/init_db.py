from sqlalchemy.orm import Session
from app.models.listing import Listing
from app.db.session import SessionLocal
import json, random
from datetime import datetime, timedelta

def seed_if_empty():
    db = SessionLocal()
    try:
        if db.query(Listing).count() == 0:
            subjects = ["Mathematics", "Physics", "Chemistry", "Computer Science", "Electrical Engineering"]
            for i in range(10):
                listing = Listing(
                    isbn=f"978{random.randint(1000000000,9999999999)}",
                    lend_duration_days=random.choice([7, 14, 21, 28]),
                    condition=random.choice(["like_new","used","worn"]),
                    subject=random.choice(subjects),
                    semester=random.randint(1,8),
                    edition=random.randint(1,4),
                    description="Demo listing for seeding",
                    images=json.dumps([f"https://example.com/book{i}.jpg"]),
                    location="VIT Vellore",
                    seller_id=1,
                    created_at=datetime.utcnow() - timedelta(days=random.randint(0,10)),
                    is_active=True
                )
                db.add(listing)
            db.commit()
    finally:
        db.close()

