from motor.motor_asyncio import AsyncIOMotorClient

from app.core.config import settings

client = AsyncIOMotorClient(settings.mongo_uri)
db = client.btg_api

async def verify_db_connection():
    try:
        await db.command('ping')
        print("Successful connection to MongoDB")
        return db
    except Exception as e:
        print(f"Connection error: {e}")
        return None