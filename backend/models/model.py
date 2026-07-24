from typing import Optional
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import ARRAY
from datetime import datetime
class Category(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    user_id: int | None = Field(
    default=None,
    foreign_key="user.id",
    nullable=True
)
    

    tasks: list["Task"] = Relationship(back_populates="category")

class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = Field(default=None)
    completed: bool = False
    category_id: int | None = Field(default=None, foreign_key="category.id")
    category: Category | None = Relationship(back_populates="tasks")
    position: int = Field(default=0, index=True)
    resource_url: str | None = None
    resource_public_id: str | None = None

    user_id: int = Field(
        foreign_key="user.id"
    )

    user: "User" = Relationship(
        back_populates="tasks"
    )

    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
    )

    completed_at: Optional[datetime] = Field(
        default=None,
        nullable=True,
    )

    milestone: Optional[str] = Field(default=None)

    tags: Optional[list[str]] = Field(
        default=None,
        sa_column=Column(ARRAY(String), nullable=True)
    )

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    email: str = Field(unique=True)
    password_hash: str
    tasks: list["Task"] = Relationship(
        back_populates="user"
    )