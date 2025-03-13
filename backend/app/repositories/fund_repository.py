import uuid

from app.models.fund import Fund


class FundRepository:
    def __init__(self, db):
        self.collection = db.funds

    async def create_fund(self, fund: Fund) -> Fund:
        fund.id = str(uuid.uuid4())
        await self.collection.insert_one(fund.dict())
        return fund

    async def get_all_funds(self) -> list[Fund]:
        funds_cursor = self.collection.find({})
        funds = []
        async for doc in funds_cursor:
            funds.append(Fund(**doc))
        return funds

    async def update_fund(self, fund_id: str, fund_data: dict) -> Fund:
        result = await self.collection.update_one({'_id': fund_id}, {'$set': fund_data})
        if result.modified_count == 0:
            return None
        doc = await self.collection.find_one({'_id': fund_id})
        return Fund(**doc)