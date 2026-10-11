"""Ingest knowledge folders into the vector store (stub — implement Phase 3)."""

from pathlib import Path

from app.config import ALLOWED_SOURCES, KNOWLEDGE_ROOT


def list_source_files(source: str) -> list[Path]:
    if source not in ALLOWED_SOURCES:
        raise ValueError(f"Invalid source. Allowed: {', '.join(ALLOWED_SOURCES)}")

    folder = KNOWLEDGE_ROOT / source
    if not folder.exists():
        raise FileNotFoundError(f"Knowledge folder missing: {folder}")

    files: list[Path] = []
    for pattern in ("*.md", "*.txt", "*.pdf"):
        files.extend(sorted(folder.glob(pattern)))
    return [f for f in files if f.is_file()]


def ingest_source(source: str) -> dict:
    """
    Phase 3 implementation plan:
    1. Load PDF/MD/TXT from knowledge/<source>
    2. Clean + chunk text
    3. Embed with Gemini / chosen model
    4. Upsert into Chroma with metadata {source, filename}
    """
    files = list_source_files(source)
    return {
        "source": source,
        "files_processed": len(files),
        "chunk_count": 0,
        "status": "stub",
        "detail": (
            "Ingest not implemented yet. Files discovered: "
            + ", ".join(f.name for f in files)
            if files
            else "No files found in this source folder."
        ),
    }
