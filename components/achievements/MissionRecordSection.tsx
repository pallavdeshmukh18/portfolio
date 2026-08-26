"use client";

import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface AchievementData {
  id: string;
  missionId: string;
  status: string;
  title: string;
  event: string;
  location: string;
  organizer?: string;
  domain?: string;
  isHighlight?: boolean;
  isInternational?: boolean;
}

export const achievementsData: AchievementData[] = [
  {
    id: "01",
    missionId: "MISSION 01",
    status: "RUNNER-UP",
    title: "COHERENCE '26",
    event: "COHERENCE '26",
    location: "VCET // MUMBAI",
    organizer: "MLSC // VCET",
  },
  {
    id: "02",
    missionId: "MISSION 02",
    status: "DOMAIN WINNER",
    title: "SE HACKATHON",
    domain: "WEB DEVELOPMENT",
    event: "SE HACKATHON",
    location: "SPIT // MUMBAI",
    organizer: "CSI SPIT",
    isHighlight: true,
  },
  {
    id: "03",
    missionId: "MISSION 03",
    status: "GRAND FINALIST",
    title: "COLO HACKS",
    event: "COLO HACKS",
    location: "DBIT // MUMBAI",
  },
  {
    id: "04",
    missionId: "MISSION 04",
    status: "GRAND FINALIST",
    title: "INDIANEXT HACKATHON",
    event: "INDIANEXT HACKATHON",
    location: "KES SHROFF // MUMBAI",
  },
  {
    id: "05",
    missionId: "MISSION 05",
    status: "GRAND FINALIST",
    title: "LASERHACKS",
    event: "LASERHACKS",
    location: "LASELL UNIVERSITY // USA",
    isInternational: true,
  },
];

