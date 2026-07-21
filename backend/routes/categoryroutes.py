from fastapi import APIRouter, Depends, status, HTTPException
from sqlmodel import Session, select
from db import get_session
from backend.models.model import Category, User           # import User model
from backend.schemas.schema import CategoryCreate
from security import get_current_user

router = APIRouter(
    prefix="/categories",
    tags=["Categories"],
    dependencies=[Depends(get_current_user)],   # protects every route
)

@router.get("/", response_model=list[Category])
def get_categories(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    statement = (
        select(Category)
        # .where(Category.user_id == current_user.id)
        .order_by(Category.name)
    )
    return session.exec(statement).all()

@router.get("/{category_id}", response_model=Category)
def get_category(
    category_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    category = session.get(Category, category_id)
    if not category or category.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Category not found")
    return category
@router.post("/", response_model=Category, status_code=status.HTTP_201_CREATED)
def create_category(
    category: CategoryCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    db_category = Category(
        name=category.name,
        user_id=current_user.id
    )

    session.add(db_category)
    session.commit()
    session.refresh(db_category)

    return db_category