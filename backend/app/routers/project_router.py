from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.models.project_model import Project
from app.models.project_media_model import ProjectMedia

from app.schemas.project_schema import (
    ProjectCreateSchema
)

from app.schemas.project_media_schema import (
    ProjectMediaSchema
)

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)

# CREATE PROJECT

@router.post("/")

def create_project(
    data: ProjectCreateSchema,
    db: Session = Depends(get_db)
):

    project = Project(

    title=data.title,

    description=data.description,

    address=data.address,

    latitude=data.latitude,

    longitude=data.longitude,

    location=data.location,

    capacity=data.capacity,

    project_type=data.project_type,

    customer_name=data.customer_name,

    phone_number=data.phone_number
)

    db.add(project)

    db.commit()

    db.refresh(project)

    return project

# GET ALL PROJECTS

@router.get("/")

def get_projects(
    db: Session = Depends(get_db)
):

    projects = db.query(Project).all()

    response = []

    for project in projects:

        media = db.query(ProjectMedia).filter(
            ProjectMedia.project_id == project.id
        ).all()

        response.append({

    "id": project.id,

    "title": project.title,

    "description": project.description,

    "address": project.address,

    "latitude": project.latitude,

    "longitude": project.longitude,

    "location": project.location,

    "capacity": project.capacity,

    "project_type": project.project_type,
    
    "customer_name": project.customer_name,

    "phone_number": project.phone_number,

    "media": media
})

    return response

# GET SINGLE PROJECT

@router.get("/{project_id}")

def get_project(
    project_id: int,
    db: Session = Depends(get_db)
):

    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:

        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    media = db.query(ProjectMedia).filter(
        ProjectMedia.project_id == project.id
    ).all()

    return {

    "id": project.id,

    "title": project.title,

    "description": project.description,

    "location": project.location,

    "latitude": project.latitude,

    "longitude": project.longitude,

    "capacity": project.capacity,

    "project_type": project.project_type,

    "customer_name": project.customer_name,

    "phone_number": project.phone_number,

    "media": media
}

# ADD MEDIA TO PROJECT

@router.post("/{project_id}/media")

def add_media(
    project_id: int,
    data: ProjectMediaSchema,
    db: Session = Depends(get_db)
):

    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:

        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    media = ProjectMedia(

        project_id=project_id,

        media_url=data.media_url,

        media_type=data.media_type
    )

    db.add(media)

    db.commit()

    db.refresh(media)

    return media

# DELETE PROJECT

@router.delete("/{project_id}")

def delete_project(
    project_id: int,
    db: Session = Depends(get_db)
):

    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:

        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    db.query(ProjectMedia).filter(
        ProjectMedia.project_id == project_id
    ).delete()

    db.delete(project)

    db.commit()

    return {
        "message": "Project Deleted Successfully"
    }