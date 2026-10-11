import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
KNOWLEDGE_ROOT = Path(
  os.getenv("KNOWLEDGE_ROOT", BASE_DIR.parent.parent / "knowledge")
).resolve()
CHROMA_DIR = Path(os.getenv("CHROMA_DIR", BASE_DIR / "chroma_db")).resolve()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")
RAG_SERVICE_TOKEN = os.getenv("RAG_SERVICE_TOKEN", "")
PORT = int(os.getenv("PORT", "8000"))
ALLOWED_SOURCES = ("resume", "linkedin", "portfolio", "general")
