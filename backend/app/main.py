from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.endpoints import subscription, funds
from app.core.db import verify_db_connection
from app.exceptions.custom_exceptions import register_exception_handlers
from app.models import fund

app = FastAPI(
    title="BTG Investment API",
    description="API for fund subscription and cancellation",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await verify_db_connection()

register_exception_handlers(app)

app.include_router(subscription.router)
app.include_router(funds.router)

@app.get("/")
async def read_root():
    return {"message": "Welcome to the BTG Investment API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
