from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean
from sqlalchemy import DateTime

from datetime import datetime

from app.db.database import Base

class Lead(Base):

    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String)

    phone_number = Column(String)

    city = Column(String)

    electricity_bill = Column(String)

    roof_type = Column(String)

    required_kw = Column(String)

    property_type = Column(String)

    subsidy_interest = Column(Boolean)

    message = Column(String)

    status = Column(
        String,
        default="new"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )