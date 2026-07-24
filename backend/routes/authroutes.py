# auth_routes.py

from schemas.schema import Token, UserLogin
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from db import get_session
from models.model import User
from schemas.schema import UserCreate, UserResponse
from security import create_access_token, hash_password, verify_password

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user: UserCreate,
    session: Session = Depends(get_session),
):
    existing_username = session.exec(
    select(User).where(
        User.username == user.username
    )
    ).first()

    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already exists",
        )
    existing_email = session.exec(
    select(User).where(
        User.email == user.email
    )
    ).first()

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already exists",
        )
    new_user = User(
    username=user.username,
    email=user.email,
    password_hash=hash_password(user.password),
    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return new_user

@router.post(
    "/login",
    response_model=Token,
)
def login(
    user: UserLogin,
    session: Session = Depends(get_session),
):
    
    db_user = session.exec(
    select(User).where(
        User.email == user.email
    )
    ).first()

    if not db_user:
        raise HTTPException(
        status_code=401,
        detail="Invalid email or password",
    )

    if not verify_password(
        user.password,
        db_user.password_hash,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )
    token = create_access_token(
    {
        "sub": str(db_user.id),
        "email": db_user.email,
    }
    )
    return {
    "access_token": token,
    "token_type": "bearer",
    }