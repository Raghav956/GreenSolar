from sqlalchemy import Column, Integer, String

from app.db.database import Base

class Testimonial(Base):

    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    review = Column(String, nullable=False)

    rating = Column(Integer, default=5)