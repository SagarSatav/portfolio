import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  tone = "dark",
}) {
  return (
    <header className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-medium tracking-[0.2em] uppercase",
            tone === "dark" ? "text-white/50" : "text-slate-500",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl",
          tone === "dark" ? "text-white" : "text-slate-900",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            tone === "dark" ? "text-white/70" : "text-slate-600",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
