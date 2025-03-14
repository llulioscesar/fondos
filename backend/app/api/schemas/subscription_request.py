from pydantic import BaseModel


class SubscriptionRequest(BaseModel):
    fund: str
    amount: float
    mail: str