from typing import List

from bson import ObjectId

from app.core.db import db
from app.models.transaction import Transaction


class TransactionRepository:
    def __init__(self):
        self.collection = db.transactions

    async def create_transaction(self, transaction: Transaction) -> Transaction:
        object_id = ObjectId()
        doc = transaction.dict()
        doc["_id"] = object_id
        del doc["id"]
        await self.collection.insert_one(doc)
        transaction.id = str(object_id)
        return transaction

    async def get_transaction(self, transaction_id: str) -> Transaction:
        object_id = ObjectId(transaction_id)
        doc = await self.collection.find_one({"_id": object_id})
        if doc:
            doc["id"] = str(doc["_id"])
            del doc["_id"]
            return Transaction(**doc)
        return None

    async def get_all_transactions(self) -> list[Transaction]:
        subscriptions_cursor = self.collection.find({})
        subscriptions = []
        async for doc in subscriptions_cursor:
            doc["id"] = str(doc["_id"])
            del doc["_id"]
            subscriptions.append(Transaction(**doc))
        return subscriptions

    async def update_transaction(self, transaction_id: str, fund_data: dict) -> Transaction:
        object_id = ObjectId(transaction_id)

        if "_id" in fund_data:
            del fund_data["_id"]
        if "id" in fund_data:
            del fund_data["id"]

        result = await self.collection.update_one({ "_id": object_id }, { "$set": fund_data })
        if result.modified_count == 0:
            return None
        doc = await self.collection.find_one({"_id": object_id})
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        return Transaction(**doc)