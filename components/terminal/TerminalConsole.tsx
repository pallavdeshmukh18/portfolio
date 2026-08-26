"use client";

import { useEffect, useRef, useState } from "react";
import { projectsData } from "@/components/projects/ProjectsSection";

interface OutputLine {
  id: string;
  type: "input" | "output" | "component";
  content?: string;
  component?: React.ReactNode;
}

const INITIAL_OUTPUT: OutputLine[] = [
  {
    id: "init-1",
    type: "input",
    content: "whoami",
  },
  {
    id: "init-2",
    type: "output",
    content: `Pallav Deshmukh
Electronics & Telecommunication Engineering
Full-Stack Developer

Building software, intelligent systems, and engineering projects.`,
  },
  {
    id: "init-3",
    type: "input",
    content: "help",
  },
  {
    id: "init-4",
    type: "output",
    content: `Available commands:

  whoami          — about Pallav
  projects        — list current projects
  open <name>     — inspect a project
  experience      — engineering experience
  achievements    — hackathons & problem solving
  systems         — technical stack
  resume          — open resume
  status          — system status
  contact         — contact & social links
  ls              — list portfolio directories
  clear           — clear terminal

Type 'open <project>' to inspect a project.`,
  },
];

export default function TerminalConsole() {
  const [history, setHistory] = useState<OutputLine[]>(INITIAL_OUTPUT);
  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>(["whoami", "help"]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [hasExecuted, setHasExecuted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever output updates
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on clicking anywhere inside terminal container
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Ctrl+L or Cmd+L to clear screen
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setHistory([]);
      return;
    }

    // Arrow Up: Command History Back
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[commandHistory.length - 1 - nextIndex] || "");
      return;
    }

    // Arrow Down: Command History Forward
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIndex] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
      return;
    }

    // Enter: Execute Command
    if (e.key === "Enter") {
      e.preventDefault();
      const rawCmd = inputVal.trim();
      if (!rawCmd) return;

      setHasExecuted(true);
      setCommandHistory((prev) => [...prev, rawCmd]);
      setHistoryIndex(-1);
      setInputVal("");

      const newEntries: OutputLine[] = [
        { id: `in-${Date.now()}`, type: "input", content: rawCmd },
      ];

      const lowerCmd = rawCmd.toLowerCase();
      const parts = lowerCmd.split(" ");
      const action = parts[0];

      if (action === "clear") {
        setHistory([]);
        return;
      } else if (action === "help") {
        newEntries.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: `Available commands:

  whoami          — about Pallav
  projects        — list current projects
  open <name>     — inspect a project
  experience      — engineering experience
  achievements    — hackathons & problem solving
  systems         — technical stack
  resume          — open resume
  status          — system status
  contact         — contact & social links
  ls              — list portfolio directories
  clear           — clear terminal

Type 'open <project>' to inspect a project.`,
        });
      } else if (action === "whoami") {
        newEntries.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: `Pallav Deshmukh
Electronics & Telecommunication Engineering
Full-Stack Developer

Building software, intelligent systems, and engineering projects.`,
        });
      } else if (action === "projects") {
        const listText = projectsData
          .map((p) => `  ${p.number}  ${p.name.padEnd(14)} — ${p.desc}`)
          .join("\n");
        newEntries.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: `OPERATIONAL PROJECTS:\n\n${listText}\n\nType 'open <project>' to inspect a project.`,
        });
      } else if (action === "open") {
        const target = parts.slice(1).join(" ").trim();
        if (!target) {
          newEntries.push({
            id: `out-${Date.now()}`,
            type: "output",
            content: `Usage: open <project>\nExample: open lattice, open scout, open krypton`,
          });
        } else {
          const targetClean = target.replace(/[^a-z0-9]/g, "");
          const match = projectsData.find(
            (p) =>
              p.id === target ||
              p.shortName.toLowerCase() === target ||
              p.name.toLowerCase().replace(/[^a-z0-9]/g, "").includes(targetClean)
          );

          if (match) {
            const primaryUrl = match.liveUrl || match.githubUrl;
            newEntries.push({
              id: `out-${Date.now()}`,
              type: "component",
              component: (
                <div className="my-3 p-4 border border-white/10 bg-black/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-bold text-[#f3ece4] text-sm">{match.name}</span>
                    <span className="text-[#ff5a36] text-[10px] tracking-[0.2em]">{match.type}</span>
                  </div>
                  <p className="text-zinc-300 text-xs">{match.desc}</p>
                  <p className="text-zinc-500 text-[11px]">Stack: {match.tags.join(" • ")}</p>
                  <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs">
                    <a
                      href={primaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#ff5a36] bg-[#ff5a36]/10 text-[#ff5a36] hover:bg-[#ff5a36] hover:text-black px-3 py-1.5 transition-all"
                    >
                      [ OPEN LIVE PROJECT ↗ ]
                    </a>
                    {match.githubUrl && (
                      <a
                        href={match.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-white/20 text-zinc-300 hover:text-white px-3 py-1.5 transition-all"
                      >
                        [ VIEW SOURCE ↗ ]
                      </a>
                    )}
                  </div>
                </div>
              ),
            });
          } else {
            newEntries.push({
              id: `out-${Date.now()}`,
              type: "output",
              content: `PROJECT NOT FOUND: ${target}\n\nAvailable projects:\nlattice  scout  krypton  lowkey-loss  structurai  voicetrace  draftangle`,
            });
          }
        }
      } else if (action === "experience") {
        newEntries.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: `SIX LADDERS
Software Engineering Intern

Platform: Ladder1 [Repository: Juniper2]

Focus: Resume ATS workflows, automated processing, scheduled workloads, cloud infrastructure, and deployment workflows.

Responsibilities:
• Worked on the Resume ATS workflow, contributing to resume processing and candidate evaluation against job requirements.
• Worked with scheduled background jobs supporting automated platform workflows and tested scheduled workloads.
• Worked with GCP infrastructure and cloud services supporting application workloads and background processes.
• Utilized GitHub-based CI/CD workflows for building, testing, and deploying changes to production.

Tech Stack: GCP · Resume ATS · Automation · Scheduled Jobs · GitHub · CI/CD`,
        });
      } else if (action === "achievements") {
        newEntries.push({
          id: `out-${Date.now()}`,
          type: "component",
          component: (
            <div className="my-3 space-y-4 text-xs font-mono">
              <div>
                <p className="text-[#ff5a36] font-bold tracking-[0.2em] mb-2">HACKATHONS</p>
                <div className="space-y-2 text-zinc-300">
                  <div>
                    <p className="text-[#f3ece4] font-semibold">Runner Up — Coherence &apos;26</p>
                    <p className="text-zinc-500 text-[11px]">VCET, Mumbai • Organizer: MLSC VCET</p>
                  </div>
                  <div>
                    <p className="text-[#f3ece4] font-semibold">Domain Winner (Web Development) — SE Hackathon</p>
                    <p className="text-zinc-500 text-[11px]">SPIT, Mumbai • Organizer: CSI SPIT</p>
                  </div>
                  <div>
                    <p className="text-[#f3ece4] font-semibold">Grand Finalist — Colo Hacks</p>
                    <p className="text-zinc-500 text-[11px]">DBIT, Mumbai</p>
                  </div>
                  <div>
                    <p className="text-[#f3ece4] font-semibold">Grand Finalist — IndiaNext Hackathon</p>
                    <p className="text-zinc-500 text-[11px]">KES Shroff, Mumbai</p>
                  </div>
                  <div>
                    <p className="text-[#f3ece4] font-semibold">Grand Finalist [INTERNATIONAL] — LaserHacks</p>
                    <p className="text-zinc-500 text-[11px]">Lasell University, USA</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3">
                <p className="text-[#ff5a36] font-bold tracking-[0.2em] mb-2">PROBLEM SOLVING</p>
                <div className="space-y-2">
                  <div>
                    <a
                      href="https://leetcode.com/u/pallav_deshmukh/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-200 hover:text-[#ff5a36] underline"
                    >
                      LeetCode: 400+ problems solved (@pallav_deshmukh) ↗
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://codeforces.com/profile/pallavdeshmukh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-200 hover:text-[#ff5a36] underline"
                    >
                      Codeforces: 1030 rating | 100+ problems solved (pallavdeshmukh) ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ),
        });
      } else if (action === "systems") {
        newEntries.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: `TECHNICAL STACK & SYSTEMS:

FRONTEND       : React / Next.js / TypeScript / Tailwind CSS / Framer Motion / Three.js
BACKEND        : Node.js / REST & WebSockets APIs / PostgreSQL
LANGUAGES      : TypeScript / JavaScript / Python / C++ / HTML / CSS
AI / DATA      : Python / Applied LLM Workflows / Threat Detection
INFRASTRUCTURE : GCP / Cloud Automation / Scheduled Jobs / Docker / CI/CD
TOOLS          : Git / GitHub / Linux / zsh / Vercel`,
        });
      } else if (action === "contact") {
        newEntries.push({
          id: `out-${Date.now()}`,
          type: "component",
          component: (
            <div className="my-2 space-y-2 text-xs font-mono">
              <p className="text-[#ff5a36] font-bold tracking-[0.2em]">CONTACT CHANNELS</p>
              <div className="space-y-1">
                <p>
                  Email:{" "}
                  <a href="mailto:pallavdeshmukh26@gmail.com" className="text-[#f3ece4] underline hover:text-[#ff5a36]">
                    pallavdeshmukh26@gmail.com
                  </a>
                </p>
                <p>
                  GitHub:{" "}
                  <a href="https://github.com/pallavdeshmukh18" target="_blank" rel="noopener noreferrer" className="text-[#f3ece4] underline hover:text-[#ff5a36]">
                    github.com/pallavdeshmukh18 ↗
                  </a>
                </p>
                <p>
                  LinkedIn:{" "}
                  <a href="https://www.linkedin.com/in/pallav-deshmukh" target="_blank" rel="noopener noreferrer" className="text-[#f3ece4] underline hover:text-[#ff5a36]">
                    linkedin.com/in/pallav-deshmukh ↗
                  </a>
                </p>
              </div>
            </div>
          ),
        });
      } else if (action === "status") {
        newEntries.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: `SYSTEM STATUS:

PORTFOLIO       ONLINE
PROJECTS        07 ACTIVE
MISSION LOG     COMPLETE
COMMAND LINK    ONLINE
CHANNEL         OPEN`,
        });
      } else if (action === "ls") {
        newEntries.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: `/projects    /experience    /achievements    /systems    /resume    /contact`,
        });
      } else if (action === "resume") {
        if (typeof window !== "undefined") {
          window.open("/resume.pdf", "_blank", "noopener,noreferrer");
        }
        newEntries.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: `RESUME // AVAILABLE\n\nOpening /resume.pdf in a new tab...`,
        });
      } else {
        newEntries.push({
          id: `out-${Date.now()}`,
          type: "output",
          content: `zsh: command not found: ${rawCmd}\nType 'help' to see available commands.`,
        });
      }

      setHistory((prev) => [...prev, ...newEntries]);
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      className="w-full border border-white/10 bg-[#08080c]/95 rounded-none shadow-2xl overflow-hidden font-mono text-xs text-zinc-300 cursor-text select-none"
    >
      {/* TERMINAL HEADER BAR */}
      <div className="flex items-center justify-between border-b border-white/10 bg-black/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5a36] animate-pulse" />
          <span className="text-[11px] font-mono text-zinc-400">
            PALLAV@MISSION-CONTROL — zsh
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] text-[#ff5a36]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36] animate-pulse" />
          <span>ONLINE</span>
        </div>
      </div>

      {/* TERMINAL BODY */}
      <div
        ref={terminalBodyRef}
        className="p-4 sm:p-6 min-h-[360px] max-h-[520px] overflow-y-auto space-y-4 font-mono leading-relaxed selection:bg-[#ff5a36] selection:text-black cursor-text"
      >
        {history.map((item) => (
          <div key={item.id}>
            {item.type === "input" && (
              <div className="flex items-center gap-2 text-[#f3ece4]">
                <span className="text-[#ff5a36] font-bold">PALLAV@MISSION-CONTROL ~ %</span>
                <span>{item.content}</span>
              </div>
            )}
            {item.type === "output" && (
              <pre className="whitespace-pre-wrap font-mono text-zinc-300 text-xs mt-1 leading-relaxed">
                {item.content}
              </pre>
            )}
            {item.type === "component" && item.component}
          </div>
        ))}

        {/* ACTIVE PROMPT INPUT */}
        <div className="flex items-center gap-2 pt-1 text-[#f3ece4]">
          <span className="text-[#ff5a36] font-bold">PALLAV@MISSION-CONTROL ~ %</span>
          <div className="relative flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              autoCapitalize="off"
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal command input prompt"
              className="w-full bg-transparent outline-none text-[#f3ece4] font-mono text-xs caret-[#ff5a36]"
            />
          </div>
        </div>
      </div>

      {/* TERMINAL FOOTER STATUS LINE */}
      <div className="border-t border-white/10 bg-black/60 px-4 py-2.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.28em] text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a36]" />
          <span>{hasExecuted ? "COMMAND LINK // ACTIVE" : "COMMAND LINK // ONLINE — TYPE 'HELP' TO BEGIN"}</span>
        </div>
        <div>ZSH // PORTFOLIO CLI</div>
      </div>
    </div>
  );
}
