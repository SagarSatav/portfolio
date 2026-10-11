# Backend

Two microservices live here:

| Service | Folder | Stack | Port | Responsibility |
| --- | --- | --- | --- | --- |
| **API** | `backend/api/` | Node.js + Express | `3001` | Chat API, agent tools, guardrails |
| **AI** | `backend/ai/` | Python + FastAPI | `8000` | Ingest knowledge, RAG, embeddings |

```text
backend/
├── api/          # Node.js backend service
│   └── src/
│       ├── agents/
│       ├── config/
│       ├── guardrails/
│       ├── routes/
│       ├── services/
│       └── tools/
└── ai/           # Python AI / RAG service
    └── app/
        ├── models/
        ├── routers/
        └── services/
```

## Quick start (from `~/portfolio`)

```bash
cd ~/portfolio

# Install BOTH backend services (Node API + Python myenv packages)
npm run install:backend

# Terminal A — AI (Python myenv)
npm run dev:ai

# Terminal B — API (Node)
npm run dev:backend
```

Python AI uses **`backend/ai/myenv`** (not `.venv`).

Shared knowledge files: `~/portfolio/knowledge`.

See [docs/MICROSERVICES.md](../docs/MICROSERVICES.md).
