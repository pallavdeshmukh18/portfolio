"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProjectData } from "./OrbitalMapScene";

interface TelemetryConsoleProps {
  activeProject: ProjectData;
  onInspect?: (project: ProjectData) => void;
}

export default function TelemetryConsole({
  activeProject,
  onInspect,
}: TelemetryConsoleProps) {
  const primaryUrl = activeProject.liveUrl || activeProject.githubUrl;
  const hasBothUrls = Boolean(activeProject.liveUrl && activeProject.githubUrl);

  return (
    <aside className="flex h-full flex-col justify-between border border-white/10 bg-[#0a0a0e]/95 p-6 sm:p-8 backdrop-blur-md rounded-none relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="flex h-full flex-col justify-between"
        >
          {/* HEADER STATUS BAR */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36] animate-pulse" />
                  <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#ff5a36]">
                    STATION {activeProject.id} {"//"} {activeProject.category}
                  </p>
                </div>
                <h3 className="mt-3 text-3xl sm:text-4xl font-black uppercase tracking-[-0.04em] text-[#f3ece4] leading-tight">
                  {activeProject.name}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 border border-[#ff5a36]/40 bg-[#ff5a36]/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-[#ff5a36]">
                <span className="h-1 w-1 rounded-full bg-[#ff5a36] animate-pulse" />
                <span>ACTIVE</span>
              </div>
            </div>

            {/* METADATA TECHNICAL GRID */}
            <div className="mt-6 grid grid-cols-2 gap-4 border-y border-white/10 py-5 text-xs font-mono">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                  MODULE TYPE
                </p>
                <p className="mt-1 text-xs font-sans font-medium text-[#f3ece4]">
                  {activeProject.type}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                  ORBITAL BAND
                </p>
                <p className="mt-1 text-xs font-sans font-medium text-[#f3ece4]">
                  {activeProject.orbit}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                  COORDINATES
                </p>
                <p className="mt-1 text-xs text-zinc-300">
                  {activeProject.coordinates}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                  ORBITAL VELOCITY
                </p>
                <p className="mt-1 text-xs text-zinc-300">
                  {activeProject.velocity}
                </p>
              </div>
            </div>

            {/* DESCRIPTION SUMMARY */}
            <p className="mt-6 text-sm leading-relaxed text-zinc-300 font-normal">
              {activeProject.desc}
            </p>

            {/* TECHNICAL TAG CHIPS */}
            <div className="mt-6 flex flex-wrap gap-2">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* FOOTER MISSION CONTROLS */}
          <div className="mt-8 space-y-3.5 pt-5 border-t border-white/10">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.28em]">
              <span className="text-zinc-500">TRAJECTORY</span>
              <span className="text-[#ff5a36]">ACTIVE // SHIPPING</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.28em]">
              <span className="text-zinc-500">SYSTEM STATUS</span>
              <span className="text-[#f3ece4]">MISSION-CRITICAL BUILD</span>
            </div>

            {/* COMMAND CTA BUTTONS */}
            <div className="mt-4 space-y-2">
              <motion.a
                whileHover={{ translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                href={primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (onInspect) {
                    e.preventDefault();
                    onInspect(activeProject);
                  }
                }}
                className="group w-full flex items-center justify-center gap-2 border border-[#ff5a36] bg-[#ff5a36] hover:bg-[#ff7a59] text-black font-semibold text-xs sm:text-sm uppercase tracking-[0.25em] px-6 py-3.5 rounded-none transition-all cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a36]"
              >
                <span>{activeProject.liveUrl ? "VIEW PROJECT" : "VIEW ON GITHUB"}</span>
                <span className="font-bold inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </motion.a>

              {hasBothUrls && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 border border-white/15 bg-black/60 hover:border-white/40 hover:text-white text-zinc-400 font-mono text-[10px] uppercase tracking-[0.22em] px-4 py-2.5 rounded-none transition-all"
                >
                  <span>SOURCE CODE [GITHUB]</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}
