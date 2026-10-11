from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import PolePhoto
from app.schemas import (
    PolePhotoCreate,
    PolePhotoUpdate,
    PolePhotoResponse,
)

router = APIRouter(prefix="/photos", tags=["photos"])


@router.get("/", response_model=list[PolePhotoResponse])
def list_photos(
    skip: int = 0,
    limit: int = 100,
    pole_type: str | None = None,
    db: Session = Depends(get_db),
):
    """Список фотографий. Поддерживает пагинацию и фильтр по типу опоры."""
    query = db.query(PolePhoto)
    if pole_type:
        query = query.filter(PolePhoto.pole_type == pole_type)
    return query.offset(skip).limit(limit).all()


@router.get("/{photo_id}", response_model=PolePhotoResponse)
def get_photo(photo_id: int, db: Session = Depends(get_db)):
    """Одна запись по id. 404 если не найдена."""
    photo = db.query(PolePhoto).filter(PolePhoto.id == photo_id).first()
    if not photo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Фотография с id={photo_id} не найдена",
        )
    return photo


@router.post("/", response_model=PolePhotoResponse, status_code=status.HTTP_201_CREATED)
def create_photo(payload: PolePhotoCreate, db: Session = Depends(get_db)):
    """Создать новую запись."""
    photo = PolePhoto(**payload.model_dump())
    db.add(photo)
    db.commit()
    db.refresh(photo)
    return photo


@router.put("/{photo_id}", response_model=PolePhotoResponse)
def update_photo(
    photo_id: int,
    payload: PolePhotoUpdate,
    db: Session = Depends(get_db),
):
    """Обновить запись. Меняются только присланные поля."""
    photo = db.query(PolePhoto).filter(PolePhoto.id == photo_id).first()
    if not photo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Фотография с id={photo_id} не найдена",
        )

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(photo, field, value)

    db.commit()
    db.refresh(photo)
    return photo


@router.delete("/{photo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_photo(photo_id: int, db: Session = Depends(get_db)):
    """Удалить запись. 204 (нет тела) при успехе, 404 если не найдена."""
    photo = db.query(PolePhoto).filter(PolePhoto.id == photo_id).first()
    if not photo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Фотография с id={photo_id} не найдена",
        )
    db.delete(photo)
    db.commit()
    return None
