from pydantic import BaseModel
from datetime import datetime

class Transaction(BaseModel):
    id: str
    fund: str
    type: str
    amount: float
    date: datetime