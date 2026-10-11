import { assertSafeUserInput } from "../guardrails/inputGuardrail.js";
import { executeTool } from "../tools/toolExecutor.js";

/**
 * Portfolio agent stub.
 * Phase 3: replace with Gemini tool-calling loop (like agentic-ai agentService).
 */
export async function runPortfolioAgent({ messages }) {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const safety = assertSafeUserInput(lastUser?.content);
  if (!safety.ok) {
    return {
      role: "assistant",
      content: safety.reason,
      status: "blocked",
    };
  }

  // Stub path: call RAG tool once (will return stub text until RAG is implemented)
  let ragSnippet = "";
  try {
    const rag = await executeTool("search_knowledge", {
      question: lastUser.content,
    });
    ragSnippet = rag?.answer || "";
  } catch {
    ragSnippet =
      "AI service is offline. Start backend/ai on port 8000.";
  }

  return {
    role: "assistant",
    content: [
      "I'm Sagar's portfolio assistant (agent stub).",
      "Phase 3 will use Gemini + tools over resume / LinkedIn / portfolio knowledge.",
      "",
      `You asked: ${lastUser.content}`,
      "",
      `Knowledge tool says: ${ragSnippet}`,
    ].join("\n"),
    status: "stub",
  };
}
