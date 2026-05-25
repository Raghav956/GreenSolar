from app.db.database import engine

from app.models.user_model import User
from app.models.testimonial_model import Testimonial
from app.models.project_model import Project
from app.models.project_media_model import ProjectMedia
from app.models.analytics_model import AnalyticsEvent
from app.models.complaint_model import Complaint
from app.models.lead_model import Lead


User.metadata.create_all(bind=engine)
Testimonial.metadata.create_all(bind=engine)
Project.metadata.create_all(bind=engine)
ProjectMedia.metadata.create_all(bind=engine)
AnalyticsEvent.metadata.create_all(bind=engine)
Lead.metadata.create_all(bind=engine)
Complaint.metadata.create_all(bind=engine)

print("Database Tables Created Successfully")