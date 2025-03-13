from fastapi import APIRouter, HTTPException
from app.models.fund import Fund
from app.services.fund_service import FundService

router = APIRouter(prefix="/funds", tags=["Funds"])
fund_service = FundService()

@router.post("/", response_model=Fund)
async def create_fund(fund_data: Fund):
    created_fund = await fund_service.create_fund(fund_data)
    return created_fund

@router.get("/", response_model=list[Fund])
async def get_all_funds():
    funds = await fund_service.get_all_funds()
    return funds

@router.put("/{fund_id}", response_model=Fund)
async def update_fund(fund_id: str, fund: Fund):
    updated_fund = await fund_service.update_fund(fund_id, fund.dict(exclude_unset=True))
    if not updated_fund:
        raise HTTPException(status_code=404, detail="Fund not found")
    return updated_fund