from app.db.database import SessionLocal
from app.models.project_model import Project


STARTER_PROJECTS = [
    {
        "title": "Starter Project 70KW",
        "description": "Starter solar installation project. Update details from the admin dashboard.",
        "address": "Kanpur, Uttar Pradesh",
        "latitude": 26.4499,
        "longitude": 80.3319,
        "location": "Kanpur",
        "capacity": "70KW",
        "project_type": "Commercial",
        "customer_name": "Starter Customer",
        "phone_number": "0000000000",
    },
    {
        "title": "Starter Project 15KW",
        "description": "Starter solar installation project. Update details from the admin dashboard.",
        "address": "Lucknow, Uttar Pradesh",
        "latitude": 26.8467,
        "longitude": 80.9462,
        "location": "Lucknow",
        "capacity": "15KW",
        "project_type": "Residential",
        "customer_name": "Starter Customer",
        "phone_number": "0000000000",
    },
    {
        "title": "Starter Project 12KW",
        "description": "Starter solar installation project. Update details from the admin dashboard.",
        "address": "Prayagraj, Uttar Pradesh",
        "latitude": 25.4358,
        "longitude": 81.8463,
        "location": "Prayagraj",
        "capacity": "12KW",
        "project_type": "Residential",
        "customer_name": "Starter Customer",
        "phone_number": "0000000000",
    },
    {
        "title": "Starter Project 5KW A",
        "description": "Starter solar installation project. Update details from the admin dashboard.",
        "address": "Varanasi, Uttar Pradesh",
        "latitude": 25.3176,
        "longitude": 82.9739,
        "location": "Varanasi",
        "capacity": "5KW",
        "project_type": "Residential",
        "customer_name": "Starter Customer",
        "phone_number": "0000000000",
    },
    {
        "title": "Starter Project 3KW",
        "description": "Starter solar installation project. Update details from the admin dashboard.",
        "address": "Agra, Uttar Pradesh",
        "latitude": 27.1767,
        "longitude": 78.0081,
        "location": "Agra",
        "capacity": "3KW",
        "project_type": "Residential",
        "customer_name": "Starter Customer",
        "phone_number": "0000000000",
    },
    {
        "title": "Starter Project 50KW",
        "description": "Starter solar installation project. Update details from the admin dashboard.",
        "address": "Noida, Uttar Pradesh",
        "latitude": 28.5355,
        "longitude": 77.3910,
        "location": "Noida",
        "capacity": "50KW",
        "project_type": "Commercial",
        "customer_name": "Starter Customer",
        "phone_number": "0000000000",
    },
    {
        "title": "Starter Project 25KW",
        "description": "Starter solar installation project. Update details from the admin dashboard.",
        "address": "Ghaziabad, Uttar Pradesh",
        "latitude": 28.6692,
        "longitude": 77.4538,
        "location": "Ghaziabad",
        "capacity": "25KW",
        "project_type": "Commercial",
        "customer_name": "Starter Customer",
        "phone_number": "0000000000",
    },
    {
        "title": "Starter Project 5KW B",
        "description": "Starter solar installation project. Update details from the admin dashboard.",
        "address": "Bareilly, Uttar Pradesh",
        "latitude": 28.3670,
        "longitude": 79.4304,
        "location": "Bareilly",
        "capacity": "5KW",
        "project_type": "Residential",
        "customer_name": "Starter Customer",
        "phone_number": "0000000000",
    },
    {
        "title": "Starter Project 4.5KW",
        "description": "Starter solar installation project. Update details from the admin dashboard.",
        "address": "Meerut, Uttar Pradesh",
        "latitude": 28.9845,
        "longitude": 77.7064,
        "location": "Meerut",
        "capacity": "4.5KW",
        "project_type": "Residential",
        "customer_name": "Starter Customer",
        "phone_number": "0000000000",
    },
]


def seed_projects():
    db = SessionLocal()

    try:
        added = 0

        for project_data in STARTER_PROJECTS:
            existing_project = db.query(Project).filter(
                Project.title == project_data["title"]
            ).first()

            if existing_project:
                continue

            db.add(Project(**project_data))
            added += 1

        db.commit()

        print(f"Starter projects added: {added}")
    finally:
        db.close()


if __name__ == "__main__":
    seed_projects()
