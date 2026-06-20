from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.core.security import get_current_admin

from app.models.project_model import Project
from app.models.project_media_model import ProjectMedia
from app.models.complaint_model import Complaint

from app.schemas.project_schema import (
    ProjectCreateSchema,
    ProjectUpdateSchema
)

from app.schemas.project_media_schema import (
    ProjectMediaSchema
)

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)

def project_response(
    project: Project,
    media,
    include_private: bool = False
):
    response = {
        "id": project.id,
        "title": project.title,
        "description": project.description,
        "latitude": project.latitude,
        "longitude": project.longitude,
        "location": project.location,
        "capacity": project.capacity,
        "project_type": project.project_type,
        "media": media
    }

    if include_private:
        response.update({
            "address": project.address,
            "customer_name": project.customer_name,
            "phone_number": project.phone_number
        })

    return response

def get_project_media(
    db: Session,
    project_id: int
):
    return db.query(ProjectMedia).filter(
        ProjectMedia.project_id == project_id
    ).order_by(
        ProjectMedia.is_featured.desc(),
        ProjectMedia.id.asc()
    ).all()

# CREATE PROJECT

@router.post("/")

def create_project(
    data: ProjectCreateSchema,
    db: Session = Depends(get_db),
    _admin = Depends(get_current_admin)
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

# GET ALL PROJECTS FOR ADMIN

@router.get("/admin")
@router.get("/admin/")

def get_admin_projects(
    db: Session = Depends(get_db),
    _admin = Depends(get_current_admin)
):

    projects = db.query(Project).all()

    response = []

    for project in projects:

        media = get_project_media(
            db,
            project.id
        )

        response.append(
            project_response(
                project,
                media,
                include_private=True
            )
        )

    return response

# GET SINGLE PROJECT FOR ADMIN

@router.get("/admin/{project_id}")

def get_admin_project(
    project_id: int,
    db: Session = Depends(get_db),
    _admin = Depends(get_current_admin)
):

    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:

        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    media = get_project_media(
        db,
        project.id
    )

    return project_response(
        project,
        media,
        include_private=True
    )

# GET ALL PROJECTS

@router.get("/")

def get_projects(
    db: Session = Depends(get_db)
):

    projects = db.query(Project).all()

    response = []

    for project in projects:

        media = get_project_media(
            db,
            project.id
        )

        response.append(
            project_response(project, media)
        )

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

    media = get_project_media(
        db,
        project.id
    )

    return project_response(project, media)

# UPDATE PROJECT

@router.put("/{project_id}")

def update_project(
    project_id: int,
    data: ProjectUpdateSchema,
    db: Session = Depends(get_db),
    _admin = Depends(get_current_admin)
):

    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:

        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    update_data = data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():

        setattr(project, field, value)

    db.commit()

    db.refresh(project)

    media = get_project_media(
        db,
        project.id
    )

    return project_response(
        project,
        media,
        include_private=True
    )

# ADD MEDIA TO PROJECT

@router.post("/{project_id}/media")

def add_media(
    project_id: int,
    data: ProjectMediaSchema,
    db: Session = Depends(get_db),
    _admin = Depends(get_current_admin)
):

    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:

        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    if data.is_featured:

        db.query(ProjectMedia).filter(
            ProjectMedia.project_id == project_id
        ).update({
            ProjectMedia.is_featured: False
        })

    media = ProjectMedia(

        project_id=project_id,

        media_url=data.media_url,

        media_type=data.media_type,

        is_featured=data.is_featured
    )

    db.add(media)

    db.commit()

    db.refresh(media)

    return media

# SET PROJECT FEATURED MEDIA

@router.put("/{project_id}/media/{media_id}/featured")

def set_featured_media(
    project_id: int,
    media_id: int,
    db: Session = Depends(get_db),
    _admin = Depends(get_current_admin)
):

    media = db.query(ProjectMedia).filter(
        ProjectMedia.id == media_id,
        ProjectMedia.project_id == project_id
    ).first()

    if not media:

        raise HTTPException(
            status_code=404,
            detail="Project media not found"
        )

    db.query(ProjectMedia).filter(
        ProjectMedia.project_id == project_id
    ).update({
        ProjectMedia.is_featured: False
    })

    media.is_featured = True

    db.commit()

    db.refresh(media)

    return media

# DELETE PROJECT MEDIA

@router.delete("/{project_id}/media/{media_id}")

def delete_media(
    project_id: int,
    media_id: int,
    db: Session = Depends(get_db),
    _admin = Depends(get_current_admin)
):

    media = db.query(ProjectMedia).filter(
        ProjectMedia.id == media_id,
        ProjectMedia.project_id == project_id
    ).first()

    if not media:

        raise HTTPException(
            status_code=404,
            detail="Project media not found"
        )

    db.delete(media)

    db.commit()

    return {
        "message": "Project media deleted"
    }

# DELETE PROJECT

@router.delete("/{project_id}")

def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    _admin = Depends(get_current_admin)
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

    db.query(Complaint).filter(
        Complaint.project_id == project_id
    ).delete()

    db.delete(project)

    db.commit()

    return {
        "message": "Project Deleted Successfully"
    }
