# Microservice architecture

## Official layout

```text
portfolio/
├── frontend/          # Next.js
├── backend/
│   ├── api/           # Node.js service
│   └── ai/            # Python AI service
├── knowledge/         # Shared ingest sources
└── docs/
```

| Layer | Tech | Folder | Port |
| --- | --- | --- | --- |
| **Frontend** | Next.js (JS) | `frontend/` | `3000` |
| **Backend API** | Node.js (Express) | `backend/api/` | `3001` |
| **Backend AI** | Python (FastAPI) | `backend/ai/` | `8000` |

## Flow

```text
Browser (frontend)
   → POST /api/chat          (Next.js BFF in frontend/)
   → backend/api :3001       (Node — guardrails, agent, tools)
   → backend/ai  :8000       (Python — ingest + RAG)
   → knowledge/              (resume, linkedin, portfolio, general)
```

## Where to write code

### Frontend — `frontend/src/`

| Folder | Write here |
| --- | --- |
| `components/sections/` | Hero, About, Skills… |
| `components/ui/` | Button, GlassCard… |
| `components/chatbot/` | Chat widget UI |
| `data/` | Resume content for the site |
| `app/api/chat/` | Thin proxy only (no business logic) |

### Backend API — `backend/api/src/`

| Folder | Write here |
| --- | --- |
| `routes/` | HTTP endpoints (`/chat`, `/health`, future APIs) |
| `agents/` | Agent orchestration / Gemini tool loop |
| `tools/` | Tool definitions + executor |
| `services/` | Clients (e.g. `ragClient.js` → AI service) |
| `guardrails/` | Input/output safety |
| `config/` | Env loading |

### Backend AI — `backend/ai/app/`

| Folder | Write here |
| --- | --- |
| `routers/` | FastAPI routes (ingest, query, health) |
| `services/` | Ingest, chunking, embeddings, retrieval |
| `models/` | Pydantic request/response schemas |
| `config.py` | Env + paths |

### Knowledge — `knowledge/`

| Folder | Put |
| --- | --- |
| `resume/` | PDF resume |
| `linkedin/` | LinkedIn export / `profile.md` |
| `portfolio/` | Auto from `npm run knowledge:export` |
| `general/` | FAQ / availability notes |

## Local run (from `~/portfolio`)

```bash
cd ~/portfolio

# AI (Python myenv)
npm run dev:ai

# API (Node)
npm run dev:backend

# Frontend (Next.js)
npm run dev:frontend
```

Env files:

- `~/portfolio/frontend/.env`
- `~/portfolio/backend/api/.env`
- `~/portfolio/backend/ai/.env`

## API contracts

### Node API — `POST /chat`

```json
{ "messages": [{ "role": "user", "content": "What projects has Sagar built?" }] }
```

### Python AI — `POST /ingest/folder`

```json
{ "source": "resume" }
```

### Python AI — `POST /rag/query`

```json
{ "question": "Does Sagar know Keycloak?", "top_k": 5 }
```
