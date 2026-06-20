from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.core.security import get_current_admin

from app.models.analytics_model import AnalyticsEvent

from app.schemas.analytics_schema import (
    AnalyticsEventSchema
)

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

# CREATE EVENT

@router.post("/event")

def create_event(
    data: AnalyticsEventSchema,
    db: Session = Depends(get_db)
):

    event = AnalyticsEvent(

        event_type=data.event_type,

        event_data=data.event_data
    )

    db.add(event)

    db.commit()

    db.refresh(event)

    return {
        "message": "Event Stored"
    }

# GET ALL EVENTS

@router.get("/")

def get_events(
    db: Session = Depends(get_db),
    _admin = Depends(get_current_admin)
):

    events = db.query(
        AnalyticsEvent
    ).all()

    return events

# DASHBOARD SUMMARY

@router.get("/summary")

def analytics_summary(
    db: Session = Depends(get_db),
    _admin = Depends(get_current_admin)
):

    total_events = db.query(
        AnalyticsEvent
    ).count()

    whatsapp_clicks = db.query(
        AnalyticsEvent
    ).filter(
        AnalyticsEvent.event_type == "whatsapp_click"
    ).count()

    project_views = db.query(
        AnalyticsEvent
    ).filter(
        AnalyticsEvent.event_type == "project_view"
    ).count()

    calculator_usage = db.query(
        AnalyticsEvent
    ).filter(
        AnalyticsEvent.event_type == "calculator_usage"
    ).count()

    return {

        "total_events": total_events,

        "whatsapp_clicks": whatsapp_clicks,

        "project_views": project_views,

        "calculator_usage": calculator_usage
    }
