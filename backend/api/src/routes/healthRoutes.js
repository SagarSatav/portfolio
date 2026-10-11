import { Router } from "express";
import { ragHealth } from "../services/ragClient.js";

const router = Router();

router.get("/", async (_req, res) => {
  let rag = { status: "unknown" };
  try {
    rag = await ragHealth();
  } catch {
    rag = { status: "unreachable" };
  }

  res.json({
    status: "healthy",
    service: "portfolio-backend",
    rag,
  });
});

export default router;
