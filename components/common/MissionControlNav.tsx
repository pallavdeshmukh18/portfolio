"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RESUME_URL = "/resume.pdf";

interface MissionControlNavProps {
  onNavigateSection: (sectionId: "projects" | "experience" | "achievements" | "terminal") => void;
}

export default function MissionControlNav({
  onNavigateSection,
}: MissionControlNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<"hero" | "projects" | "experience" | "achievements" | "terminal">("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localTime, setLocalTime] = useState("");

  // Live Local Time Updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setLocalTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Scroll listener for sticky backdrop morph & active section detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section active height bounds
      const scrollPos = window.scrollY + 200;
      const heroBound = window.innerHeight * 0.7;
      const projectsBound = heroBound + 850;
      const experienceBound = projectsBound + 850;
      const achievementsBound = experienceBound + 850;

      if (scrollPos < heroBound) {
        setActiveSection("hero");
      } else if (scrollPos >= heroBound && scrollPos < projectsBound) {
        setActiveSection("projects");
      } else if (scrollPos >= projectsBound && scrollPos < experienceBound) {
        setActiveSection("experience");
      } else if (scrollPos >= experienceBound && scrollPos < achievementsBound) {
        setActiveSection("achievements");
      } else {
        setActiveSection("terminal");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "projects", num: "01", label: "WORK", sectionId: "projects" as const },
    { id: "experience", num: "02", label: "EXPERIENCE", sectionId: "experience" as const },
    { id: "achievements", num: "03", label: "RECORD", sectionId: "achievements" as const },
    { id: "terminal", num: "04", label: "TERMINAL", sectionId: "terminal" as const },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 select-none ${
        isScrolled
          ? "bg-[#08080a]/85 backdrop-blur-md border-b border-white/10 py-4 shadow-xl"
          : "bg-transparent py-6 md:py-8 border-b border-transparent"
      }`}
    >
      {/* SUBTLE HUD BOUNDARY HAIRLINE */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* LEFT BRANDING */}
        <a
          href="#"
          className="group flex items-center gap-3 focus-visible:outline-none cursor-pointer"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36] animate-pulse" />
          <div>
            <span className="font-bold text-sm text-[#f3ece4] group-hover:text-white transition-colors tracking-tight block">
              PALLAV DESHMUKH
            </span>
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.25em] block">
              MISSION CONTROL // 01
            </span>
          </div>
        </a>

        {/* CENTER DESKTOP NAV ITEMS */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs">
          {navItems.map((item) => {
            const isActive =
              (item.id === "projects" && activeSection === "projects") ||
              (item.id === "experience" && activeSection === "experience") ||
              (item.id === "achievements" && activeSection === "achievements") ||
              (item.id === "terminal" && activeSection === "terminal");

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigateSection(item.sectionId)}
                className={`group relative flex items-center gap-2 py-1 transition-all cursor-pointer focus-visible:outline-none ${
                  isActive ? "text-[#f3ece4]" : "text-zinc-400 hover:text-[#f3ece4]"
                }`}
              >
                <span className="text-[10px] text-zinc-500 group-hover:text-[#ff5a36] transition-colors">
                  {item.num}
                </span>

                <span className="tracking-[0.2em] font-medium transition-transform group-hover:-translate-y-0.5">
                  {item.label}
                </span>

                {/* ACTIVE DOT INDICATOR */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="h-1 w-1 rounded-full bg-[#ff5a36]"
                  />
                )}

                {/* HOVER UNDERLINE LINE */}
                <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[#ff5a36] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
              </button>
            );
          })}
        </nav>

        {/* RIGHT ACTION: RESUME & STATUS MODULE */}
        <div className="hidden sm:flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.25em]">
          {/* RECTANGULAR SHARP RESUME ACTION */}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Pallav Deshmukh Resume (opens in a new tab)"
            className="group flex items-center gap-1.5 border border-white/20 hover:border-[#ff5a36] bg-black/40 hover:bg-[#ff5a36]/10 text-zinc-300 hover:text-[#f3ece4] px-3.5 py-1.5 rounded-none transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a36]"
          >
            <span>RESUME</span>
            <span className="text-[#ff5a36] font-bold inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>

          {localTime && (
            <span className="text-zinc-500 border-l border-r border-white/10 px-4">
              LOCAL // {localTime}
            </span>
          )}

          <span className="flex items-center gap-1.5 text-[#ff5a36]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36] animate-pulse" />
            <span>ONLINE</span>
          </span>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#f3ece4] border border-white/15 px-3 py-1.5 cursor-pointer focus-visible:outline-none"
        >
          <span>MENU</span>
          <span className="text-[#ff5a36] font-bold">
            {isMobileMenuOpen ? "✕" : "+"}
          </span>
        </button>
      </div>

      {/* MOBILE FULL-SCREEN MISSION CONTROL MENU DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden border-t border-white/10 bg-[#08080a]/95 backdrop-blur-xl px-6 py-8 space-y-6 font-mono text-sm"
          >
            <div className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] pb-2 border-b border-white/10 flex justify-between">
              <span>NAVIGATION CONTROL</span>
              <span className="text-[#ff5a36]">● ONLINE</span>
            </div>

            <div className="space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigateSection(item.sectionId);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between text-left py-2 text-[#f3ece4] hover:text-[#ff5a36] transition-colors border-b border-white/5"
                >
                  <span className="tracking-[0.25em]">{item.num} {"//"} {item.label}</span>
                  <span className="text-[#ff5a36]">→</span>
                </button>
              ))}
            </div>

            {/* SEPARATED MOBILE RESUME ACTION BUTTON */}
            <div className="pt-3 border-t border-white/10">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Pallav Deshmukh Resume (opens in a new tab)"
                className="w-full flex items-center justify-between border border-[#ff5a36] bg-[#ff5a36]/10 hover:bg-[#ff5a36] hover:text-black text-[#ff5a36] font-mono text-xs uppercase tracking-[0.25em] px-4 py-3 rounded-none transition-all cursor-pointer"
              >
                <span>OPEN RESUME</span>
                <span className="font-bold">↗</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
