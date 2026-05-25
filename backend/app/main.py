from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.auth_router import router as auth_router

from app.routers.project_router import router as project_router
from app.routers.upload_router import router as upload_router



from app.routers.analytics_router import (
    router as analytics_router
)
from app.routers.lead_router import (
    router as lead_router
)
from app.routers.complaint_router import (
    router as complaint_router
)
from app.routers.pricing_router import router as pricing_router
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

app.include_router(project_router)
app.include_router(upload_router)
app.include_router(analytics_router)
app.include_router(lead_router)
app.include_router(complaint_router)
app.include_router(pricing_router)
@app.get("/")

def home():

    return {
        "message": "GreenSolar Backend Running"
    }