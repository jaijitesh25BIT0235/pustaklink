
import os

SQLITE_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./pustaklink.db")
SECRET_KEY = os.getenv("SECRET_KEY", "replace-this-secret-in-prod")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
