from pydantic import BaseModel
from datetime import datetime

class Transaction(BaseModel):
    id: str = None
    fund: str
    type: str
    amount: float
    date: datetime
    email: str
    cancel: bool