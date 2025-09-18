from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
from passlib.context import CryptContext
from bson.objectid import ObjectId
import os

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
MONGO_URL = "mongodb+srv://nandukumar9980:kumar456@cluster0.ecnna5x.mongodb.net/health_advisor_db?retryWrites=true&w=majority"
client = MongoClient(MONGO_URL)
db = client["crop"]
users = db["users"]

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class PredictionRequest(BaseModel):
    crop_type: str
    season: str
    soil_type: str
    land_area: float
    state: str
    district: str

@app.post("/register")
def register(user: UserCreate):
    if users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_pw = hash_password(user.password)
    users.insert_one({"name": user.name, "email": user.email, "password": hashed_pw})
    return {"message": "User registered successfully"}

@app.post("/login")
def login(user: UserLogin):
    db_user = users.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "user": {"name": db_user["name"], "email": db_user["email"]}}

@app.post("/predict")
def predict(data: PredictionRequest):
    # Dummy prediction logic, replace with your ML model
    survival = 85
    expected_yield = 4.2
    market_value = 50000
    profit_margin = 30
    risk_factors = ["Low rainfall"]
    recommendations = ["Use drought-resistant seeds"]
    harvest_date = "2025-12-01"
    return {
        "survival": survival,
        "expected_yield": expected_yield,
        "market_value": market_value,
        "profit_margin": profit_margin,
        "risk_factors": risk_factors,
        "recommendations": recommendations,
        "harvest_date": harvest_date
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
