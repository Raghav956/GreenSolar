from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import UploadFile
from fastapi import File

import cloudinary.uploader
from cloudinary.exceptions import BadRequest

from app.core.cloudinary_config import *
from app.core.security import get_current_admin

MAX_VIDEO_SIZE_MB = 100
MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

# IMAGE UPLOAD

@router.post("/image")

async def upload_image(
    file: UploadFile = File(...),
    _admin = Depends(get_current_admin)
):

    result = cloudinary.uploader.upload(
        file.file,
        resource_type="image"
    )

    return {
        "url": result["secure_url"]
    }

# VIDEO UPLOAD

@router.post("/video")

async def upload_video(
    file: UploadFile = File(...),
    _admin = Depends(get_current_admin)
):
    if not file.content_type or not file.content_type.startswith("video/"):

        raise HTTPException(
            status_code=400,
            detail="Only video files are allowed"
        )

    file.file.seek(0, 2)
    size = file.file.tell()
    file.file.seek(0)

    if size > MAX_VIDEO_SIZE_BYTES:

        raise HTTPException(
            status_code=413,
            detail=f"Video size must be {MAX_VIDEO_SIZE_MB} MB or less"
        )

    try:
        result = cloudinary.uploader.upload_large(
            file.file,
            resource_type="video",
            chunk_size=6000000
        )
    except BadRequest as error:
        raise HTTPException(
            status_code=413,
            detail=str(error)
        )

    return {
        "url": result["secure_url"]
    }
