from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str
    service: str = "portfolio-rag-service"


class IngestFolderRequest(BaseModel):
    source: str = Field(
        description="One of: resume | linkedin | portfolio | general"
    )


class IngestResponse(BaseModel):
    source: str
    files_processed: int
    chunk_count: int
    status: str
    detail: str = ""


class QueryRequest(BaseModel):
    question: str
    top_k: int = 5
    sources: list[str] | None = None


class QueryHit(BaseModel):
    text: str
    source: str
    score: float | None = None
    metadata: dict = Field(default_factory=dict)


class QueryResponse(BaseModel):
    answer: str
    hits: list[QueryHit]
    status: str
