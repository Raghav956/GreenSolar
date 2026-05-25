from pydantic import BaseModel

class PricingCreateSchema(BaseModel):

    brand: str

    price_per_kw: int


class PricingUpdateSchema(BaseModel):

    price_per_kw: int