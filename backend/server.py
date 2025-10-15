from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class Card(BaseModel):
    type: str
    level: int
    count: int

class GameProgress(BaseModel):
    device_id: str
    cards: List[Card]
    gold: int
    high_score: int
    total_distance: int
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class GameProgressCreate(BaseModel):
    device_id: str
    cards: List[Card]
    gold: int
    high_score: int
    total_distance: int

class GameSession(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    device_id: str
    score: int
    distance: int
    cards_collected: int
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class GameSessionCreate(BaseModel):
    device_id: str
    score: int
    distance: int
    cards_collected: int

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Card Runner API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Game Progress Endpoints
@api_router.post("/game/progress")
async def save_game_progress(progress: GameProgressCreate):
    # Update or insert progress for this device
    existing = await db.game_progress.find_one({"device_id": progress.device_id})
    
    if existing:
        await db.game_progress.update_one(
            {"device_id": progress.device_id},
            {"$set": progress.dict()}
        )
    else:
        progress_dict = progress.dict()
        progress_dict["timestamp"] = datetime.utcnow()
        await db.game_progress.insert_one(progress_dict)
    
    return {"status": "success", "message": "Progress saved"}

@api_router.get("/game/progress/{device_id}")
async def get_game_progress(device_id: str):
    progress = await db.game_progress.find_one({"device_id": device_id})
    if progress:
        progress.pop("_id", None)
        return progress
    return {"cards": [], "gold": 0, "high_score": 0, "total_distance": 0}

# Game Session Endpoints
@api_router.post("/game/session", response_model=GameSession)
async def save_game_session(session: GameSessionCreate):
    session_dict = session.dict()
    session_obj = GameSession(**session_dict)
    await db.game_sessions.insert_one(session_obj.dict())
    return session_obj

@api_router.get("/game/leaderboard")
async def get_leaderboard(limit: int = 10):
    sessions = await db.game_sessions.find().sort("score", -1).limit(limit).to_list(limit)
    leaderboard = []
    for session in sessions:
        leaderboard.append({
            "device_id": session["device_id"],
            "score": session["score"],
            "distance": session["distance"],
            "timestamp": session["timestamp"]
        })
    return leaderboard

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
