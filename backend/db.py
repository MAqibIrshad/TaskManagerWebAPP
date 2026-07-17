from sqlmodel import Session, SQLModel, create_engine
import os
from sqlmodel import SQLModel,create_engine, Session
import logging
from config import settings
engine = create_engine(
    settings.DB_URI,
    echo=True  
)

def create_db_tables():
    SQLModel.metadata.create_all(engine)
    logging.info("DB Tables Made!")

def get_session():
    with Session(engine) as session:
        yield session
        logging.info("Session Executed!")

