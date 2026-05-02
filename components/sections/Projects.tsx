"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PROJECTS = [
  {
    num: "01",
    name: "HackTheWallet",
    desc: "A blockchain game on Starknet: connect your wallet, then convince an AI to give your crypto back. Uses Gemini 1.5 Flash with real trust-scoring. On-chain rewards, voice I/O, deployed on Sepolia testnet. Encode AI Hackathon — 1st Place.",
    tags: ["Next.js", "Starknet", "Gemini 1.5 Flash", "Smart Contracts", "TypeScript"],
    url: "https://github.com/Sahid-m/HackTheWallet",
    badge: "1st Place · Encode",
  },
  {
    num: "02",
    name: "Go Fish",
    desc: "Decentralised payment platform on Polkadot for the global fishing import/export industry. Smart contracts give exporters 97.5% of trade value instantly. Eliminates FX volatility and intermediary fees with stablecoin integration.",
    tags: ["Next.js", "Polkadot", "Solidity", "TypeScript", "Smart Contracts"],
    url: "https://github.com/Sahid-m",
    badge: "EasyA x Polkadot",
  },
  {
    num: "03",
    name: "StreamFlow",
    desc: "Decentralised creator tipping platform built on Radix blockchain. Streamers receive tips directly from viewers with real-time analytics and on-chain transaction processing. Built at Radix Hack.",
    tags: ["TypeScript", "React", "Rust", "Radix Blockchain"],
    url: "https://github.com/Sahid-m/radix-hack",
    badge: "1st Place · Radix Hack",
  },
  {
    num: "04",
    name: "Foodo-Baggins",
    desc: "AI nutrition tracker that roasts your diet. Upload a meal photo — it analyses calories, gives personalised advice, posts a sarcastic comment about your food choices, and converts meals into sustainability Green Points. Royal Hackaway v8.",
    tags: ["Next.js", "TypeScript", "MongoDB", "Ollama", "GenAI"],
    url: "https://github.com/Sahid-m/foodo_baggins",
    badge: "3rd · Verdn Track",
  },
  {
    num: "05",
    name: "Automated Object Retriever",
    desc: "Autonomous robot achieving 95% item retrieval accuracy, reducing manual retrieval time by 70%. Built from scratch with Arduino, ultrasonic sensors, and embedded C — hardware and software as one.",
    tags: ["Arduino", "Ultrasonic Sensor", "Embedded C", "Robotics"],
    url: "#",
    badge: "Hardware · 2024",
  },
  {
    num: "06",
    name: "ClipForge AI",
    desc: "AI-powered video clipping tool. Feed it a long video, get back the best moments — cut, captioned, ready to post. Built for creators who don't have time to edit.",
    tags: ["TypeScript", "AI", "Video Processing"],
    url: "https://github.com/Ibad-10/clipforge-ai",
    badge: "In Progress",
  },
];

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="bg-[#080808] px-6 md:px-12 py-24">
      <motion.p
        className="section-label mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
      >
        [ 04 ] — Work
      </motion.p>

      <div className="grid md:grid-cols-2 gap-4 max-w-6xl">
        {PROJECTS.map((project, i) => (
          <motion.a
            key={project.num}
            href={project.url === "#" ? undefined : project.url}
            target={project.url === "#" ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="group block border border-white/5 p-6 hover:border-[#FF4D2D]/40 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}
          >
            <div
              className="absolute top-2 right-4 font-display font-black text-[80px] leading-none tracking-[-0.05em] pointer-events-none select-none"
              style={{ color: "rgba(255,255,255,0.025)" }}
            >
              {project.num}
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[9px] tracking-widest uppercase text-[#FF4D2D] border border-[#FF4D2D]/30 px-2 py-1">
                {project.badge}
              </span>
              <span className="font-mono text-[10px] text-[#333] group-hover:text-[#FF4D2D] transition-colors">
                ↗
              </span>
            </div>

            <h3 className="font-display font-black text-lg text-white mb-3 tracking-tight group-hover:text-[#FF4D2D] transition-colors duration-300">
              {project.name}
            </h3>

            <p className="font-mono text-[11px] text-[#555] leading-relaxed mb-4">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] tracking-wide text-[#444] border border-white/5 px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#FF4D2D] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
