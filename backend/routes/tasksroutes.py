from typing import Optional

from utils import sanitize_html
from security import get_current_user
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from db import get_session
from backend.models.model import Task, User
from backend.schemas.schema import (
    DashboardResponse,
    DashboardStatsResponse,
    DashboardTaskResponse,
    ReorderTasks,
    TaskCreate,
    TaskUpdate,
    TaskResponse,
)

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
    dependencies=[Depends(get_current_user)]
)
from sqlalchemy import func
from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from fastapi import APIRouter, Depends, Query
from sqlmodel import Session, select
from bleach import clean as bleach_clean
@router.get("/dashboard",response_model=DashboardResponse)
def get_dashboard(
    active_skip: int = Query(0, ge=0),
    completed_skip: int = Query(0, ge=0),
    limit: int = Query(5, ge=1),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
    
):
    tasks = session.exec(
        select(Task).where(Task.user_id == current_user.id)
    ).all()
    
    # tasks = session.exec(select(Task)).all()

    active = [t for t in tasks if not t.completed]
    completed = [t for t in tasks if t.completed]

    return DashboardResponse(
        total_tasks=len(tasks),

        active_tasks=len(active),
        completed_tasks=len(completed),

        active_task_titles=[
            t.title
            for t in active[active_skip : active_skip + limit]
        ],

        completed_task_titles=[
            t.title
            for t in completed[
                completed_skip : completed_skip + limit
            ]
        ],

        has_next_active=active_skip + limit < len(active),
        has_next_completed=completed_skip + limit < len(completed),
    )

# @router.get("/", response_model=list[TaskResponse])
# def get_tasks(
#     category_id: Optional[int] = None,
#     session: Session = Depends(get_session),
# ):
#     statement = (
#     select(Task)
#     .order_by(Task.position)
#     )

#     if category_id:
#         statement = statement.where(
#             Task.category_id == category_id
#         )

 

#     tasks = session.exec(statement).all()

#     return tasks
@router.get("/", response_model=list[TaskResponse])
def get_tasks(
    category_id: Optional[int] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
    
):
    statement = select(Task).where(Task.user_id == current_user.id).order_by(Task.position)
    # statement = select(Task).order_by(Task.position)

    if category_id is not None:
        statement = statement.where(
            Task.category_id == category_id,
            
        )

    tasks = session.exec(statement).all()

    return tasks

