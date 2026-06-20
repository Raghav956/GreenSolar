from sqlalchemy import text

from app.db.database import engine


def migrate():
    with engine.begin() as connection:
        connection.execute(
            text(
                """
                ALTER TABLE project_media
                ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT FALSE
                """
            )
        )

        connection.execute(
            text(
                """
                WITH first_media AS (
                    SELECT DISTINCT ON (project_id) id
                    FROM project_media
                    ORDER BY project_id, id
                )
                UPDATE project_media
                SET is_featured = TRUE
                WHERE id IN (
                    SELECT id FROM first_media
                )
                AND NOT EXISTS (
                    SELECT 1
                    FROM project_media existing
                    WHERE existing.project_id = project_media.project_id
                    AND existing.is_featured = TRUE
                )
                """
            )
        )


if __name__ == "__main__":
    migrate()
    print("project_media.is_featured migration completed")
