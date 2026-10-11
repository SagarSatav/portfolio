# Frontend — Next.js

Cosmic portfolio UI (JavaScript + Tailwind + SCSS).

```text
frontend/
├── public/           # images, resume PDF, theme reference
├── src/
│   ├── app/          # routes + BFF /api/chat
│   ├── components/   # layout, sections, cosmic, chatbot, ui
│   ├── data/         # resume-backed content
│   ├── hooks/
│   ├── lib/
│   ├── providers/
│   └── styles/       # SCSS modules
├── package.json
└── .env.example
```

## Run (preferred — from repo root)

```bash
cd ~/portfolio
npm run install:frontend
npm run dev:frontend
```

## Run from this folder

```bash
cd ~/portfolio/frontend
npm install
cp .env.example .env
npm run dev
```

Chat BFF calls Node backend at `BACKEND_URL` (default `http://localhost:3001`).
