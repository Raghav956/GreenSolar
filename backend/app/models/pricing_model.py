from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.db.database import Base

class Pricing(Base):

    __tablename__ = "pricing"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    brand = Column(
        String,
        unique=True
    )

    price_per_kw = Column(
        Integer
    )