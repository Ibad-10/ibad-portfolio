"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Spotlight } from "@/components/aceternity/Spotlight";
import { TiltCard } from "@/components/ui/TiltCard";
import { Confetti } from "@/components/ui/Confetti";

const WINS = [
  {
    event: "Encode Hackathon",
    prize: "1ST PLACE",
    org: "Encode Club",
    desc: "Built HackTheWallet — a Starknet blockchain game where players convince an AI to return crypto.",
    color: "#ffd700",
    icon: "🏆",
  },
  {
    event: "Brunel Hack",
    prize: "1ST PLACE",
    org: "Brunel University",
    desc: "Won the university hackathon with an AI + blockchain solution built in under 24 hours.",
    color: "#ffd700",
    icon: "🏆",
  },
  {
    event: "Royal Holloway Hackathon",
    prize: "1ST PLACE",
    org: "Royal Holloway University",
    desc: "Top prize at Royal Holloway's hackathon, competing against teams from multiple universities.",
    color: "#ffd700",
    icon: "🏆",
  },
];

export function Hackathons() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="hackathons" ref={ref} className="snap-section relative flex items-center bg-bg px-6 py-20 overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60" fill="#ffd700" />
      <Confetti />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <motion.h2
          className="font-pixel text-lg md:text-2xl mb-4 glow-gold"
          style={{ color: "#ffd700" }}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          &gt; ACHIEVEMENTS<span className="animate-blink" style={{ color: "#ffd700" }}>_</span>
        </motion.h2>
        <motion.p
          className="font-mono text-xl text-muted mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          3× Hackathon Winner
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {WINS.map((win, i) => (
            <motion.div
              key={win.event}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.15 + 0.2, duration: 0.5, type: "spring", stiffness: 150 }}
            >
              <TiltCard maxTilt={8}>
                <div
                  className="border p-6 h-full flex flex-col gap-4 transition-all duration-300 cursor-pointer group"
                  style={{
                    borderColor: "#ffd70060",
                    background: "linear-gradient(135deg, #0d0d14, #1a1500)",
                    boxShadow: "0 0 20px #ffd70010",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 40px #ffd70030, inset 0 0 20px #ffd70008";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#ffd700";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px #ffd70010";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#ffd70060";
                  }}
                >
                  <div className="text-4xl">{win.icon}</div>
                  <div
                    className="font-pixel text-[8px] px-3 py-1 border self-start"
                    style={{ borderColor: "#ffd700", color: "#ffd700", boxShadow: "0 0 8px #ffd70060" }}
                  >
                    {win.prize}
                  </div>
                  <h3 className="font-pixel text-[9px] text-text-main leading-relaxed">{win.event}</h3>
                  <p className="font-mono text-base text-muted">{win.org}</p>
                  <p className="font-mono text-base text-text-main/80 leading-relaxed flex-1">{win.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
