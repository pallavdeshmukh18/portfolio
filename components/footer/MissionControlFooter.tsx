"use client";

import { motion } from "framer-motion";

export default function MissionControlFooter() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const endpoints = [
    {
      label: "EMAIL",
      value: "pallavdeshmukh26@gmail.com",
      url: "mailto:pallavdeshmukh26@gmail.com",
    },
    {
      label: "GITHUB",
      value: "github.com/pallavdeshmukh18",
      url: "https://github.com/pallavdeshmukh18",
    },
    {
      label: "LINKEDIN",
      value: "linkedin.com/in/pallav-deshmukh",
      url: "https://www.linkedin.com/in/pallav-deshmukh",
    },
    {
      label: "RESUME",
      value: "VIEW RESUME ↗",
      url: "/resume.pdf",
    },
  ];

  return (
    <footer
      aria-label="Mission Control Footer"
      className="relative z-10 bg-transparent px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 md:pt-28 pb-12 select-none"
    >
      {/* FAINT ATMOSPHERIC CONTINUATION FROM TERMINAL */}
      <div className="pointer-events-none absolute inset-x-0 -top-20 h-44 overflow-hidden z-0 opacity-40">
        <svg className="w-full h-full" viewBox="0 0 1200 200" fill="none">
          <path
            d="M100,0 C500,100 700,150 1100,200"
            stroke="rgba(255, 90, 54, 0.16)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* MAIN FOOTER CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16">
          {/* LEFT HEADING & PRIMARY CTA (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-xs font-mono uppercase tracking-[0.38em] text-[#ff5a36]">
                SECTION 06 // TRANSMISSION END
              </p>
              <h2 className="mt-3 text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-[-0.05em] text-[#f3ece4] leading-none">
                Mission
                <br />
                Complete.
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="max-w-lg text-sm md:text-base leading-relaxed text-zinc-400 font-normal"
            >
              Thanks for making it this far. If you&apos;d like to build something, solve something, or just talk engineering — open a channel.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="pt-2"
            >
              <a
                href="mailto:pallavdeshmukh26@gmail.com"
                className="group inline-flex items-center gap-3 bg-[#ff5a36] hover:bg-[#ff7a59] text-black font-semibold text-xs sm:text-sm uppercase tracking-[0.25em] px-7 py-4 rounded-none transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5a36]"
              >
                <span>OPEN CHANNEL</span>
                <span className="font-bold inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          </div>

          {/* RIGHT SYSTEM ENDPOINTS PANEL (5 Cols) */}
          <div className="lg:col-span-5 border border-white/10 bg-[#08080b]/90 p-6 sm:p-8 backdrop-blur-md rounded-none text-left">
            <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#ff5a36] mb-6 border-b border-white/10 pb-3">
              SYSTEM ENDPOINTS // DIRECT LINK
            </p>

            <div className="space-y-4 font-mono text-xs">
              {endpoints.map((ep, idx) => (
                <motion.div
                  key={ep.label}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * idx, ease: "easeOut" }}
                  className="flex items-center justify-between py-2 border-b border-white/5"
                >
                  <span className="text-[10px] text-zinc-500 uppercase tracking-[0.25em]">
                    {ep.label}
                  </span>
                  <a
                    href={ep.url}
                    target={ep.url.startsWith("http") || ep.url.endsWith(".pdf") ? "_blank" : undefined}
                    rel={ep.url.startsWith("http") || ep.url.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                    className="text-zinc-300 hover:text-[#ff5a36] transition-colors tracking-wide font-sans text-xs flex items-center gap-1"
                  >
                    <span>{ep.value}</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* SYSTEM STATUS HORIZONTAL DIVIDER WITH TRAVELING SIGNAL */}
        <div className="relative border-t border-white/10 pt-8 select-none">
          {/* ANIME.JS / MOTION SIGNAL POINT */}
          <div className="absolute -top-[3px] left-0 right-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ x: ["-10%", "110%"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="h-[5px] w-14 bg-gradient-to-r from-transparent via-[#ff5a36] to-transparent rounded-full opacity-90"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-xs font-mono">
            {/* LEFT STATUS METADATA (7 Cols) */}
            <div className="md:col-span-7 flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36] animate-pulse" />
                <span>CHANNEL STATUS: <strong className="text-[#ff5a36]">ONLINE</strong></span>
              </div>
              <div>TRANSMISSION: <strong className="text-zinc-300">READY</strong></div>
              <div>SYSTEM: <strong className="text-zinc-300">MISSION CONTROL</strong></div>
            </div>

            {/* RIGHT STATUS CLOSED & BACK TO TOP BUTTON (5 Cols) */}
            <div className="md:col-span-5 flex items-center justify-between md:justify-end gap-6 text-[10px] uppercase tracking-[0.28em]">
              <span className="text-zinc-500">TRANSMISSION CLOSED</span>

              <button
                type="button"
                onClick={scrollToTop}
                className="group flex items-center gap-2 border border-white/15 bg-black/40 hover:border-[#ff5a36] hover:text-[#ff5a36] text-zinc-400 px-3.5 py-1.5 rounded-none transition-all cursor-pointer focus-visible:outline-none"
              >
                <span>BACK TO TOP</span>
                <span className="font-bold group-hover:-translate-y-0.5 transition-transform text-[#ff5a36]">
                  ↑
                </span>
              </button>
            </div>
          </div>

          {/* VERY BOTTOM COPYRIGHT LINE */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500">
            <div>© 2026 PALLAV DESHMUKH</div>
            <div>BUILT WITH CODE // SYSTEMS // CURIOSITY</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
