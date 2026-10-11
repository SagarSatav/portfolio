# Knowledge base (AI brain)

Shared by **`backend/ai`**. Feed files here, then ingest via the Python service.

## Folders

| Folder | What to put | How |
| --- | --- | --- |
| `resume/` | PDF resume | Already seeded |
| `linkedin/` | LinkedIn export or `profile.md` | Manual paste/export |
| `portfolio/` | Site facts markdown | `npm run knowledge:export` (from `~/portfolio`) |
| `general/` | FAQ / availability | Edit `faq.md` |

## Sync portfolio site data

```bash
cd ~/portfolio
npm run knowledge:export
```

`scripts/export-knowledge.mjs` is **only a read + write sync**:

1. Reads `frontend/src/data/*`
2. Writes `knowledge/portfolio/*.md`

It does not update the UI, call backend services, or run RAG ingest.
