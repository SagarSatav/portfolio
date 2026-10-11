# Implementation roadmap

## Phase 0 — Architecture ✅

- [x] Official `create-next-app` → converted to JavaScript
- [x] Monorepo: `frontend/` + `backend/{api,ai}`
- [x] Tailwind + CSS + SCSS on frontend
- [x] Knowledge folders + `npm run knowledge:export`
- [x] Next BFF → Node API → Python AI stubs

## Phase 1 — Frontend UI

- [ ] Navbar + Hero + About
- [ ] Skills / Projects / Experience / Contact
- [ ] Responsive polish

## Phase 2 — Three.js

- [ ] Starfield / planet with fallbacks

## Phase 3 — Chatbot microservices

- [ ] Python ingest (resume, LinkedIn, portfolio → Chroma)
- [ ] Node Gemini tool-calling agent
- [ ] ChatbotWidget UI in frontend
- [ ] Tokens + auth between BFF ↔ API ↔ AI

## Phase 3+ — Chat history, rate limits, analytics (Node DB)

Needed for product use (not for AI vectors):

- [ ] Add DB to `backend/api` (MongoDB recommended; Postgres also fine)
- [ ] Save chat history per user/session (`sessionId` or auth user)
- [ ] Rate-limit `/chat` (IP / session) + persist rate-limit logs
- [ ] Basic analytics (messages/day, blocked requests, popular questions)
- [ ] Optional Redis for faster rate-limit counters

AI stays on **Chroma** only. History/analytics stay on **Mongo/Postgres** in Node.

## Phase 4 — Ship

- [ ] SEO / a11y
- [ ] Deploy frontend + backend services (+ DB)
