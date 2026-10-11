import { cn } from "@/lib/utils";

export function GlassCard({ children, className, tone = "dark" }) {
  return (
    <div
      className={cn(
        "rounded-2xl border backdrop-blur-md",
        tone === "dark"
          ? "border-white/10 bg-white/5 text-white"
          : "border-slate-200/80 bg-white/70 text-slate-900 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
