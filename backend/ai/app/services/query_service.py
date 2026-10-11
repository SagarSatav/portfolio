"""Retrieve + answer from the personal knowledge base (stub — Phase 3)."""


def query_knowledge(question: str, top_k: int = 5, sources: list[str] | None = None) -> dict:
    """
    Phase 3 implementation plan:
    1. Embed question
    2. Similarity search in Chroma (filter by sources if provided)
    3. Build grounded prompt with retrieved chunks
    4. Call Gemini; refuse if context is empty / off-topic
    """
    return {
        "answer": (
            "RAG query stub only. Wire embeddings + Chroma + Gemini in Phase 3. "
            f"Received question: {question!r}"
        ),
        "hits": [],
        "status": "stub",
        "top_k": top_k,
        "sources": sources or ["resume", "linkedin", "portfolio", "general"],
    }
