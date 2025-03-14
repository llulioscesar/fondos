from app.core.db import db


class ConfigRepository:
    def __init__(self):
        self.collection = db.config

    async def get_config(self, user_id: str = "user_1") -> dict:
        config = await self.collection.find_one({"user_id": user_id})
        if not config:
            # If no configuration exists, create a default one with an initial balance of 500,000
            config = {"user_id": user_id, "balance": 500000}
            await self.collection.insert_one(config)
        return config

    async def update_balance(self, new_balance: int, user_id: str = "user_1") -> None:
        await self.collection.update_one(
            {"user_id": user_id}, {"$set": {"balance": new_balance}}
        )