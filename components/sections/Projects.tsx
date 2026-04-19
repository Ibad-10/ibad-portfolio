"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CardSpotlight } from "@/components/aceternity/CardSpotlight";
import { TiltCard } from "@/components/ui/TiltCard";

const PROJECTS = [
  {
    name: "HackTheWallet",
    desc: "Blockchain game where you convince an AI to give back your crypto. Built on Starknet.",
    tags: ["Next.js", "Starknet", "Gemini AI", "TypeScript"],
    url: "https://github.com/Sahid-m/HackTheWallet",
    color: "#00ff9f",
    contributed: true,
  },
  {
    name: "luffa-ai-bot",
    desc: "LangGraph multi-tool AI assistant integrated with Luffa Bot messaging platform.",
    tags: ["Python", "LangGraph", "FastAPI", "LangChain"],
    url: "https://github.com/Sahid-m/luffa-ai-bot",
    color: "#ff2d78",
    contributed: true,
  },
  {
    name: "clipforge-ai",
    desc: "AI-powered video clipping and editing tool built with TypeScript.",
    tags: ["TypeScript", "AI", "Video"],
    url: "https://github.com/Ibad-10/clipforge-ai",
    color: "#00cfff",
    contributed: false,
  },
  {
    name: "Atmos_Task",
    desc: "Supermarket checkout system with automated discount engine and SKU scanning.",
    tags: ["C#", "OOP", "CLI"],
    url: "https://github.com/Ibad-10/Atmos_Task",
    color: "#ffd700",
    contributed: false,
  },
];

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="snap-section flex items-center bg-bg px-6 py-20">
      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          className="font-pixel text-primary text-lg md:text-2xl mb-10 glow-green"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          &gt; PROJECTS<span className="animate-blink">_</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <TiltCard>
                <CardSpotlight
                  className="h-full border p-5 transition-all duration-300 group"
                  color={`${project.color}18`}
                  style={{
                    borderColor: "#3a3a4a",
                    background: "#0d0d14",
                  }}
                >
                  <div
                    className="border"
                    style={{ borderColor: project.color, boxShadow: `0 0 20px ${project.color}20` }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${project.color}50`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${project.color}20`;
                    }}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-pixel text-[10px] md:text-xs" style={{ color: project.color }}>
                          {project.name}
                        </h3>
                        {project.contributed && (
                          <span className="font-mono text-xs px-2 py-0.5 border border-accent text-accent ml-2 shrink-0">
                            CONTRIB
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-base text-text-main/80 mb-4 leading-relaxed">{project.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-xs px-2 py-0.5 border"
                            style={{ borderColor: `${project.color}60`, color: `${project.color}cc` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-pixel text-[8px] transition-colors duration-200"
                        style={{ color: project.color }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.textShadow = `0 0 8px ${project.color}`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.textShadow = "none";
                        }}
                      >
                        [ VIEW ON GITHUB ] →
                      </a>
                    </div>
                  </div>
                </CardSpotlight>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
