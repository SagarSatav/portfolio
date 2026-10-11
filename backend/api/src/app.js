import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import chatRoutes from "./routes/chatRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.allowedOrigins,
      methods: ["GET", "POST", "OPTIONS"],
    }),
  );
  app.use(express.json({ limit: "100kb" }));

  app.get("/", (_req, res) => {
    res.json({
      service: "portfolio-backend",
      health: "/health",
      chat: "POST /chat",
    });
  });

  app.use("/health", healthRoutes);
  app.use("/chat", chatRoutes);

  return app;
}
