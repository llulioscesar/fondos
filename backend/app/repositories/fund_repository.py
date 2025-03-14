from bson import ObjectId

from app.models.fund import Fund

class FundRepository:
    def __init__(self, db):
        self.collection = db.funds

    async def create_fund(self, fund: Fund) -> Fund:
        object_id = ObjectId()
        doc = fund.dict()
        doc["_id"] = object_id
        del doc["id"]
        await self.collection.insert_one(doc)
        fund.id = str(object_id)
        return fund

    async def get_all_funds(self) -> list[Fund]:
        funds_cursor = self.collection.find({})
        funds = []
        async for doc in funds_cursor:
            doc["id"] = str(doc["_id"])
            del doc["_id"]
            funds.append(Fund(**doc))
        return funds

    async def update_fund(self, fund_id: str, fund_data: dict) -> Fund:
        object_id = ObjectId(fund_id)

        if "_id" in fund_data:
            del fund_data["_id"]
        if "id" in fund_data:
            del fund_data["id"]

        result = await self.collection.update_one({'_id': object_id}, {'$set': fund_data})
        if result.modified_count == 0:
            return None
        doc = await self.collection.find_one({'_id': object_id})
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        return Fund(**doc)
