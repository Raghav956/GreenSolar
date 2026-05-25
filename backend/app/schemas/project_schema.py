from pydantic import BaseModel

class ProjectCreateSchema(BaseModel):

    title: str

    description: str

    address: str

    latitude: float

    longitude: float

    location: str

    capacity: str

    project_type: str

    customer_name: str

    phone_number: str