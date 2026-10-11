# Sagar Satav — Cosmic Security Portfolio

Monorepo with clear **frontend** + **backend** separation.

| Layer | Path | Tech | Port |
| --- | --- | --- | --- |
| Frontend | `frontend/` | Next.js (JavaScript) | `3000` |
| Backend API | `backend/api/` | Node.js (Express) | `3001` |
| Backend AI | `backend/ai/` | Python (FastAPI) + **`myenv`** | `8000` |

---

## Folder structure

```text
portfolio/
├── frontend/                 # Next.js UI
│   ├── package.json          # next dev / build / start
│   ├── public/
│   └── src/
│
├── backend/
│   ├── api/                  # Node.js service
│   │   ├── package.json      # node --watch / node server
│   │   └── src/
│   └── ai/                   # Python AI service
│       ├── package.json      # npm wrappers around myenv + uvicorn
│       ├── myenv/            # Python virtualenv (gitignored, created locally)
│       ├── requirements.txt
│       └── app/
│
├── knowledge/                # Resume / LinkedIn / portfolio facts for AI
├── scripts/
├── docs/
├── package.json              # ROOT orchestrator (run commands from here)
└── README.md
```

---

## Important: always run npm from the repo root

```bash
cd ~/portfolio
```

Root `package.json` does **not** contain Next/Express/Python code.  
It only **delegates** to each service with `npm run … --prefix <folder>`.

Example:

```json
"dev:frontend": "npm run dev --prefix frontend"
```

means: go into `frontend/package.json` and run its `"dev"` script.

---

## 1) Python `myenv` (Backend AI)

AI code is **Python**, but we still use **npm scripts as a launcher** so you can start everything the same way (`npm run …`).

Environment name: **`myenv`** (folder: `backend/ai/myenv/`)  
Not `.venv`.

### Option A — one command (recommended)

From repo root:

```bash
npm run install:backend
```

What this does (from root `package.json`):

```json
"install:backend": "npm install --prefix backend/api && npm run install:env --prefix backend/ai"
```

1. Installs Node packages for `backend/api`
2. Runs AI’s `install:env` script, which:
   - creates `backend/ai/myenv` if missing
   - upgrades pip
   - installs Python packages from `requirements.txt` into `myenv`

AI `install:env` script (`backend/ai/package.json`):

```json
"install:env": "sh -c 'if [ ! -x myenv/bin/python ]; then python3 -m venv myenv; fi && myenv/bin/pip install --upgrade pip && myenv/bin/pip install -r requirements.txt'"
```

### Option B — create `myenv` manually

```bash
cd ~/portfolio/backend/ai

# 1) Create virtual environment named myenv
python3 -m venv myenv

# 2) Activate it (Linux / macOS)
source myenv/bin/activate

# 3) Upgrade pip + install AI dependencies
pip install --upgrade pip
pip install -r requirements.txt

# 4) (optional) check
which python          # should point inside .../backend/ai/myenv/bin/python
python --version
pip list

# 5) Leave the env later
deactivate
```

Windows (PowerShell) equivalent:

```powershell
cd ~/portfolio/backend/ai
python -m venv myenv
.\myenv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### How npm runs Python (why `npm run dev:ai` works)

Root:

```json
"dev:ai": "npm run dev --prefix backend/ai"
```

→ runs `backend/ai/package.json` → `"dev"`:

```json
"dev": "sh -c 'if [ -x myenv/bin/python ]; then myenv/bin/python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000; else echo \"Missing myenv...\"; exit 1; fi'"
```

So npm is **not** installing Python packages by itself.  
It just calls:

```bash
backend/ai/myenv/bin/python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

That is the same as activating `myenv` and running uvicorn.

### Manual AI run (without npm)

