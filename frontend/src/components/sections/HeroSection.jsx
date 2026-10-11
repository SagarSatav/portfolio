import { profile } from "@/data/profile";
export function HeroSection() {
  return (
    <section
      id="home"
      aria-label="Hero"
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <p className="text-sm tracking-[0.25em] text-cyan-300/80 uppercase">
        Portfolio
      </p>
      <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
        Welcome, {profile.shortName}
      </h1>
      <p className="mt-3 text-lg text-white/70">{profile.title}</p>
    </section>
  );
}
