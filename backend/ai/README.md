# Backend AI — Python RAG

FastAPI microservice. Uses local virtualenv **`myenv`** (not `.venv`).

For the full npm + myenv explanation, see the root [README.md](../../README.md).

## One-command install (from `~/portfolio`)

```bash
cd ~/portfolio
npm run install:backend
```

## Manual `myenv` setup

```bash
cd ~/portfolio/backend/ai
python3 -m venv myenv
source myenv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

## Run

```bash
# from ~/portfolio (uses myenv/bin/python via npm)
cd ~/portfolio
npm run dev:ai

# or manually
cd ~/portfolio/backend/ai
source myenv/bin/activate
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Docs: http://127.0.0.1:8000/docs

## Why there is a `package.json` here

AI is Python, but `package.json` scripts wrap `myenv` + `uvicorn` so you can use the same `npm run …` style as Node services.

| Script | Purpose |
| --- | --- |
| `install:env` | Create `myenv` + pip install requirements |
| `dev` | uvicorn with reload |
| `start` | uvicorn without reload |
