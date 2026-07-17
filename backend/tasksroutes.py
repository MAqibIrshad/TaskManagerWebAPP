from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from db import get_session
from model import Task
from schema import (
    DashboardResponse,
    DashboardStatsResponse,
    DashboardTaskResponse,
    TaskCreate,
    TaskUpdate,
    TaskResponse,
)

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
)
from sqlalchemy import func
from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from fastapi import APIRouter, Depends, Query
from sqlmodel import Session, select

@router.get("/dashboard", response_model=DashboardResponse)
def get_dashboard(
    active_skip: int = Query(0, ge=0),
    completed_skip: int = Query(0, ge=0),
    limit: int = Query(5, ge=1),
    session: Session = Depends(get_session),
):
    tasks = session.exec(select(Task)).all()

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
@router.get(
    "/",
    response_model=list[TaskResponse],
    status_code=status.HTTP_200_OK,
)
def get_tasks(session: Session = Depends(get_session)):
    tasks = session.exec(select(Task)).all()
    return tasks


@router.get(
    "/{task_id}",
    response_model=TaskResponse,
    status_code=status.HTTP_200_OK,
)
def get_task(
    task_id: int,
    session: Session = Depends(get_session),
):
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found",
        )

    return task

@router.post(
    "/",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_task(
    task: TaskCreate,
    session: Session = Depends(get_session),
):
    new_task = Task.model_validate(task)

    session.add(new_task)
    session.commit()
    session.refresh(new_task)

    return new_task


@router.put(
    "/{task_id}",
    response_model=TaskResponse,
    status_code=status.HTTP_200_OK,
)
def update_task(
    task_id: int,
    task_update: TaskUpdate,
    session: Session = Depends(get_session),
):
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found",
        )

    update_data = task_update.model_dump(exclude_unset=True)

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
def delete_task(
    task_id: int,
    session: Session = Depends(get_session),
):
    task = session.get(Task, task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found",
        )

    session.delete(task)
    session.commit()

@router.get("/dashboard/stats", response_model=DashboardStatsResponse)
def get_dashboard_stats(
    session: Session = Depends(get_session),
):
    tasks = session.exec(select(Task)).all()

    total = len(tasks)
    active = len([t for t in tasks if not t.completed])
    completed = len([t for t in tasks if t.completed])

    return DashboardStatsResponse(
        total_tasks=total,
        active_tasks=active,
        completed_tasks=completed,
    )

@router.get("/dashboard/weekly")
def get_weekly_tasks():
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
):
    active = session.exec(
        select(Task)
        .where(Task.completed == False)
        .offset(skip)
        .limit(limit)
    ).all()

    total = session.exec(
        select(Task).where(Task.completed == False)
    ).all()

    return {
        "tasks": active,
        "has_next": skip + limit < len(total),
    }
@router.get("/dashboard/completed", response_model=DashboardTaskResponse,)
def get_completed_tasks(
    skip: int = Query(0, ge=0),
    limit: int = Query(5, ge=1),
    session: Session = Depends(get_session),
):
    completed = session.exec(
        select(Task)
        .where(Task.completed == True)
        .offset(skip)
        .limit(limit)
    ).all()

    total = session.exec(
        select(Task).where(Task.completed == True)
    ).all()

    return {
        "tasks": completed,
        "has_next": skip + limit < len(total),
    }