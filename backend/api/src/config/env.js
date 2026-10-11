import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 3001),
  nodeEnv: process.env.NODE_ENV || "development",
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  geminiModel: process.env.GEMINI_MODEL || "gemini-2.0-flash",
  ragServiceUrl: process.env.RAG_SERVICE_URL || "http://localhost:8000",
  ragServiceToken: process.env.RAG_SERVICE_TOKEN || "",
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "http://localhost:3000")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  backendToken: process.env.BACKEND_TOKEN || "",
};
