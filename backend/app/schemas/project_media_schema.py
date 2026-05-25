from pydantic import BaseModel

class ProjectMediaSchema(BaseModel):

    media_url: str

    media_type: str