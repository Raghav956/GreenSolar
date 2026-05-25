from pydantic import BaseModel

class ComplaintCreateSchema(BaseModel):

    customer_phone: str

    complaint_title: str

    complaint_description: str

    media_url: str = ""