from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.core.security import get_current_admin

from app.models.pricing_model import Pricing

from app.schemas.pricing_schema import (
    PricingCreateSchema,
    PricingUpdateSchema
)

router = APIRouter(
    prefix="/pricing",
    tags=["Pricing"]
)

# CREATE BRAND

@router.post("/")

def create_pricing(

    data: PricingCreateSchema,

    db: Session = Depends(get_db),

    _admin = Depends(get_current_admin)
):

    pricing = Pricing(

        brand=data.brand,

        price_per_kw=data.price_per_kw
    )

    db.add(pricing)

    db.commit()

    db.refresh(pricing)

    return pricing


# GET ALL PRICING

@router.get("/")

def get_pricing(
    db: Session = Depends(get_db)
):

    pricing = db.query(
        Pricing
    ).all()

    return pricing


# UPDATE PRICE

@router.put("/{pricing_id}")

def update_pricing(

    pricing_id: int,

    data: PricingUpdateSchema,

    db: Session = Depends(get_db),

    _admin = Depends(get_current_admin)
):

    pricing = db.query(
        Pricing
    ).filter(

        Pricing.id == pricing_id

    ).first()

    if not pricing:

        raise HTTPException(

            status_code=404,

            detail="Pricing not found"
        )

    pricing.price_per_kw = (
        data.price_per_kw
    )

    db.commit()

    db.refresh(pricing)

    return pricing


# DELETE BRAND

@router.delete("/{pricing_id}")

def delete_pricing(

    pricing_id: int,

    db: Session = Depends(get_db),

    _admin = Depends(get_current_admin)
):

    pricing = db.query(
        Pricing
    ).filter(

        Pricing.id == pricing_id

    ).first()

    if not pricing:

        raise HTTPException(

            status_code=404,

            detail="Pricing not found"
        )

    db.delete(pricing)

    db.commit()

    return {
        "message": "Deleted Successfully"
    }
