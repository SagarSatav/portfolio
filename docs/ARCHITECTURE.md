# Cosmic Security Portfolio — Architecture

Theme reference: `frontend/public/theme/cosmic-reference.png`  
Requirements: `docs/portfolio-requirements.txt`  
Resume PDF: `frontend/public/resume/sagar-satav-resume.pdf`  
Microservices: [MICROSERVICES.md](./MICROSERVICES.md)

## Monorepo layout

```text
portfolio/
├── frontend/                    # NEXT.JS — write UI here
│   ├── public/
│   └── src/
│       ├── app/
│       ├── components/
│       ├── data/
│       ├── hooks/ lib/ providers/ styles/
│
├── backend/                     # ALL BACKEND SERVICES
│   ├── api/                     # NODE.JS — write APIs / agent here
│   │   └── src/{agents,routes,tools,services,guardrails,config}
│   └── ai/                      # PYTHON — write RAG / AI here
│       └── app/{routers,services,models}
│
├── knowledge/                   # Shared AI knowledge sources
├── scripts/
└── docs/
```

| You want to… | Open this folder |
| --- | --- |
| Build pages / UI | `frontend/src/components/` |
| Edit resume site content | `frontend/src/data/` |
| Add chat API / tools | `backend/api/src/` |
| Add ingest / embeddings / RAG | `backend/ai/app/` |
| Feed LinkedIn / resume for chatbot | `knowledge/` |

---

## Frontend coding guide (`frontend/`)

Path alias: `@/*` → `frontend/src/*` (see `frontend/jsconfig.json`)

### Rule of thumb

| Put it in… | When… |
| --- | --- |
| `src/data/` | Content from resume |
| `src/components/sections/` | Full page sections |
| `src/components/ui/` | Reusable UI |
| `src/components/layout/` | Navbar, Footer |
| `src/components/cosmic/` | 3D / space visuals |
| `src/components/chatbot/` | Chat widget UI |
| `src/styles/` | SCSS modules |
| `src/app/api/chat/` | BFF proxy only |

### Imports

```js
import { profile } from "@/data/profile";
import { HeroSection } from "@/components/sections";
import { Button } from "@/components/ui/Button";
import styles from "@/styles/cosmic.module.scss";
```

### Styling

1. **Tailwind** first  
2. **`globals.css`** for theme tokens  
3. **SCSS modules** for complex effects  

```jsx
import styles from "@/styles/cosmic.module.scss";

<div className={styles.glassPanel}>…</div>
```

---

## Backend API coding guide (`backend/api/`)

```js
// routes — HTTP
import chatRoutes from "./routes/chatRoutes.js";

// agent — orchestration
import { runPortfolioAgent } from "../agents/portfolioAgent.js";

// call Python AI
import { queryRag } from "../services/ragClient.js";
```

Add new HTTP features as new files under `src/routes/` and mount them in `src/app.js`.

---

## Backend AI coding guide (`backend/ai/`)

```python
# routers — FastAPI endpoints
from app.routers import health, ingest, query

# services — business logic
from app.services.ingest_service import ingest_source
from app.services.query_service import query_knowledge
```

Implement real Chroma + Gemini inside `app/services/` (Phase 3).

---

## Design principles

1. **Frontend ≠ Backend** — UI in `frontend/`, APIs in `backend/`.  
2. **AI stays in Python** — Node calls AI over HTTP; no embeddings in Express.  
3. **Content ≠ UI** — site copy in `frontend/src/data/`; chatbot corpus in `knowledge/`.  
4. **No secrets in browser** — keys only in `backend/api/.env` and `backend/ai/.env`.  

## Coding phases

| Phase | Deliverable |
| --- | --- |
| 0 | Monorepo + microservice folders (**done**) |
| 1 | Frontend UI (Hero → Contact) |
| 2 | Three.js cosmic elements |
| 3 | Real AI ingest + agent + chatbot UI |
| 4 | Deploy (frontend Vercel; backend services separately) |
