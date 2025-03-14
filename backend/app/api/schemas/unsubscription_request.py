from pydantic import BaseModel

class UnsubscriptionRequest(BaseModel):
    transaction_id: str