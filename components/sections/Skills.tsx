"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const SKILLS: Record<string, { name: string; hot?: boolean }[]> = {
  "Web & Software": [
    { name: "TypeScript", hot: true },
    { name: "JavaScript", hot: true },
    { name: "Python", hot: true },
    { name: "C" },
    { name: "C++", hot: true },
    { name: "Java" },
    { name: "MATLAB" },
    { name: "SQL" },
    { name: "VBA" },
    { name: "Assembly" },
    { name: "Verilog HDL" },
  ],
  "Frontend": [
    { name: "React / Next.js", hot: true },
    { name: "Tailwind CSS" },
    { name: "Framer Motion" },
    { name: "HTML / CSS" },
  ],
  "Backend": [
    { name: "Node / Express" },
    { name: "FastAPI" },
    { name: "Flask", hot: true },
    { name: "Socket.io" },
    { name: "PostgreSQL" },
    { name: "MongoDB" },
    { name: "SQLAlchemy" },
    { name: "REST APIs" },
  ],
  "Controls & Automation": [
    { name: "PLC Programming", hot: true },
    { name: "Siemens TIA Portal V17", hot: true },
    { name: "WAGO e!COCKPIT" },
    { name: "Ladder Logic" },
    { name: "Industry 4.0" },
  ],
  "Embedded & Hardware": [
    { name: "Arduino", hot: true },
    { name: "Raspberry Pi (Pico)" },
    { name: "FPGA" },
    { name: "Sensor Integration" },
    { name: "Embedded C" },
    { name: "Soldering" },
    { name: "Breadboarding" },
  ],
  "Data & Tools": [
    { name: "SAP", hot: true },
    { name: "SAP Analytics Cloud" },
    { name: "Oracle SQL / APEX" },
    { name: "Pandas" },
    { name: "NumPy" },
    { name: "Docker" },
    { name: "Vercel", hot: true },
    { name: "Git", hot: true },
    { name: "Figma" },
    { name: "Fusion 360" },
    { name: "LabVIEW" },
  ],
};

type Category = keyof typeof SKILLS;

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<Category>("Web & Software");

  return (
    <section id="skills" ref={ref} className="bg-[#050505] px-6 md:px-12 py-24">
      <motion.p
        className="section-label mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
      >
        [ 03 ] — Skills
      </motion.p>

      <div className="flex flex-wrap gap-2 mb-10">
        {(Object.keys(SKILLS) as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="font-mono text-[10px] tracking-widest uppercase px-4 py-2 border transition-all duration-200"
            style={{
              borderColor: active === cat ? "#FF4D2D" : "rgba(255,255,255,0.07)",
              color: active === cat ? "#FF4D2D" : "#555555",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {SKILLS[active].map((skill, i) => (
            <motion.span
              key={skill.name}
              className="font-mono text-[11px] tracking-wide px-3 py-2 border transition-all duration-200 hover:-translate-y-0.5"
              style={{
                borderColor: skill.hot ? "#FF4D2D" : "rgba(255,255,255,0.1)",
                color: skill.hot ? "#FF4D2D" : "#888888",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
            >
              {skill.name}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
