import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm tracking-[0.2em] text-white/50 uppercase">404</p>
      <h1 className="text-3xl font-bold text-white">Page not found</h1>
      <p className="max-w-md text-white/70">
        This route drifted out of orbit. Head back to the portfolio home.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white"
      >
        Back to Home
      </Link>
    </main>
  );
}
