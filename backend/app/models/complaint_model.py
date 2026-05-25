from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey
from sqlalchemy import DateTime

from datetime import datetime

from app.db.database import Base

class Complaint(Base):

    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    project_id = Column(
        Integer,
        ForeignKey("projects.id")
    )

    customer_phone = Column(String)

    complaint_title = Column(String)

    complaint_description = Column(String)

    media_url = Column(String)

    complaint_status = Column(
        String,
        default="Pending"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )