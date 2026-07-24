from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel
from pydantic import BaseModel

class GenerateDescriptionRequest(BaseModel):
    title: str


class GenerateDescriptionResponse(BaseModel):
    description: str

class TaskCreate(SQLModel):
    title: str
    completed: bool = False
    description: Optional[str] = None
    category_id: Optional[int] = None

    milestone: str | None = None
    tags: list[str] | None = None

class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

    milestone: str | None = None
    tags: list[str] | None = None

class CategoryResponse(SQLModel):
    id: int
    name: str
class TaskResponse(SQLModel):
    id: int
    title: str
    description: str | None = None
    completed: bool
    position: int
    resource_url: str | None = None
    category: CategoryResponse | None = None
    created_at: datetime
    completed_at: Optional[datetime]
    milestone: str|None = None
    tags: list[str] = []
    report_generated: bool = False

    model_config = {
        "from_attributes": True
    }
class UserCreate(SQLModel):
    username: str
    email: str
    password: str
class UserResponse(SQLModel):
    id: int
    username: str
    email: str

    model_config = {
        "from_attributes": True
    }
class UserLogin(SQLModel):
    email: str
    password: str
class Token(SQLModel):
    access_token: str
    token_type: str

class ReorderTasks(SQLModel):
    task_ids: list[int]


class CategoryCreate(SQLModel):
    name: str

class DashboardResponse(BaseModel):
    total_tasks: int

    active_tasks: int
    completed_tasks: int

    active_task_titles: list[str]
    completed_task_titles: list[str]

    has_next_active: bool
    has_next_completed: bool

class DashboardStatsResponse(BaseModel):
    total_tasks: int
    active_tasks: int
    completed_tasks: int

class DashboardTaskResponse(BaseModel):
    tasks: list[TaskResponse]
    has_next: bool