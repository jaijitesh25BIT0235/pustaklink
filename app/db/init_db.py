# app/db/init_db.py
from app.db.session import SessionLocal
from app.models.user import User
from app.models.listing import Listing
from app.core.security import get_password_hash
import random, json

def seed_if_empty():
    db = SessionLocal()
    try:
        if db.query(User).count() == 0:
            users = []
            for i in range(1, 6):
                u = User(
                    email=f"user{i}@vitstudent.ac.in",
                    hashed_password=get_password_hash("password123"),
                    full_name=f"Student {i}",
                    college="VIT Vellore"
                )
                users.append(u)
            db.add_all(users)
            db.commit()

        if db.query(Listing).count() == 0:
            subjects = ["Computer Science", "Mathematics", "Physics", "Electrical"]
            fake_list = []
            for i in range(1, 11):
                fake_list.append(Listing(
                    isbn=f"978{random.randint(1000000000, 9999999999)}",
                    price=round(random.uniform(100, 1000),2),
                    condition=random.choice(["new","like_new","used","worn"]),
                    subject=random.choice(subjects),
                    semester=random.randint(1,8),
                    edition=random.randint(1,5),
                    description=f"Demo textbook {i}",
                    images=json.dumps([f"https://picsum.photos/seed/{i}/400/300"]),
                    location="VIT Vellore",
                    seller_id=random.randint(1,5),
                ))
            db.add_all(fake_list)
            db.commit()
    finally:
        db.close()
