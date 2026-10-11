export const projects = [
  {
    id: "apix",
    slug: "apix",
    title: "APIx",
    subtitle: "Enterprise API Security Platform",
    summary:
      "Web application for API discovery, threat analysis, and remediation — with role-based access and real-time security insights.",
    contributions: [
      "Built frontend workflows for application, flow, and run modules.",
      "Managed complex state with Redux Toolkit and REST APIs for live attack data.",
      "Integrated Keycloak for auth, sessions, token refresh, and RBAC roles.",
      "Built Sense and Smash screens for CWE/OWASP mapping and traffic analysis.",
      "Containerized frontend and backend services with Docker as the APIx stack.",
    ],
    stack: [
      "React.js",
      "TypeScript",
      "Redux Toolkit",
      "Keycloak",
      "REST APIs",
      "Docker",
    ],
    image: "/images/projects/apix.webp",
    featured: true,
    period: "Sept 2023 – Present",
    links: [],
  },
  {
    id: "apix-extension",
    slug: "apix-browser-extension",
    title: "APIx Browser Extension",
    subtitle: "Chrome & Firefox traffic capture",
    summary:
      "Cross-browser extension that captures live API traffic and syncs it to the APIx platform.",
    contributions: [
      "Designed and built Chrome & Firefox extension for live API capture.",
      "Exported requests/responses as JSON, CSV, and cURL.",
      "Optimized capture workflows and local/SaaS storage paths.",
      "Automated page interaction with Python Selenium, including headless Docker runs.",
    ],
    stack: [
      "JavaScript",
      "Browser Extensions",
      "Python",
      "Selenium",
      "Docker",
    ],
    image: "/images/projects/browser-extension.webp",
    featured: true,
    period: "Sept 2023 – Present",
    links: [],
  },
  {
    id: "release-iq",
    slug: "release-iq",
    title: "Release IQ",
    subtitle: "Release tracking & analytics platform",
    summary:
      "Centralized platform for test cases, reports, automation tracking, and release analytics.",
    contributions: [
      "Built a scalable Next.js + TypeScript frontend with SSR and hydration.",
      "Delivered responsive layouts with Tailwind CSS and Material UI.",
      "Integrated Jira workflows and backend services for release tracking.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Material UI", "Jira"],
    image: "/images/projects/release-iq.webp",
    featured: true,
    period: "Nov 2025 – Feb 2026",
    links: [],
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
