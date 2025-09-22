# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.base import Base
from app.db.session import engine
from app.db.init_db import seed_if_empty

from app.api import auth, listings, reports, isbn

def create_app():
    app = FastAPI(title="PustakLink API", version="1.0.0")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
        allow_credentials=True,
    )
    app.include_router(auth.router, prefix="/auth", tags=["Auth"])
    app.include_router(listings.router, prefix="/listing", tags=["Listing"])
    app.include_router(reports.router, prefix="/report", tags=["Report"])
    app.include_router(isbn.router, prefix="/isbn", tags=["ISBN"])
    return app

app = create_app()

# create DB tables
Base.metadata.create_all(bind=engine)

@app.on_event("startup")
async def startup_event():
    seed_if_empty()
