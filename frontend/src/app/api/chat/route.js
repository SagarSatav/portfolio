import { NextResponse } from "next/server";

/**
 * BFF for the portfolio chatbot.
 * Browser → frontend /api/chat → backend/api (Node) → backend/ai (Python)
 *
 * Secrets (BACKEND_TOKEN, GEMINI_API_KEY) stay server-side only.
 */
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";
const BACKEND_TOKEN = process.env.BACKEND_TOKEN || "";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body?.messages?.length) {
    return NextResponse.json(
      { error: "messages are required" },
      { status: 400 },
    );
  }

  try {
    const headers = { "Content-Type": "application/json" };
    if (BACKEND_TOKEN) headers["X-Backend-Token"] = BACKEND_TOKEN;

    const upstream = await fetch(`${BACKEND_URL}/chat`, {
      method: "POST",
      headers,
      body: JSON.stringify({ messages: body.messages }),
      cache: "no-store",
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      return NextResponse.json(
        {
          error: data.error || "Backend error",
          detail: data.details || data,
        },
        { status: upstream.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Backend unreachable",
        detail:
          error instanceof Error
            ? error.message
            : "Start backend/api on port 3001",
      },
      { status: 503 },
    );
  }
}
