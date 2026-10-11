/**
 * Syncs frontend/src/data/* into knowledge/portfolio/*.md for AI ingest.
 * Usage (from repo root): npm run knowledge:export
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "knowledge", "portfolio");
const dataDir = "frontend/src/data";

async function loadModule(relPath) {
  const full = path.join(root, relPath);
  return import(pathToFileURL(full).href);
}

function write(name, body) {
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, name), body.trim() + "\n", "utf8");
  console.log(`wrote knowledge/portfolio/${name}`);
}

const { profile, navItems } = await loadModule(`${dataDir}/profile.js`);
const { skillCategories, orbitSkillLabels } = await loadModule(
  `${dataDir}/skills.js`,
);
const { projects } = await loadModule(`${dataDir}/projects.js`);
const { experience, certifications, education } = await loadModule(
  `${dataDir}/experience.js`,
);

write(
  "profile.md",
  `
# Profile — ${profile.name}

- Title: ${profile.title}
- Tagline: ${profile.tagline}
- Location: ${profile.location}
- Email: ${profile.email}
- Phone: ${profile.phone}
- Headline: ${profile.headline} ${profile.headlineAccent}

## Summary
${profile.summary}

## About
${profile.about}

## Highlights
${profile.highlights.map((h) => `- **${h.label}**: ${h.description}`).join("\n")}

## Strengths
${profile.strengths.map((s) => `- **${s.title}**: ${s.description}`).join("\n")}

## Socials
${profile.socials.map((s) => `- ${s.label}: ${s.href}`).join("\n")}

## Nav sections
${navItems.map((n) => `- ${n.label}`).join("\n")}
`,
);

write(
  "skills.md",
  `
# Skills

${skillCategories
  .map((c) => `## ${c.title}\n${c.skills.map((s) => `- ${s}`).join("\n")}`)
  .join("\n\n")}

## Orbit labels
${orbitSkillLabels.map((s) => `- ${s}`).join("\n")}
`,
);

write(
  "projects.md",
  `
# Projects

${projects
  .map(
    (p) => `## ${p.title} (${p.slug})
- Subtitle: ${p.subtitle}
- Period: ${p.period ?? "n/a"}
- Featured: ${p.featured}

### Summary
${p.summary}

### Contributions
${p.contributions.map((c) => `- ${c}`).join("\n")}

### Stack
${p.stack.map((s) => `- ${s}`).join("\n")}
`,
  )
  .join("\n")}
`,
);

write(
  "experience.md",
  `
# Experience

${experience
  .map(
    (job) => `## ${job.role} — ${job.company}
- Location: ${job.location}
- Dates: ${job.startDate} – ${job.endDate}
- Summary: ${job.summary ?? ""}

### Responsibilities
${job.bullets.map((b) => `- ${b}`).join("\n")}

${(job.projects ?? [])
  .map(
    (p) => `### Project: ${p.name}${p.period ? ` (${p.period})` : ""}
${p.bullets.map((b) => `- ${b}`).join("\n")}`,
  )
  .join("\n\n")}
`,
  )
  .join("\n")}

# Certifications
${certifications
  .map(
    (c) =>
      `- **${c.name}** — ${c.issuer}${c.score ? ` (Score: ${c.score})` : ""}${c.url ? `\n  ${c.url}` : ""}`,
  )
  .join("\n")}

# Education
${education
  .map(
    (e) =>
      `- **${e.degree}** — ${e.institution}, ${e.location} (${e.startDate} – ${e.endDate})${e.detail ? `\n  ${e.detail}` : ""}`,
  )
  .join("\n")}
`,
);

console.log("Knowledge export complete.");
