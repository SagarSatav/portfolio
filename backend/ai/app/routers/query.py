from fastapi import APIRouter

from app.models.schemas import QueryRequest, QueryResponse
from app.services.query_service import query_knowledge

router = APIRouter(prefix="/rag", tags=["rag"])


@router.post("/query", response_model=QueryResponse)
def rag_query(body: QueryRequest):
    result = query_knowledge(
        question=body.question,
        top_k=body.top_k,
        sources=body.sources,
    )
    return QueryResponse(
        answer=result["answer"],
        hits=result.get("hits", []),
        status=result["status"],
    )
