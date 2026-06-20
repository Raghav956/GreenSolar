from typing import Optional

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


class ProjectUpdateSchema(BaseModel):

    title: Optional[str] = None

    description: Optional[str] = None

    address: Optional[str] = None

    latitude: Optional[float] = None

    longitude: Optional[float] = None

    location: Optional[str] = None

    capacity: Optional[str] = None

    project_type: Optional[str] = None

    customer_name: Optional[str] = None

    phone_number: Optional[str] = None
