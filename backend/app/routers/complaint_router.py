from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.core.security import get_current_admin

from app.models.project_model import Project
from app.models.complaint_model import Complaint

from app.schemas.complaint_schema import (
    ComplaintCreateSchema
)

router = APIRouter(
    prefix="/complaints",
    tags=["Complaints"]
)

# CUSTOMER LOGIN

@router.post("/login")

def customer_login(
    phone_number: str,
    db: Session = Depends(get_db)
):

    project = db.query(Project).filter(
        Project.phone_number == phone_number
    ).first()

    if not project:

        raise HTTPException(
            status_code=404,
            detail="Customer Project Not Found"
        )

    return {
        "message": "Customer Verified",
        "project_id": project.id
    }

# CREATE COMPLAINT

@router.post("/{project_id}")

def create_complaint(
    project_id: int,
    data: ComplaintCreateSchema,
    db: Session = Depends(get_db)
):

    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:

        raise HTTPException(
            status_code=404,
            detail="Project Not Found"
        )

    complaint = Complaint(

        project_id=project_id,

        customer_phone=data.customer_phone,

        complaint_title=data.complaint_title,

        complaint_description=data.complaint_description,

        media_url=data.media_url
    )

    db.add(complaint)

    db.commit()

    db.refresh(complaint)

    return {
        "message": "Complaint Submitted Successfully"
    }

# GET ALL COMPLAINTS

@router.get("/")

def get_complaints(
    db: Session = Depends(get_db),
    _admin = Depends(get_current_admin)
):

    complaints = db.query(
        Complaint
    ).all()

    return complaints

# UPDATE STATUS

@router.put("/{complaint_id}/status")

def update_status(
    complaint_id: int,
    status: str,
    db: Session = Depends(get_db),
    _admin = Depends(get_current_admin)
):

    complaint = db.query(Complaint).filter(
        Complaint.id == complaint_id
    ).first()

    if not complaint:

        raise HTTPException(
            status_code=404,
            detail="Complaint Not Found"
        )

    complaint.complaint_status = status

    db.commit()

    db.refresh(complaint)

    return complaint
