# app/schemas/user.py
from pydantic import BaseModel, EmailStr, validator
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    college: str

    @validator("email")
    def restrict_domain(cls, v):
        if not v.endswith("@vitstudent.ac.in"):
            raise ValueError("Email must be from @vitstudent.ac.in domain")
        return v

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
