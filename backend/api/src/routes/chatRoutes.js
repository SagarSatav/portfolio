import { Router } from "express";
import { z } from "zod";
import { runPortfolioAgent } from "../agents/portfolioAgent.js";
import { env } from "../config/env.js";

const router = Router();

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().min(1),
      }),
    )
    .min(1),
});

function assertCallerToken(req, res) {
  if (!env.backendToken) return true;
  const header = req.get("x-backend-token") || "";
  if (header !== env.backendToken) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

router.post("/", async (req, res) => {
  if (!assertCallerToken(req, res)) return;

  const parsed = chatSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid body",
      details: parsed.error.flatten(),
    });
  }

  try {
    const message = await runPortfolioAgent(parsed.data);
    return res.json({ message });
  } catch (error) {
    console.error("[chat]", error);
    return res.status(500).json({ error: "Backend failed to respond" });
  }
});

export default router;
