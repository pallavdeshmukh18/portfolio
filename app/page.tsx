"use client";

import { useEffect, useRef } from "react";
import MissionLoader from "@/components/common/MissionLoader";
import MissionControlNav from "@/components/common/MissionControlNav";
import GlobalMissionBackground from "@/components/common/GlobalMissionBackground";
import Hero from "@/components/hero/Hero";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import MissionRecordSection from "@/components/achievements/MissionRecordSection";
import TerminalSection from "@/components/terminal/TerminalSection";
import MissionControlFooter from "@/components/footer/MissionControlFooter";

export default function Home() {
  const projectsRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
  const achievementsRef = useRef<HTMLElement | null>(null);
  const terminalRef = useRef<HTMLElement | null>(null);

  // Global scroll restoration reset to top on page load/refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const handleNavigateSection = (sectionId: "projects" | "experience" | "achievements" | "terminal") => {
    if (sectionId === "projects") {
      projectsRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "experience") {
      experienceRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "achievements") {
      achievementsRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "terminal") {
      terminalRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative overflow-hidden bg-transparent text-white selection:bg-[#ff5a36] selection:text-black">
      {/* INITIAL MISSION CONTROL BOOT LOADER */}
      <MissionLoader />

      {/* MISSION CONTROL TOP NAVIGATION BAR */}
      <MissionControlNav onNavigateSection={handleNavigateSection} />

      {/* SINGLE PERSISTENT GLOBAL MISSION BACKGROUND */}
      <GlobalMissionBackground />

      {/* 01 // HERO / MISSION CONTROL */}
      <Hero onNavigateToProjects={() => handleNavigateSection("projects")} />

      {/* 02 // ORBITAL MAP / PROJECTS SECTION */}
      <ProjectsSection ref={projectsRef} />

      {/* 03 // PAST MISSIONS / EXPERIENCE SECTION */}
      <ExperienceSection ref={experienceRef} />

      {/* 04 // MISSION RECORD / HACKATHONS & ACHIEVEMENTS SECTION */}
      <MissionRecordSection ref={achievementsRef} />

      {/* 05 // COMMAND DECK / INTERACTIVE TERMINAL SECTION */}
      <TerminalSection ref={terminalRef} />

      {/* 06 // TRANSMISSION END / FINAL MISSION CONTROL FOOTER */}
      <MissionControlFooter />
    </main>
  );
}