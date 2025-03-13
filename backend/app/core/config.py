import os

from pydantic import BaseSettings


class Settings(BaseSettings):
    app_name: str = "BTG Investment API"
    environment: str = os.getenv("ENVIRONMENT", "development")

settings = Settings()