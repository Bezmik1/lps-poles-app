from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class PolePhotoBase(BaseModel):
    file_name: str
    pole_type: str
    material: str
    condition: str
    confidence: float = Field(ge=0, le=1)
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    comment: Optional[str] = None


class PolePhotoCreate(PolePhotoBase):
    image_url: str
    uploaded_by: Optional[int] = None


class PolePhotoUpdate(BaseModel):
    pole_type: Optional[str] = None
    material: Optional[str] = None
    condition: Optional[str] = None
    comment: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class PolePhotoResponse(PolePhotoBase):
    id: int
    image_url: str
    uploaded_at: datetime
    uploaded_by: Optional[int] = None

    class Config:
        from_attributes = True