@router.get("/{task_id}", response_model=TaskResponse, status_code=status.HTTP_200_OK)
def get_task(
    task_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    task = session.get(Task, task_id)
    if not task or task.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Task not found")
    return task
# @router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
# def create_task(
#     task: TaskCreate,
#     session: Session = Depends(get_session),
#     current_user: User = Depends(get_current_user),
# ):
#     # 1. Build task data from the incoming schema and set the owner
#     task_data = task.model_dump()
#     task_data["user_id"] = current_user.id   # required field now satisfied
#     max_position = session.exec(
#         select(func.max(Task.position)).where(Task.user_id == current_user.id)
#     ).one()
#     next_position = 0 if max_position is None else max_position + 1
#     # if task.description:
#     #     sanitized = sanitize_html(task.description)

#     # new_task.description = sanitized
#     new_task = Task.model_validate(task)
#     new_task.user_id = current_user.id     # assign ownership
#     new_task.position = next_position

#     # 3. Sanitise description if present
#     if task.description:
#         new_task.description = sanitize_html(
#             task.description,
#             tags=["p", "br", "strong", "em", "u", "h2", "h3", "ul", "ol", "li", "a"],
#             attributes={"a": ["href", "title"]},
#             strip=True,
#         )
#     session.add(new_task)
#     session.commit()
#     session.refresh(new_task)
#     return new_task
@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(
    task: TaskCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    # Convert the input schema to a dict
    task_data = task.model_dump()
    # Inject the required user_id
    task_data["user_id"] = current_user.id

    # Sanitise the description if provided
    if task_data.get("description"):
        task_data["description"] = bleach_clean(
            task_data["description"],
            tags=["p", "br", "strong", "em", "u", "h2", "h3", "ul", "ol", "li", "a"],
            attributes={"a": ["href", "title"]},
            strip=True,
        )

    # Calculate position
    max_position = session.exec(
        select(func.max(Task.position)).where(Task.user_id == current_user.id)
    ).one()
    task_data["position"] = 0 if max_position is None else max_position + 1

    # Create the Task object using the dict (bypasses validation on the input schema)
    new_task = Task(**task_data)

    session.add(new_task)
    session.commit()
    session.refresh(new_task)
    return new_task
@router.put("/reorder")
def reorder_tasks(
    data: ReorderTasks,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    # Fetch only tasks that belong to the current user
    tasks = session.exec(
        select(Task).where(
            Task.id.in_(data.task_ids),
            Task.user_id == current_user.id,
        )
    ).all()

    task_map = {task.id: task for task in tasks}

    for position, task_id in enumerate(data.task_ids):
        task = task_map.get(task_id)
        if task:
            task.position = position

    session.commit()
    return {"message": "Tasks reordered successfully."}

# @router.put("/{task_id}", response_model=TaskResponse, status_code=200)
# def update_task(
#     task_id: int,
#     task_update: TaskUpdate,
#     session: Session = Depends(get_session),
#     current_user: User = Depends(get_current_user),
# ):
#     task = session.get(Task, task_id)
#     if not task or task.user_id != current_user.id:
#         raise HTTPException(404, "Task not found")

#     update_data = task_update.model_dump(exclude_unset=True)
#     for key, value in update_data.items():
#         setattr(task, key, value)

#     session.add(task)
#     session.commit()
#     session.refresh(task)
#     return task
@router.put("/{task_id}", response_model=TaskResponse, status_code=status.HTTP_200_OK)
def update_task(
    task_id: int,
    task_update: TaskUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    task = session.get(Task, task_id)
    if not task or task.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Task not found")

    update_data = task_update.model_dump(exclude_unset=True)

    # Sanitise the description if it's being updated
    if "description" in update_data and update_data["description"] is not None:
        update_data["description"] = bleach_clean(
            update_data["description"],
            tags=["p", "br", "strong", "em", "u", "h2", "h3", "ul", "ol", "li", "a"],
            attributes={"a": ["href", "title"]},
            strip=True,
        )

    for key, value in update_data.items():
        setattr(task, key, value)

    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@router.delete(
    "/{task_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
@router.delete("/{task_id}", status_code=204)
def delete_task(
    task_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    task = session.get(Task, task_id)
    if not task or task.user_id != current_user.id:
        raise HTTPException(404, "Task not found")

    session.delete(task)
    session.commit()

@router.get("/dashboard/stats", response_model=DashboardStatsResponse)
def get_dashboard_stats(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    tasks = session.exec(select(Task).where(Task.user_id == current_user.id)).all()
    active = len([t for t in tasks if not t.completed])
    completed = len([t for t in tasks if t.completed])
    return DashboardStatsResponse(
        total_tasks=len(tasks),
        active_tasks=active,
        completed_tasks=completed,
    )
@router.get("/dashboard/weekly")
def get_weekly_tasks(
    current_user: User = Depends(get_current_user),
):
    # When you make this dynamic, filter by current_user.id
    return [
        {"day": "Mon", "completed": 3},
        {"day": "Tue", "completed": 5},
        {"day": "Wed", "completed": 2},
        {"day": "Thu", "completed": 7},
        {"day": "Fri", "completed": 4},
        {"day": "Sat", "completed": 6},
        {"day": "Sun", "completed": 1},
    ]

@router.get("/dashboard/active", response_model=DashboardTaskResponse)
def get_active_tasks(
    skip: int = Query(0, ge=0),
    limit: int = Query(5, ge=1),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    active = session.exec(
        select(Task)
        .where(Task.user_id == current_user.id, Task.completed == False)
        .offset(skip)
        .limit(limit)
    ).all()

    total_active = session.exec(
        select(Task).where(Task.user_id == current_user.id, Task.completed == False)
    ).all()

    return {
        "tasks": active,
        "has_next": skip + limit < len(total_active),
    }

@router.get("/dashboard/completed", response_model=DashboardTaskResponse)
def get_completed_tasks(
    skip: int = Query(0, ge=0),
    limit: int = Query(5, ge=1),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    completed = session.exec(
        select(Task)
        .where(Task.user_id == current_user.id, Task.completed == True)
        .offset(skip)
        .limit(limit)
    ).all()

    total_completed = session.exec(
        select(Task).where(Task.user_id == current_user.id, Task.completed == True)
    ).all()

    return {
        "tasks": completed,
        "has_next": skip + limit < len(total_completed),
    }

from fastapi import UploadFile, File
import cloudinary.uploader
import cloud_config
@router.post("/{task_id}/resource")
def upload_resource(
    task_id: int,
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),   # added
):
    task = session.get(Task, task_id)
    if not task or task.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Task not found")

    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only images are allowed.")

    result = cloudinary.uploader.upload(
        file.file,
        folder="task_manager/resources"
    )
    task.resource_url = result["secure_url"]
    task.resource_public_id = result["public_id"]

    session.add(task)
    session.commit()
    session.refresh(task)

    return task