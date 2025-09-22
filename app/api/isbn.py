# app/api/isbn.py
from fastapi import APIRouter, HTTPException
import requests

router = APIRouter()

@router.get("/{isbn}")
def get_isbn(isbn: str):
    try:
        url = f"https://openlibrary.org/isbn/{isbn}.json"
        r = requests.get(url, timeout=8)
        r.raise_for_status()
        data = r.json()
        return {
            "title": data.get("title"),
            "authors": [a.get("key") for a in data.get("authors", [])],
            "publish_date": data.get("publish_date"),
            "publishers": data.get("publishers"),
            "number_of_pages": data.get("number_of_pages"),
            "isbn": isbn
        }
    except requests.RequestException:
        raise HTTPException(status_code=404, detail="Book not found or ISBN invalid")
