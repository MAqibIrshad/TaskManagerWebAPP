from fastapi import FastAPI
from contextlib import asynccontextmanager
import logging
from db  import create_db_tables

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_tables()
    yield


app = FastAPI(lifespan=lifespan)
if not app:
    logging.error("App not started due to some bug...")
else:
    logging.info("App Started!")

from tasksroutes import router as task_router

app.include_router(task_router)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)