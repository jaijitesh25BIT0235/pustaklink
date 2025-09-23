# app/db/base_class.py
# SQLAlchemy declarative base used across models.
# Uses SQLAlchemy 2.x DeclarativeBase which matches modern SQLAlchemy.
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

