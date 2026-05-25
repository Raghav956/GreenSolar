from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.schemas.auth_schema import LoginSchema

from app.db.dependencies import get_db

from app.models.user_model import User

from app.core.security import (
    verify_password,
    create_access_token,
    hash_password
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register")

def register(
    data: LoginSchema,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == data.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    hashed_password = hash_password(
        data.password
    )

    new_user = User(
        email=data.email,
        password=hashed_password
    )

    db.add(new_user)

    db.commit()

    return {
        "message": "Admin Registered Successfully"
    }

@router.post("/login")

def login(
    data: LoginSchema,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid Email"
        )

    valid_password = verify_password(
        data.password,
        user.password
    )

    if not valid_password:

        raise HTTPException(
            status_code=401,
            detail="Invalid Password"
        )

    token = create_access_token({
        "sub": user.email
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }