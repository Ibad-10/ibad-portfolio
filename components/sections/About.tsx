"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function CountUp({ to, inView }: { to: number; inView: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 40);
    const interval = setInterval(() => {
      start = Math.min(start + step, to);
      setVal(start);
      if (start >= to) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [inView, to]);
  return <>{val}</>;
}

const STATS = [
  { label: "Projects Built",            value: 5,  suffix: "+" },
  { label: "Languages",                 value: 7,  suffix: "" },
  { label: "Hackathons Won",            value: 3,  suffix: "🏆" },
  { label: "Open Source Contributions", value: 2,  suffix: "" },
];

const BIO_LINES = [
  "$ whoami",
  "> Ibad — CS Student @ Brunel University",
  "$ cat skills.txt",
  "> Full-Stack · Blockchain · AI · Robotics",
  "$ ls ./achievements",
  "> 3x Hackathon Winner",
  "> Object Retriever Robot",
  "> Starknet DeFi Game",
  "$ echo 'currently_building'",
  "> ClipForge AI",
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [typedLines, setTypedLines] = useState<string[]>([]);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      setTypedLines((prev) => [...prev, BIO_LINES[i]]);
      i++;
      if (i >= BIO_LINES.length) clearInterval(interval);
    }, 300);
    return () => clearInterval(interval);
  }, [inView]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" ref={ref} className="snap-section relative flex items-center bg-bg px-6 py-20">
      {/* Corner brackets */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-primary opacity-60" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-primary opacity-60" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-primary opacity-60" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-primary opacity-60" />

      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          className="font-pixel text-primary text-lg md:text-2xl mb-12 glow-green"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          &gt; ABOUT_ME
          <span className="animate-blink">_</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-6"
          >
            {STATS.map(({ label, value, suffix }) => (
              <motion.div
                key={label}
                variants={itemVariants}
                className="border border-muted p-4 hover:border-primary transition-colors duration-300"
                style={{ imageRendering: "pixelated" }}
              >
                <div className="font-pixel text-3xl text-primary glow-green">
                  <CountUp to={value} inView={inView} />{suffix}
                </div>
                <div className="font-mono text-lg text-muted mt-1">{label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Terminal bio */}
          <div className="border border-muted p-4 font-mono text-lg bg-black/30 min-h-[240px]">
            <div className="flex gap-2 mb-3">
              <div className="w-2 h-2 rounded-none bg-accent" />
              <div className="w-2 h-2 rounded-none" style={{ backgroundColor: "#ffd700" }} />
              <div className="w-2 h-2 rounded-none bg-primary" />
            </div>
            {typedLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={line.startsWith("$") ? "text-primary" : "text-text-main"}
              >
                {line}
              </motion.p>
            ))}
            {typedLines.length < BIO_LINES.length && (
              <span className="text-primary animate-blink">_</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
