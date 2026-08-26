"use client";

import anime from "animejs";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import HeroScene from "./HeroScene";

interface HeroProps {
  onNavigateToProjects: () => void;
}

export default function Hero({ onNavigateToProjects }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const typographyRef = useRef<HTMLDivElement>(null);
  const bgDepthRef = useRef<HTMLDivElement>(null);
  const bgAtmosphereRef = useRef<HTMLDivElement>(null);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  // 1. Initial Restrained Entrance Animation Sequence with Anime.js
  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    const timeline = anime.timeline({
      easing: "easeOutExpo",
    });

    timeline
      .add({
        targets: ".hero-nav",
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 600,
      })
      .add(
        {
          targets: ".hero-identity",
          opacity: [0, 1],
          translateY: [12, 0],
          duration: 600,
        },
        "-=350"
      )
      .add(
        {
          targets: ".hero-headline",
          opacity: [0, 0.95],
          scale: [0.98, 1],
          duration: 850,
        },
        "-=450"
      )
      .add(
        {
          targets: ".hero-copy",
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 550,
        },
        "-=450"
      )
      .add(
        {
          targets: ".hero-cta",
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 500,
          delay: anime.stagger(90),
        },
        "-=400"
      );
  }, []);

  // 2. Coordinated Layered Deep-Space Parallax System via Anime.js
  useEffect(() => {
    const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    const isReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || isReducedMotion || !containerRef.current) return;

    const handlePointerMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth) * 2 - 1;
      const normY = (e.clientY / innerHeight) * 2 - 1;

      if (bgDepthRef.current) {
        anime({
          targets: bgDepthRef.current,
          translateX: -normX * 3.0,
          translateY: -normY * 3.0,
          duration: 550,
          easing: "easeOutQuad",
        });
      }

      if (bgAtmosphereRef.current) {
        anime({
          targets: bgAtmosphereRef.current,
          translateX: normX * 7.5,
          translateY: normY * 7.5,
          duration: 480,
          easing: "easeOutQuad",
        });
      }

      if (typographyRef.current) {
        anime({
          targets: typographyRef.current,
          translateX: -normX * 1.5,
          translateY: -normY * 1.5,
          duration: 480,
          easing: "easeOutQuad",
        });
      }
    };

    const handlePointerLeave = () => {
      if (bgDepthRef.current) {
        anime({
          targets: bgDepthRef.current,
          translateX: 0,
          translateY: 0,
          duration: 950,
          easing: "easeOutQuad",
        });
      }
      if (bgAtmosphereRef.current) {
        anime({
          targets: bgAtmosphereRef.current,
          translateX: 0,
          translateY: 0,
          duration: 950,
          easing: "easeOutQuad",
        });
      }
      if (typographyRef.current) {
        anime({
          targets: typographyRef.current,
          translateX: 0,
          translateY: 0,
          duration: 950,
          easing: "easeOutQuad",
        });
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  // 3. Smooth Scroll Fade Handler for Bottom Scroll Indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const opacity = Math.max(0, 1 - scrollY / 220);
      setScrollOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Hero Section"
      className="relative min-h-screen overflow-hidden bg-transparent text-white flex flex-col justify-between"
    >
      {/* 3D Studio Canvas with 750 Stars, 4 Planets, 5 Overlapping Orbital Rings & Grounded Astronaut */}
      <HeroScene />

      {/* Layer 1: Barely Perceptible Deep-Space Depth Background */}
      <div
        ref={bgDepthRef}
        className="hero-bg-depth pointer-events-none absolute inset-0 z-0"
      />

      {/* Layer 3: Diagonal Cosmic Dust Cloud Trail */}
      <div
        ref={bgAtmosphereRef}
        className="hero-bg-atmosphere pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_48%_50%,rgba(255,255,255,0.075),transparent_55%),radial-gradient(ellipse_at_80%_42%,rgba(255,90,54,0.065),transparent_60%),radial-gradient(ellipse_at_25%_65%,rgba(147,197,253,0.025),transparent_65%)]"
      />

      {/* Atmospheric Vignette Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#08080a]/40 via-transparent to-transparent z-0" />

      {/* SPACING TOP MARGIN FOR GLOBAL MISSION CONTROL NAVBAR */}
      <div className="relative z-20 w-full pt-16 md:pt-20" />

      {/* MAIN HERO CONTENT */}
      <div className="hero-scroll-container relative z-10 flex-1 flex items-center px-6 sm:px-10 lg:px-16 py-12 md:py-16">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
          {/* LEFT TYPOGRAPHY STACK */}
          <div
            ref={typographyRef}
            className="hero-typography-layer lg:col-span-6 max-w-xl"
          >
            <div className="hero-identity mb-4 space-y-1">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.38em] text-[#ff5a36]">
                Pallav Deshmukh
              </p>
              <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-zinc-400">
                Electronics &amp; Telecommunication Engineering
              </p>
            </div>

            <h1 className="hero-headline text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-[-0.08em] text-[#f3ece4] leading-[0.88] my-2">
              Mission
              <br />
              Control
            </h1>

            <p className="hero-copy mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-zinc-300 font-normal">
              Electronics &amp; Telecommunication engineering student building full-stack products,
              intelligent systems, and software at the intersection of engineering, data, and applied AI.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <motion.button
                whileHover={{ translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onNavigateToProjects}
                className="hero-cta border border-[#ff5a36] bg-[#ff5a36] text-black font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] px-6 py-3.5 rounded transition-all cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a36] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a]"
              >
                View Projects ↓
              </motion.button>

              <motion.button
                whileHover={{ translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onNavigateToProjects}
                className="hero-cta border border-zinc-800 bg-zinc-900/60 text-zinc-300 font-medium text-xs sm:text-sm uppercase tracking-[0.2em] px-6 py-3.5 rounded transition-all hover:border-zinc-700 hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a]"
              >
                About Me
              </motion.button>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-6 min-h-[520px]" aria-hidden="true" />
        </div>
      </div>

      {/* INTEGRATED FLOATING & SCROLL-FADING SCROLL INDICATOR */}
      <footer className="relative z-20 w-full px-6 sm:px-10 lg:px-16 pb-6">
        <div
          style={{ opacity: scrollOpacity }}
          className="flex items-center justify-between max-w-7xl mx-auto transition-opacity duration-300"
        >
          <button
            type="button"
            onClick={onNavigateToProjects}
            aria-label="Scroll to projects"
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-zinc-400 hover:text-[#ff5a36] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff5a36] cursor-pointer"
          >
            <span>Scroll to Explore</span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="font-bold text-[#ff5a36] inline-block"
            >
              ↓
            </motion.span>
          </button>

          <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-zinc-500 hidden sm:block">
            ORBITAL NAVIGATION // SYSTEM LIVE
          </div>
        </div>
      </footer>
    </section>
  );
}
