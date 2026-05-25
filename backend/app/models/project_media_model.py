from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey

from app.db.database import Base

class ProjectMedia(Base):

    __tablename__ = "project_media"

    id = Column(Integer, primary_key=True, index=True)

    project_id = Column(
        Integer,
        ForeignKey("projects.id")
    )

    media_url = Column(String, nullable=False)

    media_type = Column(String, nullable=False)