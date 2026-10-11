/**
 * Tool catalog for the portfolio agent (Phase 3).
 * Wire these into Gemini / MCP like your agentic-ai backend.
 */
export const toolDefinitions = [
  {
    name: "search_knowledge",
    description:
      "Search Sagar's resume, LinkedIn, portfolio projects, and FAQ knowledge base.",
    parameters: {
      type: "object",
      properties: {
        question: { type: "string" },
        sources: {
          type: "array",
          items: {
            type: "string",
            enum: ["resume", "linkedin", "portfolio", "general"],
          },
        },
      },
      required: ["question"],
    },
  },
  {
    name: "get_contact_info",
    description: "Return public contact links (email, LinkedIn, GitHub, resume).",
    parameters: { type: "object", properties: {} },
  },
];
