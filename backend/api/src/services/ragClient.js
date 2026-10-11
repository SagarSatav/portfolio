import { env } from "../config/env.js";

/**
 * HTTP client for the portfolio RAG microservice.
 */
export async function queryRag(question, { topK = 5, sources } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (env.ragServiceToken) {
    headers["X-RAG-Token"] = env.ragServiceToken;
  }

  const response = await fetch(`${env.ragServiceUrl}/rag/query`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      question,
      top_k: topK,
      sources,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`RAG service error ${response.status}: ${text}`);
  }

  return response.json();
}

export async function ragHealth() {
  const response = await fetch(`${env.ragServiceUrl}/health`);
  if (!response.ok) throw new Error("RAG health check failed");
  return response.json();
}
