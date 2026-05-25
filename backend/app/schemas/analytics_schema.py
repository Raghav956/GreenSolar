from pydantic import BaseModel

class AnalyticsEventSchema(BaseModel):

    event_type: str

    event_data: str = ""