from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database import Base


class PolePhoto(Base):
    __tablename__ = "pole_photos"

    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String, nullable=False)
    file_name = Column(String, nullable=False)
    pole_type = Column(String, nullable=False)          # anchor, intermediate, ...
    material = Column(String, nullable=False)           # wood, concrete, ...
    condition = Column(String, nullable=False)          # good, needs_repair, ...
    confidence = Column(Float, nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    comment = Column(String, nullable=True)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    uploaded_by = Column(Integer, ForeignKey("users.id"), nullable=True)