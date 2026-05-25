from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

import cloudinary.uploader

from app.core.cloudinary_config import *

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

# IMAGE UPLOAD

@router.post("/image")

async def upload_image(
    file: UploadFile = File(...)
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
    file: UploadFile = File(...)
):

    result = cloudinary.uploader.upload_large(
        file.file,
        resource_type="video",
        chunk_size=6000000
    )

    return {
        "url": result["secure_url"]
    }