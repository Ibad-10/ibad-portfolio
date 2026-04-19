"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { PixelProgressBar } from "@/components/ui/PixelProgressBar";

const SKILLS = {
  Languages: [
    { name: "TypeScript", value: 85 },
    { name: "JavaScript", value: 88 },
    { name: "Python",     value: 78 },
    { name: "C#",         value: 65 },
    { name: "Rust",       value: 50 },
    { name: "C++",        value: 55 },
    { name: "Java",       value: 60 },
  ],
  Frontend: [
    { name: "React / Next.js", value: 88 },
    { name: "Tailwind CSS",    value: 85 },
    { name: "Framer Motion",   value: 75 },
    { name: "HTML / CSS",      value: 90 },
  ],
  Backend: [
    { name: "Node / Express", value: 80 },
    { name: "FastAPI",        value: 70 },
    { name: "Socket.io",      value: 68 },
    { name: "PostgreSQL",     value: 65 },
    { name: "MongoDB",        value: 70 },
  ],
  Tools: [
    { name: "Docker",       value: 60 },
    { name: "Vercel",       value: 85 },
    { name: "Figma",        value: 70 },
    { name: "Raspberry Pi", value: 72 },
    { name: "Git",          value: 88 },
  ],
};

const COLORS: Record<string, string> = {
  Languages: "#00ff9f",
  Frontend:  "#00cfff",
  Backend:   "#ff2d78",
  Tools:     "#ffd700",
};

type Category = keyof typeof SKILLS;

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<Category>("Languages");

  return (
    <section id="skills" ref={ref} className="snap-section flex items-center bg-bg px-6 py-20">
      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          className="font-pixel text-primary text-lg md:text-2xl mb-10 glow-green"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          &gt; SKILL_TREE<span className="animate-blink">_</span>
        </motion.h2>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {(Object.keys(SKILLS) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className="font-pixel text-[8px] px-4 py-2 border transition-all duration-200"
              style={{
                borderColor: activeTab === cat ? COLORS[cat] : "#3a3a4a",
                color: activeTab === cat ? COLORS[cat] : "#3a3a4a",
                boxShadow: activeTab === cat ? `0 0 10px ${COLORS[cat]}40` : "none",
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Progress bars */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 gap-x-12"
        >
          {SKILLS[activeTab].map((skill) => (
            <PixelProgressBar
              key={skill.name}
              label={skill.name}
              value={skill.value}
              color={COLORS[activeTab]}
            />
          ))}
        </motion.div>

        {/* Skill badges */}
        <motion.div
          className="flex flex-wrap gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {SKILLS[activeTab].map((skill, i) => (
            <motion.span
              key={skill.name}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.05, type: "spring", stiffness: 300 }}
              className="font-mono text-base px-3 py-1 border"
              style={{
                borderColor: COLORS[activeTab],
                color: COLORS[activeTab],
                boxShadow: `0 0 6px ${COLORS[activeTab]}40`,
                imageRendering: "pixelated",
              }}
            >
              {skill.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
