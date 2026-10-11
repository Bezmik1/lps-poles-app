from fastapi import FastAPI

from app.database import Base, engine
from app import models  # регистрируем модели
from app.routers import pole_photos, users

Base.metadata.create_all(bind=engine)

app = FastAPI(title="LPS Poles API")

app.include_router(pole_photos.router)
app.include_router(users.router)


@app.get("/")
def root():
    return {"message": "LPS Poles API is running"}
