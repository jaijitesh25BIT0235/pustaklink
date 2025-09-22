from app.db.session import SessionLocal
from app.models.listing import Listing
from app.models.user import User
from app.core.security import get_password_hash
import random, json
from datetime import datetime, timedelta

subjects = [
    "Computer Science", "Mathematics", "Physics", "Chemistry",
    "Electrical Engineering", "Mechanical Engineering",
    "Civil Engineering", "Biology", "Economics", "Business"
]
conditions = ["new", "like_new", "used", "worn"]

def seed():
    db = SessionLocal()
    try:
        # Create demo users if none
        if db.query(User).count() == 0:
            users = [
                User(
                    email=f"demo{i}@vitstudent.ac.in",
                    hashed_password=get_password_hash("password123"),
                    full_name=f"Demo User {i}",
                    college="VIT Vellore"
                )
                for i in range(1, 6)
            ]
            db.add_all(users)
            db.commit()

        user_ids = [u.id for u in db.query(User).all()]

        for i in range(1, 51):
            listing = Listing(
                isbn=f"978{random.randint(1000000000,9999999999)}",
                price=round(random.uniform(100, 2000), 2),
                condition=random.choice(conditions),
                subject=random.choice(subjects),
                semester=random.randint(1, 8),
                edition=random.randint(1, 4),
                description="Random test listing",
                images=json.dumps([f"https://picsum.photos/seed/{i}/400/300"]),
                location="VIT Vellore",
                seller_id=random.choice(user_ids),
                created_at=datetime.utcnow() - timedelta(days=random.randint(0, 60))
            )
            db.add(listing)
        db.commit()
        print("Seeding complete!")
    finally:
        db.close()

if __name__ == "__main__":
    seed()
