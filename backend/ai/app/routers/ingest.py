from fastapi import APIRouter, HTTPException

from app.config import ALLOWED_SOURCES
from app.models.schemas import IngestFolderRequest, IngestResponse
from app.services.ingest_service import ingest_source

router = APIRouter(prefix="/ingest", tags=["ingest"])


@router.post("/folder", response_model=IngestResponse)
def ingest_folder(body: IngestFolderRequest):
    if body.source not in ALLOWED_SOURCES:
        raise HTTPException(
            status_code=400,
            detail=f"source must be one of: {', '.join(ALLOWED_SOURCES)}",
        )
    try:
        result = ingest_source(body.source)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    return IngestResponse(**result)
