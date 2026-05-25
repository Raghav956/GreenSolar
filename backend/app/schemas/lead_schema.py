from pydantic import BaseModel

class LeadCreateSchema(BaseModel):

    full_name: str

    phone_number: str

    city: str

    electricity_bill: str

    roof_type: str

    required_kw: str

    property_type: str

    subsidy_interest: bool

    message: str