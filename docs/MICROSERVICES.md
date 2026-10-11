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

## Data stores

| Store | Service | Used for |
| --- | --- | --- |
| **Chroma** (vector) | `backend/ai` | RAG knowledge only |
| **MongoDB** (or Postgres) | `backend/api` | Chat history per user/session, analytics logs |
| **Redis** (optional) | `backend/api` | Faster rate-limit counters |

### Features you mainly need (Phase 3+)

1. **Save chat history per user/session** → MongoDB/Postgres in `backend/api`
2. **Analytics / rate-limit logs** → same DB (+ optional Redis)

Planned folders later in Node:

```text
backend/api/src/
  models/                 # Conversation, Message, RateLimitLog
  services/
    chatHistoryService.js
    rateLimitService.js
    analyticsService.js
```

AI stays on **Chroma**. History / rate limits / analytics stay on **Node + Mongo** (not in the vector DB).

## Security

- Browser → Next BFF only
- Optional tokens: `BACKEND_TOKEN`, `RAG_SERVICE_TOKEN`
- Chat history: start with anonymous `sessionId` unless you add real auth
- Knowledge base = public professional info only

## Status

| Piece | Status |
| --- | --- |
| 3-service layout | Done |
| Knowledge export | Done |
| Backend chat stub | Done |
| AI ingest/query stub | Done |
| Next BFF proxy | Done |
| Real Gemini + Chroma + UI | Phase 3 |
| Chat history + rate-limit/analytics DB | Phase 3+ (planned) |
