from sqlmodel import Session, select

from db import engine
from backend.models.model import Category


DEFAULT_CATEGORIES = [
    "Work",
    "Personal",
    "Study",
    "Shopping",
    "Health",
]


def seed_categories():
    with Session(engine) as session:

        for name in DEFAULT_CATEGORIES:

            exists = session.exec(
                select(Category).where(Category.name == name)
            ).first()

            if not exists:
                session.add(Category(name=name))

        session.commit()