import uuid
from datetime import datetime

from fastapi import APIRouter

from app.exceptions.custom_exceptions import FundNotFoundException, InsufficientAmountException
from app.models.transaction import Transaction
from app.services.notifications import send_notification

router = APIRouter(prefix="/suscription", tags=["suscription"])

transactions = []
funds = {
    "FPV_BTG_PACTUAL_RECAUDADORA": {"min_amount": 75000, "category": "FPV"},
    "FPV_BTG_PACTUAL_ECOPETROL": {"min_amount": 125000, "category": "FPV"},
    "DEUDAPRIVADA": {"min_amount": 50000, "category": "FIC"},
    "FDO-ACCIONES": {"min_amount": 250000, "category": "FIC"},
    "FPV_BTG_PACTUAL_DINAMICA": {"min_amount": 100000, "category": "FPV"}
}

def validate_subscription(fund: str, amount: float):
    if fund not in funds:
        raise FundNotFoundException(fund)
    if amount < funds[fund]["min_amount"]:
        raise InsufficientAmountException(fund)


@router.post("/subscribe", response_model=Transaction)
def subscribe(fund: str, amount: float):
    validate_subscription(fund, amount)

    transaction = Transaction(
        id=str(uuid.uuid4()),
        fund=fund,
        type="subscribe",
        amount=amount,
        date=datetime.now(),
    )
    transactions.append(transaction)

    send_notification(fund, "subscribe")

    return transaction