const MissionRecordSection = forwardRef<HTMLElement, object>(
  function MissionRecordSection(_, ref) {
    const [activeId, setActiveId] = useState(achievementsData[1].id);

    const selectedAchievement =
      achievementsData.find((a) => a.id === activeId) ?? achievementsData[1];

    return (
      <section
        ref={ref}
        aria-label="Mission Record"
        className="relative z-10 bg-transparent px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 md:pt-24 pb-12 md:pb-16"
      >
        {/* FAINT ATMOSPHERIC CONTINUATION CONNECTOR FROM SECTION 03 */}
        <div className="pointer-events-none absolute inset-x-0 -top-20 h-44 overflow-hidden z-0 opacity-40">
          <svg className="w-full h-full" viewBox="0 0 1200 200" fill="none">
            <path
              d="M100,0 C400,100 800,150 1100,200"
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
            <span>SECTOR 03 COMPLETE ↓ LINKED TO SECTION 04</span>
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
                SECTION 04 // MISSION RECORD
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-[-0.05em] text-[#f3ece4] leading-[0.92]">
                Signals
                <br />
                Acquired.
              </h2>
            </div>

            <p className="max-w-xl text-sm md:text-base leading-relaxed text-zinc-400 font-normal">
              Competitive builds, hackathon missions, and engineering milestones recorded beyond the standard project log.
            </p>
          </motion.div>

          {/* PRIMARY HACKATHON MISSION TIMELINE (60/40 SPLIT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT TIMELINE NODES LIST (7 Cols) */}
            <div className="lg:col-span-7 border border-white/10 bg-[#08080b]/80 p-6 sm:p-8 backdrop-blur-md rounded-none">
              <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#ff5a36] mb-6">
                HACKATHON MISSIONS // TIMELINE
              </p>

              <div className="space-y-4 font-mono text-xs select-none">
                {achievementsData.map((item) => {
                  const isSelected = item.id === activeId;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveId(item.id)}
                      className={`group relative flex items-start gap-4 p-4 border transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#ff5a36] bg-[#ff5a36]/10 text-white"
                          : "border-white/10 bg-black/40 hover:border-white/20 text-zinc-400"
                      }`}
                    >
                      {/* MISSION NODE PULSE */}
                      <span
                        className={`mt-1.5 h-2 w-2 rounded-full transition-all ${
                          isSelected
                            ? "bg-[#ff5a36] shadow-[0_0_8px_#ff5a36]"
                            : "bg-zinc-600 group-hover:bg-[#ff5a36]"
                        }`}
                      />

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-zinc-500 uppercase tracking-[0.25em]">
                              {item.missionId}
                            </span>
                            {item.isInternational && (
                              <span className="text-[9px] bg-white/10 text-zinc-300 border border-white/20 px-1.5 py-0.5 uppercase tracking-[0.15em]">
                                INTERNATIONAL
                              </span>
                            )}
                            {item.isHighlight && (
                              <span className="text-[9px] bg-[#ff5a36]/20 text-[#ff5a36] border border-[#ff5a36]/40 px-1.5 py-0.5 uppercase tracking-[0.15em] font-semibold">
                                HIGHLIGHT
                              </span>
                            )}
                          </div>

                          <span
                            className={`text-[10px] uppercase tracking-[0.2em] font-semibold ${
                              isSelected ? "text-[#ff5a36]" : "text-zinc-400"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <h3 className="mt-1 text-base font-sans font-bold text-[#f3ece4] tracking-tight group-hover:text-white transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-[11px] text-zinc-400 font-sans mt-0.5">
                          {item.location}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT EXPANDED MISSION TELEMETRY PANEL (5 Cols) */}
            <div className="lg:col-span-5 border border-white/10 bg-[#08080b]/90 p-6 sm:p-8 backdrop-blur-md rounded-none text-left min-h-[380px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedAchievement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="flex flex-col h-full justify-between"
                >
                  <div>
                    {/* PANEL HEADER */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#ff5a36]">
                        {selectedAchievement.missionId} {"//"} DETAILED RECORD
                      </span>
                      {selectedAchievement.isInternational && (
                        <span className="text-[9px] font-mono bg-white/10 text-zinc-300 border border-white/20 px-2 py-0.5 uppercase tracking-[0.2em]">
                          GLOBAL MISSION
                        </span>
                      )}
                    </div>

                    {/* STATUS BADGE & TITLE */}
                    <div className="mt-6">
                      <span className="text-xs font-mono uppercase tracking-[0.28em] font-semibold text-[#ff5a36]">
                        {selectedAchievement.status}
                      </span>
                      <h3 className="mt-2 text-3xl font-black uppercase tracking-[-0.04em] text-[#f3ece4]">
                        {selectedAchievement.title}
                      </h3>
                    </div>

                    {/* FACTUAL METADATA GRID */}
                    <div className="mt-6 space-y-3.5 border-t border-white/10 pt-5 text-xs font-mono">
                      <div className="flex justify-between items-baseline">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-[0.25em]">EVENT</span>
                        <span className="text-zinc-200 font-sans font-medium">{selectedAchievement.event}</span>
                      </div>

                      {selectedAchievement.domain && (
                        <div className="flex justify-between items-baseline">
                          <span className="text-[10px] text-zinc-500 uppercase tracking-[0.25em]">DOMAIN</span>
                          <span className="text-[#ff5a36] font-sans font-bold">{selectedAchievement.domain}</span>
                        </div>
                      )}

                      <div className="flex justify-between items-baseline">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-[0.25em]">LOCATION</span>
                        <span className="text-zinc-300 font-sans">{selectedAchievement.location}</span>
                      </div>

                      {selectedAchievement.organizer && (
                        <div className="flex justify-between items-baseline">
                          <span className="text-[10px] text-zinc-500 uppercase tracking-[0.25em]">ORGANIZER</span>
                          <span className="text-zinc-400 font-sans">{selectedAchievement.organizer}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* PANEL FOOTER STATUS */}
                  <div className="mt-8 border-t border-white/10 pt-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em]">
                    <span className="text-zinc-500">MISSION STATUS</span>
                    <span className="text-[#ff5a36]">VERIFIED RECORD</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* SUBSECTION 02: COMPETITIVE SIGNAL TELEMETRY */}
          <div className="mt-16 border-t border-white/10 pt-12">
            <div className="mb-8 text-left max-w-xl">
              <p className="text-xs font-mono uppercase tracking-[0.38em] text-[#ff5a36]">
                COMPETITIVE SIGNAL
              </p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-black uppercase tracking-[-0.03em] text-[#f3ece4]">
                Algorithmic Milestones
              </h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-normal">
                Consistency outside shipped projects — algorithmic problem solving and competitive programming.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* LEETCODE METRIC CARD */}
              <div className="border border-white/10 bg-[#08080b]/80 p-6 sm:p-8 backdrop-blur-md rounded-none text-left flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
                    <span className="text-zinc-500 uppercase tracking-[0.25em]">PLATFORM</span>
                    <span className="text-[#ff5a36] uppercase tracking-[0.2em]">LEETCODE</span>
                  </div>

                  <div className="mt-6">
                    <p className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-[#f3ece4]">
                      400+
                    </p>
                    <p className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400 mt-2">
                      PROBLEMS SOLVED
                    </p>
                    <p className="text-xs font-mono text-zinc-500 mt-1">
                      HANDLE // @pallav_deshmukh
                    </p>
                  </div>
                </div>

                <a
                  href="https://leetcode.com/u/pallav_deshmukh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Pallav Deshmukh LeetCode profile (opens in a new tab)"
                  className="group w-full flex items-center justify-between border border-white/15 bg-black/40 hover:border-[#ff5a36] hover:text-white px-5 py-3 text-xs font-mono uppercase tracking-[0.22em] text-zinc-300 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a36]"
                >
                  <span>VIEW PROFILE</span>
                  <span className="text-[#ff5a36] font-bold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    ↗
                  </span>
                </a>
              </div>

              {/* CODEFORCES METRIC CARD */}
              <div className="border border-white/10 bg-[#08080b]/80 p-6 sm:p-8 backdrop-blur-md rounded-none text-left flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
                    <span className="text-zinc-500 uppercase tracking-[0.25em]">PLATFORM</span>
                    <span className="text-[#ff5a36] uppercase tracking-[0.2em]">CODEFORCES</span>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-baseline gap-4">
                      <p className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-[#f3ece4]">
                        1030
                      </p>
                      <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">
                        RATING
                      </span>
                    </div>
                    <p className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400 mt-2">
                      100+ PROBLEMS SOLVED
                    </p>
                    <p className="text-xs font-mono text-zinc-500 mt-1">
                      HANDLE // pallavdeshmukh
                    </p>
                  </div>
                </div>

                <a
                  href="https://codeforces.com/profile/pallavdeshmukh"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Pallav Deshmukh Codeforces profile (opens in a new tab)"
                  className="group w-full flex items-center justify-between border border-white/15 bg-black/40 hover:border-[#ff5a36] hover:text-white px-5 py-3 text-xs font-mono uppercase tracking-[0.22em] text-zinc-300 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a36]"
                >
                  <span>VIEW PROFILE</span>
                  <span className="text-[#ff5a36] font-bold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* SECTION TRANSITION BAND: MISSION RECORD -> COMMAND DECK */}
          <div className="mt-14 pt-8 relative border-t border-white/10 select-none">
            {/* ANIME.JS / MOTION SIGNAL DOT TRAVELING ACROSS DIVIDER */}
            <div className="absolute -top-[3px] left-0 right-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{ x: ["-10%", "110%"] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="h-[5px] w-12 bg-gradient-to-r from-transparent via-[#ff5a36] to-transparent rounded-full opacity-85"
              />
            </div>

            {/* HUD HANDOFF LABELS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36] animate-pulse" />
                <span>MISSION RECORD COMPLETE // ALL SIGNALS VERIFIED</span>
              </div>

              <div className="flex items-center gap-4 text-[9px] text-zinc-600">
                <span>CHANNEL // OPEN</span>
                <span className="text-zinc-400">NEXT SYSTEM // COMMAND DECK [05]</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default MissionRecordSection;
