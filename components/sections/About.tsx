"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

function CountUp({ to, suffix = "", inView }: { to: number; suffix?: string; inView: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = Math.ceil(to / 50);
    const interval = setInterval(() => {
      current = Math.min(current + step, to);
      setVal(current);
      if (current >= to) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [inView, to]);
  return <>{val}{suffix}</>;
}

const STATS = [
  { display: "1st", label: "Year Topper — 1st out of 30", isStatic: true },
  { to: 8, suffix: "+", label: "Projects Shipped", isStatic: false },
  { isStatic: true, display: "4×", label: "Hackathon Podiums" },
  { display: "95%", label: "Robot Retrieval Accuracy", isStatic: true },
];

const EXPERIENCE = [
  { company: "BMW Group", role: "Logistics Planning Intern (Controls & Automation)", period: "Jul 2025 – Present" },
  { company: "EY (Ernst & Young)", role: "Data Analyst", period: "Jul 2024 – Sep 2024" },
  { company: "Cloud Nebula Enterprises", role: "Web Developer", period: "Jun 2024 – Sep 2024" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="bg-[#080808] px-6 md:px-12 py-24">
      <motion.p
        className="section-label mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        [ 02 ] — About
      </motion.p>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="font-display font-black text-3xl md:text-5xl text-white leading-[0.9] tracking-[-0.03em] mb-6">
            Builder by nature,
            <br />
            <span className="text-outline-red">hacker by choice.</span>
          </h2>

          <p className="font-mono text-sm text-[#555] leading-relaxed mb-8">
            BEng Computer Systems Engineering at Brunel University London — Predicted First Class, ranked 1st out of 30. Currently a Logistics Planning Intern (Controls & Automation) at BMW Group, writing PLC logic and supporting Industry 4.0 projects in a live engine manufacturing plant. Previously at EY, where I analysed 20,000+ data entries and cut interpretation time by 25%. I build things that work: blockchain games that win hackathons, AI agents, autonomous robots with 95% retrieval accuracy, and decentralised payment platforms. Open to high-impact engineering internships, Summer 2026.
          </p>

          <div className="space-y-3 border-t border-white/5 pt-6">
            {EXPERIENCE.map((exp) => (
              <div key={exp.company} className="flex items-start gap-4">
                <div className="w-1 h-1 bg-[#FF4D2D] mt-2 shrink-0" />
                <div>
                  <p className="font-mono text-[11px] text-white tracking-wide">{exp.company}</p>
                  <p className="font-mono text-[10px] text-[#444]">{exp.role} · {exp.period}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="flex flex-col gap-6"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] overflow-hidden">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#FF4D2D] z-10" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#FF4D2D] z-10" />
              <Image
                src="/photos/hero.jpeg"
                alt="Ibad Ullah Zuberi"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden">
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#FF4D2D] z-10" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#FF4D2D] z-10" />
              <Image
                src="/photos/hackathon.jpeg"
                alt="Ibad presenting at hackathon"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                className="border border-white/5 p-4 hover:border-[#FF4D2D]/30 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                <div className="font-display font-black text-2xl md:text-3xl text-white tracking-tight">
                  {stat.isStatic ? (
                    stat.display
                  ) : (
                    <CountUp to={stat.to!} suffix={stat.suffix} inView={inView} />
                  )}
                </div>
                <div className="font-mono text-[9px] text-[#444] tracking-widest uppercase mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
