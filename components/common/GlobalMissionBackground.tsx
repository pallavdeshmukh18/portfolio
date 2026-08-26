"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GlobalMissionBackground() {
  const [isReducedMotion, setIsReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#08080a] select-none">
      {/* LAYER 1 & 2: BASE ATMOSPHERIC RADIAL LIGHTING & DEEP VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,rgba(255,90,54,0.07),transparent_55%),radial-gradient(ellipse_at_25%_50%,rgba(147,197,253,0.03),transparent_65%),radial-gradient(ellipse_at_75%_85%,rgba(255,90,54,0.05),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(4,4,6,0.85)_100%)]" />

      {/* LAYER 3: CONTINUOUS ORBITAL & COORDINATE GEOMETRY (Spans full page depth) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        preserveAspectRatio="none"
        viewBox="0 0 1440 3800"
        fill="none"
      >
        {/* Primary Orange Trajectory Arc */}
        <motion.path
          d="M 1300,100 C 1000,600 150,1100 300,1800 C 450,2400 1150,2900 680,3800"
          stroke="rgba(255, 90, 54, 0.18)"
          strokeWidth="1.2"
          strokeDasharray="6 6"
          animate={isReducedMotion ? {} : { strokeDashoffset: [0, -24] }}
          transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
        />

        {/* Secondary Hairline Orbital Arc */}
        <path
          d="M 120,180 C 450,800 1350,1300 1100,2100 C 880,2700 250,3000 120,3800"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="1"
        />

        {/* Diagonal Hairline System Vector Lines */}
        <path
          d="M -100,600 L 1540,1400 M -100,1800 L 1540,2600"
          stroke="rgba(255, 255, 255, 0.025)"
          strokeWidth="0.8"
        />
      </svg>

      {/* LAYER 4: SPARSE TECHNICAL TELEMETRY COORDINATE MARKS */}
      <div className="absolute inset-0 opacity-20 font-mono text-[9px] text-zinc-500 uppercase tracking-[0.3em] flex flex-col justify-between p-12">
        <div className="flex justify-between">
          <span>SYS // MISSION CONTROL</span>
          <span>RA 14h 29m / DEC +60°</span>
        </div>
        <div className="flex justify-between">
          <span>ORBITAL SECTOR 02</span>
          <span>COORD 45.2° N / 12.8° E</span>
        </div>
        <div className="flex justify-between">
          <span>PAST MISSIONS // LOGS</span>
          <span>STATION // SIX LADDERS</span>
        </div>
        <div className="flex justify-between">
          <span>COMMAND DECK // ZSH</span>
          <span>CHANNEL ONLINE</span>
        </div>
      </div>
    </div>
  );
}
