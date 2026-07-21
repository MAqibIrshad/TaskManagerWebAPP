from fastapi import FastAPI
from contextlib import asynccontextmanager
import logging
from db  import create_db_tables
from seed import seed_categories
from backend.routes.authroutes import router as auth_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_tables()
    seed_categories()
    yield


app = FastAPI(lifespan=lifespan)
if not app:
    logging.error("App not started due to some bug...")
else:
    logging.info("App Started!")

from backend.routes.tasksroutes import router as task_router
from backend.routes.categoryroutes import router as category_router
app.include_router(task_router)
app.include_router(category_router)
app.include_router(auth_router)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)