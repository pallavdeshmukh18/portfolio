"use client";

import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import OrbitalMapScene, { ProjectData } from "./OrbitalMapScene";
import TelemetryConsole from "./TelemetryConsole";

export const projectsData: ProjectData[] = [
  {
    id: "01",
    number: "01",
    name: "LATTICE",
    shortName: "LATTICE",
    category: "FULL-STACK / REALTIME",
    type: "Knowledge Infrastructure",
    desc: "Collaborative knowledge infrastructure combining intelligent bookmarking, project spaces, realtime collaboration, and an information lifecycle system.",
    tags: ["FULL-STACK", "REALTIME", "COLLABORATION", "AI"],
    liveUrl: "https://lattice-deployed.vercel.app",
    githubUrl: "https://github.com/pallavdeshmukh18/lattice",
    orbit: "Inner orbit // R-1.0",
    coordinates: "RA 14h 29m / DEC +60°",
    velocity: "7.8 KM/S",
  },
  {
    id: "02",
    number: "02",
    name: "SCOUT",
    shortName: "SCOUT",
    category: "AI / AUTOMATION",
    type: "AI Outreach Engine",
    desc: "AI-powered outreach automation with visual workflows, asynchronous execution, lead intelligence, and verifiable workflow history.",
    tags: ["AI", "AUTOMATION", "WORKFLOW ENGINE", "FILECOIN"],
    liveUrl: null,
    githubUrl: "https://github.com/VeDaNsH-D/Scout",
    orbit: "Inner orbit // R-1.6",
    coordinates: "RA 09h 14m / DEC +12°",
    velocity: "7.1 KM/S",
  },
  {
    id: "03",
    number: "03",
    name: "KRYPTON",
    shortName: "KRYPTON",
    category: "AI SECURITY",
    type: "Multichannel Threat Intel",
    desc: "Multichannel AI threat detection for messages, URLs, email, media, and live screen context with explainable risk assessment.",
    tags: ["AI SECURITY", "THREAT DETECTION", "MULTIMODAL", "REAL-TIME"],
    liveUrl: "https://india-next-rho.vercel.app",
    githubUrl: "https://github.com/pallavdeshmukh18/Krypton-Ai",
    orbit: "Mid orbit // R-2.2",
    coordinates: "RA 21h 08m / DEC -04°",
    velocity: "6.4 KM/S",
  },
  {
    id: "04",
    number: "04",
    name: "LOWKEYLOSS",
    shortName: "LOWKEYLOSS",
    category: "FINTECH / ML",
    type: "Pre-Trade Intelligence",
    desc: "Pre-trade intelligence platform that evaluates risk, impact, and portfolio context before a position is executed.",
    tags: ["FINTECH", "ML", "RISK ENGINE", "FULL-STACK"],
    liveUrl: "https://trade-risk-gate.vercel.app",
    githubUrl: "https://github.com/pallavdeshmukh18/Trade-Risk-Gate",
    orbit: "Mid orbit // R-2.8",
    coordinates: "RA 18h 12m / DEC -15°",
    velocity: "5.8 KM/S",
  },
  {
    id: "05",
    number: "05",
    name: "STRUCTUR.AI",
    shortName: "STRUCTUR.AI",
    category: "DEVTOOLS / SYSTEMS",
    type: "Visual Code Intelligence",
    desc: "Visual code intelligence platform that turns GitHub repositories and runtime telemetry into interactive dependency graphs.",
    tags: ["DEVTOOLS", "AST", "CODE INTELLIGENCE", "OBSERVABILITY"],
    liveUrl: "https://structur-al.vercel.app",
    githubUrl: "https://github.com/pallavdeshmukh18/structurAl",
    orbit: "Mid orbit // R-3.4",
    coordinates: "RA 11h 45m / DEC +42°",
    velocity: "5.2 KM/S",
  },
  {
    id: "06",
    number: "06",
    name: "VOICETRACK",
    shortName: "VOICETRACK",
    category: "VOICE AI / MOBILE",
    type: "Voice Transaction AI",
    desc: "Voice-first transaction intelligence that turns spoken financial activity into structured data, insights, and conversational workflows.",
    tags: ["VOICE AI", "MOBILE", "ML", "FINTECH"],
    liveUrl: "https://voice-track-colo-hacks.vercel.app/",
    githubUrl: "https://github.com/VeDaNsH-D/VoiceTrack",
    orbit: "Outer orbit // R-4.0",
    coordinates: "RA 04h 52m / DEC +19°",
    velocity: "4.5 KM/S",
  },
  {
    id: "07",
    number: "07",
    name: "DRAFT ANGLE",
    shortName: "DRAFT ANGLE",
    category: "ENGINEERING / AI",
    type: "Casting Decision Support",
    desc: "Engineering decision-support tool that recommends draft angles for aluminum pressure die casting using AI-assisted reasoning and deterministic engineering fallbacks.",
    tags: ["ENGINEERING", "AI", "MANUFACTURING", "DECISION SUPPORT"],
    liveUrl: "https://draft-angle.vercel.app/",
    githubUrl: "https://github.com/pallavdeshmukh18/draft-angle",
    orbit: "Defense ring // R-4.6",
    coordinates: "RA 02h 31m / DEC -28°",
    velocity: "3.9 KM/S",
  },
];

const ProjectsSection = forwardRef<HTMLElement, object>(
  function ProjectsSection(_, ref) {
    const [activeProjectId, setActiveProjectId] = useState(projectsData[0].id);

    const activeProject =
      projectsData.find((p) => p.id === activeProjectId) ?? projectsData[0];

    const handleInspectStation = (project: ProjectData) => {
      const url = project.liveUrl || project.githubUrl;
      if (typeof window !== "undefined") {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    };

    return (
      <section
        ref={ref}
        aria-label="Navigating Operational Orbit"
        className="relative z-10 bg-transparent px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 md:pt-24 pb-20 md:pb-28"
      >
        {/* FAINT CONTINUOUS ORBITAL TRAJECTORIES CONNECTOR (Visually extends Hero orbits) */}
        <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 overflow-hidden z-0 opacity-40">
          <svg className="w-full h-full" viewBox="0 0 1200 200" fill="none">
            <path
              d="M950,-50 C800,80 400,160 50,180"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <path
              d="M1100,-20 C900,110 500,180 150,200"
              stroke="rgba(255, 90, 54, 0.18)"
              strokeWidth="1.2"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* EMERGING SECTION HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.38em] text-[#ff5a36]">
                SECTOR 02 // ORBITAL MAP
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-[-0.05em] text-[#f3ece4] leading-[0.92]">
                Navigating Operational Orbit.
              </h2>
            </div>

            <p className="max-w-xl text-sm md:text-base leading-relaxed text-zinc-400 font-normal">
              Each major project lives as an active station in the orbital map. Select any node to inspect telemetry, system architecture, and production links.
            </p>
          </motion.div>

          {/* 65% / 35% ASYMMETRIC ORBITAL GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch min-h-[640px]">
            {/* LEFT ORBITAL MAP (65% area) */}
            <div className="lg:col-span-7 xl:col-span-8 h-full min-h-[580px]">
              <OrbitalMapScene
                projects={projectsData}
                activeProjectId={activeProjectId}
                onSelectProject={setActiveProjectId}
              />
            </div>

            {/* RIGHT TELEMETRY CONSOLE (35% area) */}
            <div className="lg:col-span-5 xl:col-span-4 h-full">
              <TelemetryConsole
                activeProject={activeProject}
                onInspect={handleInspectStation}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default ProjectsSection;
