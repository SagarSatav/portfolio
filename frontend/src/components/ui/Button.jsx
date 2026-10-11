import { cn } from "@/lib/utils";

/**
 * Shared CTA button.
 * primary = cyan→violet gradient; ghost/outline = glass borders.
 */
export function Button({
  variant = "primary",
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition",
        variant === "primary" &&
          "bg-gradient-to-r from-cyan-400 to-violet-500 text-white",
        variant === "ghost" && "bg-transparent text-white",
        variant === "outline" &&
          "border border-white/30 bg-white/5 text-white backdrop-blur",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
