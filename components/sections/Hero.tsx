"use client";
import { motion } from "framer-motion";
import { Ticker } from "@/components/ui/Ticker";
import { GhostText } from "@/components/ui/GhostText";

const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export function Hero() {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-[#050505]">
      <GhostText text="IBAD IBAD" />
      <div className="absolute inset-0 noise-overlay pointer-events-none z-[1]" aria-hidden="true" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none z-[1]"
        style={{ background: "radial-gradient(circle, rgba(255,77,45,0.05) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-24 pb-0">
        <span className="font-mono text-[10px] text-[#333] tracking-[0.3em] uppercase">
          Vol. 01 · Portfolio · 2026
        </span>
        <span className="font-mono text-[10px] text-[#333] tracking-widest uppercase hidden md:block">
          01 / 07 · London, UK
        </span>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 py-8">
        <motion.div {...FADE_UP}>
          <h1 className="font-display font-black leading-[0.85] tracking-[-0.04em] mb-5">
            <span
              className="block text-white"
              style={{ fontSize: "clamp(3rem, 9.5vw, 8rem)" }}
            >
              IBAD ULLAH
            </span>
            <span
              className="block"
              style={{
                fontSize: "clamp(3rem, 9.5vw, 8rem)",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(255,77,45,0.55)",
              }}
            >
              ZUBERI
            </span>
          </h1>

          <div className="w-10 h-[1px] bg-[#FF4D2D] mb-5" />

          <p className="font-mono text-xs md:text-sm text-[#555] tracking-wide max-w-lg leading-relaxed">
            BEng Computer Systems Engineering @ Brunel · BMW Logistics Intern · AI + Robotics Builder
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <button
            onClick={() => scrollTo("projects")}
            className="font-mono text-[11px] font-bold tracking-widest uppercase bg-[#FF4D2D] text-white px-7 py-3 hover:bg-[#e03d20] transition-colors duration-200"
          >
            VIEW WORK
          </button>
          <a
            href="/Ibad_CV.pdf"
            download
            className="font-mono text-[11px] font-bold tracking-widest uppercase border border-white/15 text-white/50 px-7 py-3 hover:border-white/30 hover:text-white/80 transition-all duration-200"
          >
            DOWNLOAD CV
          </a>
        </motion.div>

        <motion.p
          className="font-mono text-[9px] text-[#333] tracking-widest uppercase mt-16 hidden md:block"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ↓ SCROLL
        </motion.p>
      </div>

      <div className="relative z-10">
        <Ticker text="ENCODE AI HACKATHON — 1ST PLACE · BRUNEL HACK — 1ST PLACE · RADIX HACK — 1ST PLACE · BMW GROUP INTERN · EY DATA ANALYST · AUTONOMOUS ROBOT 95% ACCURACY · BLOCKCHAIN DEVELOPER · AI BUILDER · LONDON · OPEN TO INTERNSHIPS SUMMER 2026 ·" />
      </div>

      <div className="relative z-10 grid grid-cols-3 border-t border-white/5">
        {[
          { num: "1st", label: "Out of 30 — Year Topper" },
          { num: "4×", label: "Hackathon Podiums" },
          { num: "95%", label: "Robot Retrieval Accuracy" },
        ].map((stat, i) => (
          <div
            key={stat.num}
            className={`px-4 md:px-12 py-5 text-center ${i < 2 ? "border-r border-white/5" : ""}`}
          >
            <div className="font-display font-black text-xl md:text-3xl text-white tracking-tight">
              {stat.num}
            </div>
            <div className="font-mono text-[8px] md:text-[9px] text-[#333] tracking-widest uppercase mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
