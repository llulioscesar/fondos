from pydantic import BaseModel


class Fund(BaseModel):
    id: str = None
    name: str
    min_amount: int
    category: str