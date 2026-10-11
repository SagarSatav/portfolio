import { profile } from "@/data/profile";

/** GitHub / LinkedIn / Email icon row */
export function SocialLinks() {
  return (
    <ul className="flex items-center gap-3" aria-label="Social links">
      {profile.socials.map((social) => (
        <li key={social.id}>
          <a
            href={social.href}
            target={social.id === "email" ? undefined : "_blank"}
            rel={social.id === "email" ? undefined : "noopener noreferrer"}
            aria-label={social.label}
          >
            {social.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
