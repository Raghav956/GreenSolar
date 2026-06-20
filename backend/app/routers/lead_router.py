from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.core.security import get_current_admin

from app.models.lead_model import Lead

from app.schemas.lead_schema import (
    LeadCreateSchema
)

router = APIRouter(
    prefix="/leads",
    tags=["Leads"]
)

# CREATE LEAD

@router.post("/")

def create_lead(
    data: LeadCreateSchema,
    db: Session = Depends(get_db)
):

    lead = Lead(

        full_name=data.full_name,

        phone_number=data.phone_number,

        city=data.city,

        electricity_bill=data.electricity_bill,

        roof_type=data.roof_type,

        required_kw=data.required_kw,

        property_type=data.property_type,

        subsidy_interest=data.subsidy_interest,

        message=data.message
    )

    db.add(lead)

    db.commit()

    db.refresh(lead)

    return {
        "message": "Lead Submitted Successfully"
    }

# GET ALL LEADS

@router.get("/")

def get_leads(
    db: Session = Depends(get_db),
    _admin = Depends(get_current_admin)
):

    leads = db.query(Lead).all()

    return leads

# GET SINGLE LEAD

@router.get("/{lead_id}")

def get_lead(
    lead_id: int,
    db: Session = Depends(get_db),
    _admin = Depends(get_current_admin)
):

    lead = db.query(Lead).filter(
        Lead.id == lead_id
    ).first()

    if not lead:

        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    return lead

# UPDATE LEAD STATUS

@router.put("/{lead_id}/status")

def update_lead_status(
    lead_id: int,
    status: str,
    db: Session = Depends(get_db),
    _admin = Depends(get_current_admin)
):

    lead = db.query(Lead).filter(
        Lead.id == lead_id
    ).first()

    if not lead:

        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    lead.status = status

    db.commit()
    db.refresh(lead)
    return lead

# DELETE LEAD

@router.delete("/{lead_id}")

def delete_lead(
    lead_id: int,
    db: Session = Depends(get_db),
    _admin = Depends(get_current_admin)
):

    lead = db.query(Lead).filter(
        Lead.id == lead_id
    ).first()

    if not lead:

        raise HTTPException(
            status_code=404,
            detail="Lead not found"
        )

    db.delete(lead)

    db.commit()

    return {
        "message": "Lead Deleted Successfully"
    }
