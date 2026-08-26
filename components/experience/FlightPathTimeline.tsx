"use client";

import { motion } from "framer-motion";

interface FlightPathTimelineProps {
  activeMissionId: string;
  onSelectMission: (id: string) => void;
}

export default function FlightPathTimeline({
  activeMissionId,
  onSelectMission,
}: FlightPathTimelineProps) {
  return (
    <div className="relative flex flex-col items-start space-y-6 font-mono text-xs select-none">
      {/* ORIGIN STATION */}
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-zinc-600" />
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.25em]">ORIGIN</p>
          <p className="text-zinc-300 text-xs tracking-[0.15em] font-sans font-medium">
            ACADEMIC &amp; R&amp;D WORK
          </p>
        </div>
      </div>

      {/* TIMELINE VERTICAL PATH LINE */}
      <div className="ml-[3px] h-8 w-[1px] bg-gradient-to-b from-zinc-600 via-[#ff5a36]/60 to-[#ff5a36]" />

      {/* MISSION 01 NODE (SIX LADDERS / LADDER1 // JUNIPER2) */}
      <button
        type="button"
        onClick={() => onSelectMission("01")}
        className={`group flex items-start gap-3 text-left cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a36] ${
          activeMissionId === "01" ? "opacity-100" : "opacity-70 hover:opacity-100"
        }`}
      >
        <span
          className={`mt-1.5 h-2.5 w-2.5 rounded-full transition-all ${
            activeMissionId === "01"
              ? "bg-[#ff5a36] shadow-[0_0_8px_#ff5a36]"
              : "bg-zinc-500 group-hover:bg-[#ff5a36]"
          }`}
        />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#ff5a36]">
              MISSION 01
            </span>
            <span className="text-[9px] bg-[#ff5a36]/10 text-[#ff5a36] border border-[#ff5a36]/30 px-1.5 py-0.5">
              PRIMARY
            </span>
          </div>
          <p className="text-base font-sans font-black text-[#f3ece4] tracking-tight group-hover:text-white transition-colors mt-0.5">
            SIX LADDERS
          </p>
          <p className="text-[11px] text-zinc-300 font-sans font-medium">
            SOFTWARE ENGINEERING INTERN
          </p>
          <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-[0.2em] mt-0.5">
            LADDER1 // JUNIPER2
          </p>
        </div>
      </button>

      {/* TIMELINE CONTINUATION LINE */}
      <div className="ml-[3px] h-8 w-[1px] bg-gradient-to-b from-[#ff5a36] via-zinc-600 to-zinc-700" />

      {/* CURRENT TRAJECTORY NODE */}
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full border border-[#ff5a36] bg-[#ff5a36]/20 animate-pulse" />
        <div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.25em]">STATUS</p>
          <p className="text-xs text-[#f3ece4] uppercase tracking-[0.2em] flex items-center gap-1.5 font-sans font-medium">
            <span>COMPLETED / INTERNSHIP</span>
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.0 }}
              className="text-[#ff5a36]"
            >
              ●
            </motion.span>
          </p>
        </div>
      </div>
    </div>
  );
}
