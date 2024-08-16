from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from datetime import datetime
from fastapi.responses import HTMLResponse
import os
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Serve static files (e.g., CSS, JS)
app.mount("/static", StaticFiles(directory="static"), name="static")

# CORS middleware to allow access from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to restrict origins if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE = 'rfid_data.db'

class RfidItem(BaseModel):
    rfid_id: str
    additional_info: str
    first_name: str
    last_name: str
    academic_year: str
    phone_number: str
    email: str

def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS rfid_data (
            id INTEGER PRIMARY KEY,
            rfid_id TEXT NOT NULL,
            additional_info TEXT NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            academic_year TEXT NOT NULL,
            phone_number TEXT NOT NULL,
            email TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

@app.on_event("startup")
async def startup():
    init_db()

@app.post("/rfid")
async def add_rfid_item(item: RfidItem):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO rfid_data (rfid_id, additional_info, first_name, last_name, academic_year, phone_number, email, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (item.rfid_id, item.additional_info, item.first_name, item.last_name, item.academic_year, item.phone_number, item.email, datetime.now().isoformat()))
    conn.commit()
    conn.close()
    return {"message": "Item added successfully"}

@app.get("/rfid")
async def get_rfid_items():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT rfid_id, additional_info, first_name, last_name, academic_year, phone_number, email, created_at FROM rfid_data')
    items = cursor.fetchall()
    conn.close()
    return [{"rfid_id": item[0], "additional_info": item[1], "first_name": item[2], "last_name": item[3], "academic_year": item[4], "phone_number": item[5], "email": item[6], "created_at": item[7]} for item in items]

@app.get("/rfid/{rfid_id}")
async def get_rfid_item(rfid_id: str):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT rfid_id, additional_info, first_name, last_name, academic_year, phone_number, email, created_at FROM rfid_data WHERE rfid_id = ?', (rfid_id,))
    item = cursor.fetchone()
    conn.close()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"rfid_id": item[0], "additional_info": item[1], "first_name": item[2], "last_name": item[3], "academic_year": item[4], "phone_number": item[5], "email": item[6], "created_at": item[7]}

@app.get("/", response_class=HTMLResponse)
async def read_index():
    index_path = os.path.join(os.path.dirname(__file__), "index.html")
    with open(index_path, "r") as f:
        return HTMLResponse(content=f.read(), status_code=200)
