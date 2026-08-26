"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ExperienceData {
  id: string;
  missionId: string;
  organization: string;
  role: string;
  project: string;
  internalRef?: string;
  period: string;
  status: string;
  deployment: string;
  description: string;
  tags: string[];
  details: {
    system: string;
    contribution: string;
    infrastructure: string;
    deployment: string;
  };
}

interface MissionRecordCardProps {
  experience: ExperienceData;
  isActive?: boolean;
}

export default function MissionRecordCard({
  experience,
}: MissionRecordCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="relative border border-white/10 bg-[#08080b]/90 text-left p-6 sm:p-8 backdrop-blur-md rounded-none transition-all"
    >
      {/* HEADER TOP LOG BAR */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36] animate-pulse" />
          <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#ff5a36]">
            {experience.missionId}
          </p>
        </div>

        <div className="flex items-center gap-2 border border-[#ff5a36]/40 bg-[#ff5a36]/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-[#ff5a36]">
          <span className="h-1 w-1 rounded-full bg-[#ff5a36]" />
          <span>• {experience.status}</span>
        </div>
      </div>

      {/* ORGANIZATION & ROLE HEADLINE */}
      <div className="mt-5">
        <p className="text-xs font-mono uppercase tracking-[0.28em] font-semibold text-[#ff5a36]">
          {experience.organization}
        </p>
        <h3 className="mt-1 text-2xl sm:text-3xl font-black uppercase tracking-[-0.03em] text-[#f3ece4]">
          {experience.role}
        </h3>
      </div>

      {/* METADATA TECHNICAL GRID */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-y border-white/10 py-4 text-xs font-mono">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            PLATFORM
          </p>
          <p className="mt-1 text-sm text-[#f3ece4] font-bold font-sans">
            {experience.project}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            REPOSITORY
          </p>
          <p className="mt-1 text-xs text-zinc-300 font-mono font-medium">
            {experience.internalRef || "JUNIPER2"}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            PERIOD
          </p>
          <p className="mt-1 text-xs text-zinc-300 font-sans font-medium">
            {experience.period}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            DEPLOYMENT
          </p>
          <p className="mt-1 text-xs text-[#ff5a36] font-sans font-medium">
            {experience.deployment}
          </p>
        </div>
      </div>

      {/* PRIMARY CONCISE SUMMARY */}
      <p className="mt-6 text-sm leading-relaxed text-zinc-300 font-normal">
        {experience.description}
      </p>

      {/* TECHNICAL TAG CHIPS */}
      <div className="mt-6 flex flex-wrap gap-2">
        {experience.tags.map((tag) => (
          <span
            key={tag}
            className="border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* EXPANDABLE DETAILED INSPECTION FEED */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-6 space-y-5 border-t border-white/10 pt-6 text-xs font-mono">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#ff5a36]">
                  01 // RESUME ATS
                </p>
                <p className="mt-1 text-xs text-zinc-300 font-sans leading-relaxed">
                  {experience.details.system}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#ff5a36]">
                  02 // SCHEDULED AUTOMATION
                </p>
                <p className="mt-1 text-xs text-zinc-300 font-sans leading-relaxed">
                  {experience.details.contribution}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#ff5a36]">
                  03 // CLOUD INFRASTRUCTURE
                </p>
                <p className="mt-1 text-xs text-zinc-300 font-sans leading-relaxed">
                  {experience.details.infrastructure}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#ff5a36]">
                  04 // CI/CD &amp; DEPLOYMENT
                </p>
                <p className="mt-1 text-xs text-zinc-300 font-sans leading-relaxed">
                  {experience.details.deployment}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INSPECT TOGGLE BUTTON */}
      <div className="mt-6 border-t border-white/10 pt-4">
        <motion.button
          whileHover={{ translateY: -1 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="group w-full flex items-center justify-between border border-white/15 bg-black/60 hover:border-[#ff5a36] hover:text-white px-5 py-3 text-xs font-mono uppercase tracking-[0.22em] text-zinc-300 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a36]"
        >
          <span>{isExpanded ? "COLLAPSE TELEMETRY" : "INSPECT MISSION"}</span>
          <span className="text-[#ff5a36] font-bold group-hover:translate-x-1 transition-transform">
            {isExpanded ? "↑" : "→"}
          </span>
        </motion.button>
      </div>
    </div>
  );
}
