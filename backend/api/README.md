# Backend API — Node.js

Express microservice for portfolio APIs and the chatbot agent.

```text
backend/api/
├── src/
│   ├── agents/         # portfolioAgent.js
│   ├── config/         # env.js
│   ├── guardrails/     # input checks
│   ├── routes/         # /health, /chat
│   ├── services/       # ragClient.js → calls backend/ai
│   ├── tools/          # tool definitions + executor
│   ├── app.js
│   └── server.js
├── package.json
└── .env.example
```

## Run (preferred — from repo root)

```bash
cd ~/portfolio
npm run install:backend
npm run dev:backend
```

## Run from this folder

```bash
cd ~/portfolio/backend/api
npm install
cp .env.example .env
npm run dev
```

- Health: http://localhost:3001/health  
- Chat: `POST http://localhost:3001/chat`

Calls AI service at `RAG_SERVICE_URL` (default `http://localhost:8000`).