```bash
cd ~/portfolio/backend/ai
source myenv/bin/activate
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Open: http://127.0.0.1:8000/docs

---

## 2) Root `package.json` scripts (explained)

File: `portfolio/package.json`

### Install scripts

| Command | What it runs | Meaning |
| --- | --- | --- |
| `npm run install:frontend` | `npm install --prefix frontend` | Install Next.js deps into `frontend/node_modules` |
| `npm run install:backend` | Node API install + AI `install:env` | Backend only (Node + Python myenv) |
| `npm run install:all` | frontend + backend installs | Full project setup |

### Dev / run scripts

| Command | Delegates to | Actual tool |
| --- | --- | --- |
| `npm run dev` | same as `dev:frontend` | Next.js dev server |
| `npm run dev:frontend` | `frontend` → `next dev` | Frontend on `:3000` |
| `npm run dev:backend` | `backend/api` → `node --watch src/server.js` | Node API on `:3001` |
| `npm run dev:ai` | `backend/ai` → `myenv/bin/python -m uvicorn …` | Python AI on `:8000` |

### Build / production / lint (frontend)

| Command | Delegates to | Meaning |
| --- | --- | --- |
| `npm run build` | `frontend` → `next build` | Production build of the website |
| `npm run start` | `frontend` → `next start` | Serve the built frontend |
| `npm run lint` | `frontend` → `eslint` | Lint frontend code |

### Utility

| Command | Meaning |
| --- | --- |
| `npm run knowledge:export` | Sync `frontend/src/data/*` → `knowledge/portfolio/*.md` for AI ingest |

---

## 3) Service-level `package.json` scripts

### Frontend — `frontend/package.json`

| Script | Command | Use |
| --- | --- | --- |
| `dev` | `next dev` | Local development |
| `build` | `next build` | Create production build in `.next/` |
| `start` | `next start` | Run production build |
| `lint` | `eslint` | Code quality |

From root you usually don’t `cd frontend`; use:

```bash
npm run dev:frontend
npm run build
npm run start
```

### Backend API (Node) — `backend/api/package.json`

| Script | Command | Use |
| --- | --- | --- |
| `dev` | `node --watch src/server.js` | Auto-restart on file changes |
| `start` | `node src/server.js` | Production-style run (no watch) |

```bash
npm run dev:backend          # from root (preferred)
# or
cd backend/api && npm run dev
```

### Backend AI (Python) — `backend/ai/package.json`

This file exists so npm can manage Python the same way as Node.

| Script | What it does |
| --- | --- |
| `install:env` | Create `myenv` if needed + `pip install -r requirements.txt` |
| `dev` | Start uvicorn with **reload** using `myenv/bin/python` |
| `start` | Start uvicorn **without** reload (production-style) |

```bash
npm run install:backend      # creates myenv + installs pip packages
npm run dev:ai               # development
npm run start --prefix backend/ai   # production-style AI server
```

---

## 4) Full setup + run guide

### First time

```bash
cd ~/portfolio

# Frontend deps
npm run install:frontend

# Backend: Node API + Python myenv + pip packages
npm run install:backend

# Copy env files
cp frontend/.env.example frontend/.env
cp backend/api/.env.example backend/api/.env
cp backend/ai/.env.example backend/ai/.env
# then edit GEMINI_API_KEY inside backend/*.env when you implement Phase 3

# Export site content into knowledge/ for AI
npm run knowledge:export
```

### Every day (3 terminals, from repo root)

```bash
# Terminal 1 — AI (Python / myenv)
npm run dev:ai
# → http://127.0.0.1:8000

# Terminal 2 — Backend API (Node)
npm run dev:backend
# → http://localhost:3001

# Terminal 3 — Frontend (Next.js)
npm run dev:frontend
# → http://localhost:3000
```

### Production-style (frontend)

```bash
npm run build      # next build
npm run start      # next start
```

Backend services:

```bash
npm run start --prefix backend/api   # Node without --watch
npm run start --prefix backend/ai    # uvicorn without --reload
```

---

## 5) How the pieces talk (chat request flow)

```text
Browser (chat UI on the website)
  → frontend (Next.js :3000)
      → POST /api/chat   (thin BFF)
          → backend/api (Node :3001)
              → backend/ai (Python :8000)
                  → answers using ingested knowledge/
```

- **npm** = convenient command runner for all services  
- **Node** = real backend API (`backend/api`)  
- **Python + myenv** = real AI service (`backend/ai`)  
- Frontend never holds Gemini/API keys (`NEXT_PUBLIC_*` is not for secrets)

---

## 5b) Knowledge → AI flow (`export-knowledge` — not shown on UI)

Website content and AI knowledge are **separate**:

| Path | Used for |
| --- | --- |
| `frontend/src/data/*.js` | Website UI (Hero, Skills, Projects…) |
| `knowledge/**` | AI / RAG only (not rendered on the UI) |

### Flow

```text
1) You edit site data
   frontend/src/data/profile.js, skills.js, projects.js, experience.js

2) Export for AI (prepare markdown files)
   npm run knowledge:export
   → scripts/export-knowledge.mjs
   → writes knowledge/portfolio/*.md

3) Also feed other sources manually (optional)
   knowledge/resume/     ← PDF resume
   knowledge/linkedin/   ← LinkedIn export / profile.md
   knowledge/general/    ← FAQ, availability notes

4) AI service ingests knowledge/ (Phase 3)
   backend/ai  → POST /ingest/folder
   → chunks + embeddings + ChromaDB

5) Visitor asks chatbot
   Browser → BFF → backend/api → backend/ai → retrieves from knowledge → answer
```

### What `scripts/export-knowledge.mjs` does (only this)

It is a **read + write sync** script. Nothing more.

1. **Read** `frontend/src/data/*.js` (profile, skills, projects, experience)
2. **Write** the same facts into `knowledge/portfolio/*.md`

It does **not**:
- render anything on the website UI
- call the Node API or Python AI
- ingest into Chroma / run embeddings
- start any server

Purpose: keep site data and the AI knowledge folder in sync so RAG can use the same facts later.

### Important

- `npm run knowledge:export` does **not** update the website UI.
- It only syncs UI data into `knowledge/portfolio/` for the **Python AI/RAG** service.
- Run it whenever you change `frontend/src/data/*`, before (re)ingesting into AI.

---

## 6) Common issues

### `Missing myenv`
```bash
npm run install:backend
# or create manually (see Option B above)
```

### Wrong folder
Scripts assume you are in `~/portfolio` (repo root), not inside `frontend/` or `backend/ai/`.

### Port already in use
Stop the old process, or change ports in:
- Frontend: `next dev -p 3000`
- API: `PORT=3001` in `backend/api/.env`
- AI: `--port 8000` in `backend/ai/package.json`

### Reinstall Python packages into myenv
```bash
cd backend/ai
source myenv/bin/activate
pip install -r requirements.txt
```

or from root:

```bash
npm run install:env --prefix backend/ai
```

---

## More docs

- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) — folder-wise coding guide  
- [docs/MICROSERVICES.md](./docs/MICROSERVICES.md) — service roles + APIs  
- [docs/ROADMAP.md](./docs/ROADMAP.md)  
- [frontend/README.md](./frontend/README.md)  
- [backend/README.md](./backend/README.md)  
- [backend/ai/README.md](./backend/ai/README.md)  
