from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session

from db import get_session
from backend.models.model import User
from security import verify_token

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="auth/login"
)