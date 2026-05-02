"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const HACKATHONS = [
  {
    num: "01",
    event: "Encode AI London Hackathon 2025",
    prize: "1st Place — Main Track",
    extra: ["2nd — Nethermind Bounty", "5th — StarkWare Bounty"],
    desc: "Built HackTheWallet — a Starknet blockchain game where players use conversational AI to reclaim locked crypto. Prompt engineering meets DeFi. First place across all teams, plus two sponsor bounties.",
    date: "Apr 2025",
    org: "Encode Club",
    gold: true,
  },
  {
    num: "02",
    event: "Brunel University Hack",
    prize: "1st Place",
    extra: [],
    desc: "Shipped luffa-ai-bot — a LangGraph multi-tool AI assistant integrated into the Luffa live messaging platform. Handles voting, image generation, hotel booking — all from chat. Built and deployed in under 24 hours.",
    date: "2024",
    org: "Brunel University London",
    gold: true,
  },
  {
    num: "03",
    event: "Radix Hack",
    prize: "1st Place",
    extra: [],
    desc: "Built StreamFlow, a decentralised creator tipping platform on Radix blockchain. Real-time tip analytics, on-chain transaction processing, TypeScript + Rust architecture.",
    date: "2024",
    org: "Radix Foundation",
    gold: true,
  },
  {
    num: "04",
    event: "Royal Hackaway v8",
    prize: "3rd Place — Verdn Environmental Track",
    extra: [],
    desc: "Built Foodo-Baggins at Royal Holloway's inter-university hackathon. AI nutrition tracker with sustainability integration — analyses food photos, provides coaching, converts meals into eco-friendly Green Points.",
    date: "2024",
    org: "Royal Holloway University",
    gold: false,
  },
  {
    num: "05",
    event: "EasyA x Polkadot Hackathon London",
    prize: "Finalist",
    extra: [],
    desc: "Built Go Fish — decentralised payment platform for the global fishing industry on Polkadot. Smart contracts enable 97.5% instant payment to exporters, with automated collateral and stablecoin FX protection.",
    date: "Apr 2025",
    org: "EasyA",
    gold: false,
  },
];

export function Hackathons() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="hackathons" ref={ref} className="bg-[#050505] px-6 md:px-12 py-24">
      <motion.p
        className="section-label mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
      >
        [ 05 ] — Hackathons
      </motion.p>

      <motion.p
        className="font-display font-black text-2xl md:text-4xl text-white tracking-tight mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
      >
        Multiple hackathons.{" "}
        <span className="text-outline-red">Multiple wins.</span>
      </motion.p>

      <div className="space-y-3 max-w-4xl">
        {HACKATHONS.map((hack, i) => (
          <motion.div
            key={hack.num}
            className="border border-white/5 hover:border-[#FF4D2D]/30 transition-all duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}
          >
            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="font-mono text-[10px] tracking-widest uppercase px-2 py-1 border"
                      style={{
                        borderColor: hack.gold ? "#FF4D2D" : "rgba(255,255,255,0.1)",
                        color: hack.gold ? "#FF4D2D" : "#555",
                      }}
                    >
                      {hack.prize}
                    </span>
                    {hack.extra.map((e) => (
                      <span
                        key={e}
                        className="font-mono text-[9px] tracking-widest uppercase text-[#444] border border-white/5 px-2 py-1 hidden md:inline"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display font-black text-base md:text-xl text-white tracking-tight group-hover:text-[#FF4D2D] transition-colors duration-300">
                    {hack.event}
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-[#333] tracking-widest shrink-0">
                  {hack.date}
                </span>
              </div>
              <p className="font-mono text-[11px] text-[#555] leading-relaxed">
                {hack.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
