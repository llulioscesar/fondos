from app.core.db import db
from app.models.fund import Fund
from app.repositories.fund_repository import FundRepository


class FundService:
    def __init__(self):
        self.repository = FundRepository(db)

    async def create_fund(self, fund: Fund) -> Fund:
        return await self.repository.create_fund(fund)

    async def get_all_funds(self) -> list[Fund]:
        return await self.repository.get_all_funds()

    async def update_fund(self, fund_id: str, fund_data: dict) -> Fund:
        return await self.repository.update_fund(fund_id, fund_data)