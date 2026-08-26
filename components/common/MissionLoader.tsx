"use client";

import anime from "animejs";
import { useEffect, useRef, useState } from "react";

export default function MissionLoader() {
  const [isReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  const [progress, setProgress] = useState(() => (isReducedMotion ? 100 : 0));
  const [activeCheckCount, setActiveCheckCount] = useState(() => (isReducedMotion ? 4 : 0));
  const [isNominal, setIsNominal] = useState(() => isReducedMotion);
  const [isMounted, setIsMounted] = useState(() => !isReducedMotion);

  const loaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressObj = useRef({ val: 0 });

  useEffect(() => {
    if (isReducedMotion) return;

    // Lock body scrolling during boot sequence
    document.body.style.overflow = "hidden";

    // Anime.js Master Timeline
    const timeline = anime.timeline({
      easing: "easeOutExpo",
    });

    timeline
      // STAGE 1 & 2: HUD & Headline Entrance
      .add({
        targets: ".boot-hud",
        opacity: [0, 1],
        duration: 450,
      })
      .add(
        {
          targets: ".boot-title",
          opacity: [0, 1],
          translateY: [16, 0],
          scale: [0.97, 1],
          duration: 650,
        },
        "-=200"
      )
      // STAGE 3 & 4: Progress Readout & System Checklist Activation
      .add({
        targets: progressObj.current,
        val: 100,
        round: 1,
        duration: 1800,
        easing: "easeInOutQuad",
        update: () => {
          const currentVal = Math.min(100, Math.floor(progressObj.current.val));
          setProgress(currentVal);

          setActiveCheckCount((prev) => {
            if (currentVal >= 96 && prev < 4) return 4;
            if (currentVal >= 72 && prev < 3) return 3;
            if (currentVal >= 48 && prev < 2) return 2;
            if (currentVal >= 24 && prev < 1) return 1;
            return prev;
          });
        },
        complete: () => {
          setIsNominal(true);

          // STAGE 5: Cinematic Exit Transition
          anime.timeline({
            easing: "easeInOutQuart",
          })
          .add({
            targets: contentRef.current,
            scale: [1, 0.97],
            opacity: [1, 0],
            duration: 450,
            delay: 350,
          })
          .add(
            {
              targets: loaderRef.current,
              opacity: [1, 0],
              translateY: [0, -12],
              duration: 550,
              complete: () => {
                document.body.style.overflow = "";
                setIsMounted(false);
              },
            },
            "-=250"
          );
        },
      });

    return () => {
      document.body.style.overflow = "";
    };
  }, [isReducedMotion]);

  if (!isMounted) return null;

  const checks = [
    { label: "CORE SYSTEMS", detail: "ONLINE" },
    { label: "ORBITAL NAVIGATION", detail: "ONLINE" },
    { label: "PROJECT DATABASE", detail: "ONLINE" },
    { label: "COMMAND LINK", detail: "ONLINE" },
  ];

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#08080a] p-6 sm:p-12 text-[#f3ece4] font-mono select-none"
    >
      {/* FAINT BACKGROUND ORBITAL ALIGNMENT ARCS */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden z-0">
        <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none">
          <circle
            cx="720"
            cy="450"
            r="380"
            stroke="rgba(255, 90, 54, 0.15)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <circle
            cx="720"
            cy="450"
            r="280"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      {/* TOP HUD METADATA */}
      <div className="relative z-10 flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-zinc-500 boot-hud">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36] animate-pulse" />
          <span>PALLAV DESHMUKH // MISSION CONTROL</span>
        </div>

        <div>
          <span>SYS // BOOT SEQUENCE</span>
        </div>
      </div>

      {/* CENTERED SYSTEM INITIALIZATION DISPLAY */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-xl mx-auto w-full my-auto text-center py-6"
      >
        <div className="hero-identity mb-2">
          <p className="text-xs uppercase tracking-[0.4em] text-[#ff5a36]">
            PALLAV DESHMUKH
          </p>
        </div>

        <h1 className="boot-title text-4xl sm:text-6xl font-black uppercase tracking-[-0.05em] text-[#f3ece4] leading-none">
          Mission Control
        </h1>

        <p className="text-[11px] uppercase tracking-[0.32em] text-zinc-400 mt-3 mb-8">
          System Initialization
        </p>

        {/* SYSTEM CHECKLIST ACTIVATION */}
        <div className="space-y-3.5 border-y border-white/10 py-6 text-xs text-left max-w-md mx-auto">
          {checks.map((check, idx) => {
            const isOnline = idx < activeCheckCount;
            return (
              <div
                key={check.label}
                className="flex items-center justify-between transition-colors duration-300"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all ${
                      isOnline
                        ? "bg-[#ff5a36] shadow-[0_0_6px_#ff5a36]"
                        : "bg-zinc-700 opacity-40"
                    }`}
                  />
                  <span
                    className={`tracking-[0.2em] transition-colors ${
                      isOnline ? "text-[#f3ece4]" : "text-zinc-500"
                    }`}
                  >
                    {check.label}
                  </span>
                </div>

                <span
                  className={`tracking-[0.25em] font-semibold text-xs transition-colors ${
                    isOnline ? "text-[#ff5a36]" : "text-zinc-600"
                  }`}
                >
                  {isOnline ? check.detail : "INITIALIZING..."}
                </span>
              </div>
            );
          })}
        </div>

        {/* SYSTEM SYNCHRONIZATION PROGRESS BAR */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="flex items-center justify-between text-xs mb-2.5 font-mono">
            <span className="text-[10px] text-zinc-400 tracking-[0.25em]">
              SYSTEM SYNCHRONIZATION
            </span>
            <span className="font-semibold text-[#ff5a36] tracking-[0.25em]">
              {isNominal ? "100%" : `${String(progress).padStart(2, "0")}%`}
            </span>
          </div>

          <div className="h-1 w-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-[#ff5a36] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* STATUS CONFIRMATION READOUT */}
          <div className="mt-4 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 flex items-center justify-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                isNominal ? "bg-[#ff5a36] animate-pulse" : "bg-zinc-600"
              }`}
            />
            <span>
              {isNominal ? "ALL SYSTEMS NOMINAL // MISSION CONTROL READY" : "INITIALIZING CORE WORKLOADS"}
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM HUD METADATA */}
      <div className="relative z-10 flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-zinc-500 boot-hud">
        <div>LAT 45.2° N / RA 14h 29m</div>
        <div>SYS ONLINE // 01</div>
      </div>
    </div>
  );
}
