"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import TerminalConsole from "./TerminalConsole";

const TerminalSection = forwardRef<HTMLElement, object>(
  function TerminalSection(_, ref) {
    return (
      <section
        ref={ref}
        aria-label="Command Deck Terminal"
        className="relative z-10 bg-transparent px-6 sm:px-10 lg:px-16 pt-8 sm:pt-12 md:pt-14 pb-20 md:pb-28"
      >
        {/* FAINT ATMOSPHERIC CONTINUATION CONNECTOR FROM SECTION 04 */}
        <div className="pointer-events-none absolute inset-x-0 -top-16 h-36 overflow-hidden z-0 opacity-40">
          <svg className="w-full h-full" viewBox="0 0 1200 200" fill="none">
            <path
              d="M1100,0 C900,100 500,150 100,200"
              stroke="rgba(255, 90, 54, 0.16)"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* SECTION HEADER REVEAL */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-12 text-center"
          >
            <p className="text-xs font-mono uppercase tracking-[0.38em] text-[#ff5a36]">
              SECTION 05 // COMMAND DECK
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-[-0.05em] text-[#f3ece4] leading-[0.92]">
              Access The Command Line.
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-sm md:text-base leading-relaxed text-zinc-400 font-normal">
              Prefer the terminal? Navigate the portfolio, inspect systems, and find the signal directly from the command deck.
            </p>
          </motion.div>

          {/* INTERACTIVE TERMINAL CONSOLE */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <TerminalConsole />
          </motion.div>

          {/* FOOTER END OF TRANSMISSION LINE */}
          <div className="mt-16 text-center border-t border-white/10 pt-6">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-500">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36] animate-pulse" />
              <span>COMMAND DECK // END OF TRANSMISSION</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default TerminalSection;
