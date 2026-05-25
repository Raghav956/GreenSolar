from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from app.db.database import Base

class AnalyticsEvent(Base):

    __tablename__ = "analytics_events"

    id = Column(Integer, primary_key=True, index=True)

    event_type = Column(String, nullable=False)

    event_data = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )