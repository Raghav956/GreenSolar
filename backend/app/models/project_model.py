from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import Float

from app.db.database import Base

class Project(Base):

    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    description = Column(Text)

    address = Column(String)

    latitude = Column(Float)

    longitude = Column(Float)

    location = Column(String)

    capacity = Column(String)

    project_type = Column(String)

    customer_name = Column(String)

    phone_number = Column(String)