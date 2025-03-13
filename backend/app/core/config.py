import os

from pydantic import BaseSettings


class Settings(BaseSettings):
    app_name: str = "BTG Investment API"
    environment: str = os.getenv("ENVIRONMENT", "development")
    mongo_uri: str = os.getenv("MONGO_URI", "mongodb://localhost:27017")
    default_email: str = os.getenv("DEFAULT_EMAIL")

settings = Settings()