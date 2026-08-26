"use client";

import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import MissionRecordCard, { ExperienceData } from "./MissionRecordCard";
import FlightPathTimeline from "./FlightPathTimeline";

export const experiencesData: ExperienceData[] = [
  {
    id: "01",
    missionId: "MISSION 01 // SIX LADDERS",
    organization: "SIX LADDERS",
    role: "SOFTWARE ENGINEERING INTERN",
    project: "LADDER1",
    internalRef: "JUNIPER2",
    period: "INTERNSHIP",
    status: "COMPLETED",
    deployment: "PRODUCTION",
    description:
      "Contributed to Ladder1, a production-oriented platform involving Resume ATS workflows, automated processing, scheduled workloads, cloud infrastructure, and deployment workflows.",
    tags: ["GCP", "RESUME ATS", "AUTOMATION", "SCHEDULED JOBS", "GITHUB", "CI/CD"],
    details: {
      system:
        "Worked on the Resume ATS workflow, contributing to resume processing and evaluation against job requirements and improving the flow of candidate information through the platform.",
      contribution:
        "Worked with scheduled background jobs supporting automated platform workflows, including investigating execution behavior and testing scheduled workloads.",
      infrastructure:
        "Worked with the project's GCP infrastructure and cloud services supporting application workloads and scheduled background processes.",
      deployment:
        "Worked within the existing GitHub-based CI/CD workflow for building, testing, and deploying changes to the production environment.",
    },
  },
];

const ExperienceSection = forwardRef<HTMLElement, object>(
  function ExperienceSection(_, ref) {
    const [activeMissionId, setActiveMissionId] = useState(experiencesData[0].id);

    const activeExperience =
      experiencesData.find((e) => e.id === activeMissionId) ?? experiencesData[0];

    return (
      <section
        ref={ref}
        aria-label="Past Missions"
        className="relative z-10 bg-transparent px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 md:pt-24 pb-20 md:pb-28"
      >
        {/* FAINT ATMOSPHERIC CONTINUATION CONNECTOR FROM SECTION 02 */}
        <div className="pointer-events-none absolute inset-x-0 -top-20 h-44 overflow-hidden z-0 opacity-40">
          <svg className="w-full h-full" viewBox="0 0 1200 200" fill="none">
            <path
              d="M100,0 C300,100 700,150 1100,200"
              stroke="rgba(255, 90, 54, 0.16)"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* SECTION TRANSITION HANDOFF TELEMETRY */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 pb-8 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-500 select-none"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36] animate-pulse" />
            <span>ORBITAL SECTOR 02 ↓ TRAJECTORY LINKED // SECTOR 03</span>
          </motion.div>

          {/* SECTION HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.38em] text-[#ff5a36]">
                SECTOR 03 // PAST MISSIONS
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-[-0.05em] text-[#f3ece4] leading-[0.92]">
                Missions
                <br />
                Completed.
              </h2>
            </div>

            <p className="max-w-xl text-sm md:text-base leading-relaxed text-zinc-400 font-normal">
              Engineering work shipped beyond academic projects — contributing to Ladder1 at Six Ladders across Resume ATS workflows, automation, cloud infrastructure, and deployment workflows.
            </p>
          </motion.div>

          {/* FLIGHT PATH TIMELINE + MISSION RECORD CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT FLIGHT PATH TIMELINE (4 Cols) */}
            <div className="lg:col-span-4 border border-white/10 bg-[#08080b]/80 p-6 sm:p-8 backdrop-blur-md rounded-none">
              <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#ff5a36] mb-6">
                FLIGHT PATH // LOGS
              </p>
              <FlightPathTimeline
                activeMissionId={activeMissionId}
                onSelectMission={setActiveMissionId}
              />
            </div>

            {/* RIGHT PRIMARY MISSION RECORD (8 Cols) */}
            <div className="lg:col-span-8">
              <MissionRecordCard
                experience={activeExperience}
                isActive={true}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default ExperienceSection;
