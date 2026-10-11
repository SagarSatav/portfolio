from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import health, ingest, query

app = FastAPI(
    title="Portfolio RAG Service",
    description=(
        "Microservice that ingests resume, LinkedIn, portfolio, and general "
        "knowledge, then answers grounded questions for the portfolio chatbot."
    ),
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-RAG-Token"],
    allow_credentials=False,
)

app.include_router(health.router)
app.include_router(ingest.router)
app.include_router(query.router)


@app.get("/")
def root():
    return {
        "service": "portfolio-rag-service",
        "docs": "/docs",
        "health": "/health",
        "ingest": "POST /ingest/folder",
        "query": "POST /rag/query",
    }
