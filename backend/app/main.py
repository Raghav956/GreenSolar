import os

from fastapi import FastAPI
from fastapi import Response
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

frontend_origins = os.getenv(
    "FRONTEND_ORIGINS",
    "https://rbsolarcare.in,https://www.rbsolarcare.in,http://localhost:5173"
)

allowed_origins = [
    origin.strip()
    for origin in frontend_origins.split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def handle_cors_preflight(
    request,
    call_next
):
    origin = request.headers.get("origin")

    if (
        request.method == "OPTIONS"
        and origin
    ):
        response = Response(status_code=204)

        if origin in allowed_origins:
            response.headers[
                "Access-Control-Allow-Origin"
            ] = origin
            response.headers[
                "Access-Control-Allow-Credentials"
            ] = "true"

        response.headers[
            "Access-Control-Allow-Methods"
        ] = "GET, POST, PUT, DELETE, OPTIONS"
        response.headers[
            "Access-Control-Allow-Headers"
        ] = request.headers.get(
            "access-control-request-headers",
            "Authorization, Content-Type"
        )
        response.headers[
            "Access-Control-Max-Age"
        ] = "86400"
        response.headers["Vary"] = "Origin"

        return response

    return await call_next(request)

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
