import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
  ContactSection,
} from "@/components/sections";

/**
 * Single-page portfolio composition.
 * Section UI is stubbed — implement in coding phases (see docs/ROADMAP.md).
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
      {/* Phase 3: <ChatbotWidget /> */}
    </>
  );
}
