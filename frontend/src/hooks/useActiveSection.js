"use client";

import { useEffect, useState } from "react";
import { SECTION_IDS } from "@/lib/constants";

/**
 * Tracks which page section is in view for navbar active state.
 * Implementation comes with Hero/Navbar coding phase.
 */
export function useActiveSection(defaultSection = "home") {
  const [activeSection, setActiveSection] = useState(defaultSection);

  useEffect(() => {
    // TODO: IntersectionObserver across SECTION_IDS
    void SECTION_IDS;
  }, []);

  return { activeSection, setActiveSection };
}
