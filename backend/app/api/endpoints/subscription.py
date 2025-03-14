from fastapi import APIRouter, HTTPException

from app.api.schemas.subscription_request import SubscriptionRequest
from app.api.schemas.unsubscription_request import UnsubscriptionRequest
from app.models.transaction import Transaction
from app.services.subscription_service import SubscriptionService

router = APIRouter(prefix="/subscription", tags=["Subscription"])
subscription_service = SubscriptionService()


@router.get("/", response_model=list[Transaction])
async def subscriptions():
    subs = await subscription_service.get_all_subscriptions()
    return subs

@router.post("/subscribe", response_model=Transaction)
async def subscribe(request: SubscriptionRequest):
    try:
        subscription = await subscription_service.create_subscription(
            request.fund, request.amount, request.mail
        )
        return subscription
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/unsubscribe", response_model=Transaction)
async def unsubscribe(request: UnsubscriptionRequest):
    try:
        subscription = await subscription_service.cancel_subscription(request.transaction_id)
        return subscription
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))