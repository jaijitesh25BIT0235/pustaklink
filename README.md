\# PustakLink — Hyper-local Textbook Marketplace (Backend)



\*\*Project:\*\* PustakLink — a trusted, campus-first used-book marketplace  

\*\*Hackathon:\*\* VinHack 2025 — Team: PustakLink  number - 509





---



\## One-liner

PustakLink makes lending \& borrowing textbooks inside a campus, fast, safe and low-cost — scan ISBN, list in 1 click, chat, and mark sold. Demo-ready backend (FastAPI) + seeded data.



---



\## What’s in this repo

\- `app/` — Modular FastAPI backend (models, schemas, api, main.py)

\- `seed.py` — one-shot script to populate DB with demo users \& 50 listings

\- `test.ps1` — PowerShell demo script to run through signup → login → listing flow

\- `requirements.txt` — pip install dependencies

\- `README.md` — this file

\- `.gitignore` — recommended ignore list

\- `LICENSE` — MIT license



---



\## Demo summary (what to show to judges)

1\. Start server and open Swagger UI: `http://127.0.0.1:8000/docs`

2\. Signup / Login (demo accounts provided or create new)

3\. Create a listing (with ISBN autofill if desired)

4\. Browse listings \& test filters

5\. Show chat/mark-as-sold/report flows (if frontend exists) or via API

6\. Show seeded listings (50) demonstrating filters \& search

7\. Explain architecture + scalability + impact



---



\## Quick run (local machine) — exact commands



1\. Activate virtualenv (Windows PowerShell)

&nbsp;  ```powershell

&nbsp;  cd C:\\Users\\*username*\\Documents

&nbsp;  .\\venv\\Scripts\\Activate.ps1



