import { queryRag } from "../services/ragClient.js";

const PUBLIC_CONTACT = {
  email: "satavsagar17@gmail.com",
  linkedin: "https://www.linkedin.com/in/sagarsatav",
  github: "https://github.com/sagarsatav",
  resume: "/resume/sagar-satav-resume.pdf",
};

export async function executeTool(name, args = {}) {
  switch (name) {
    case "search_knowledge": {
      const result = await queryRag(args.question, {
        sources: args.sources,
      });
      return result;
    }
    case "get_contact_info":
      return PUBLIC_CONTACT;
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
