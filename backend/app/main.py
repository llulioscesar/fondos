from fastapi import FastAPI

from app.api.endpoints import subscription
from app.exceptions.custom_exceptions import register_exception_handlers

app = FastAPI(
    title="BTG Investment API",
    description="API for fund subscription and cancellation",
    version="1.0.0"
)

register_exception_handlers(app)

app.include_router(subscription.router)

@app.get("/")
async def read_root():
    return {"message": "Welcome to the BTG Investment API"}