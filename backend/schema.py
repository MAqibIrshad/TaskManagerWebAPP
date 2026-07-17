from typing import Optional
from sqlmodel import SQLModel


class TaskCreate(SQLModel):
    title: str
    completed: bool = False


class TaskUpdate(SQLModel):
    title: Optional[str] = None
    completed: Optional[bool] = None


class TaskResponse(SQLModel):
    id: int
    title: str
    completed: bool

    model_config = {
        "from_attributes": True
    }


from pydantic import BaseModel



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