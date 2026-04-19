"use client";
import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { BackgroundBeams } from "@/components/aceternity/BackgroundBeams";
import { MovingBorder } from "@/components/aceternity/MovingBorder";
import { GlitchText } from "@/components/ui/GlitchText";
import { TypewriterText } from "@/components/ui/TypewriterText";

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  dur: 6 + Math.random() * 6,
  size: 2 + Math.floor(Math.random() * 2) * 2,
}));

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), { stiffness: 100, damping: 30 });
  const bgX = useTransform(mouseX, [0, 1], [-20, 20]);
  const bgY = useTransform(mouseY, [0, 1], [-20, 20]);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="snap-section relative flex flex-col items-center justify-center overflow-hidden bg-bg"
    >
      <BackgroundBeams className="z-0" />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0 pointer-events-none"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.id % 3 === 0 ? "#00ff9f" : p.id % 3 === 1 ? "#00cfff" : "#ff2d78",
            imageRendering: "pixelated",
            animation: `floatUp ${p.dur}s ${p.delay}s linear infinite`,
            boxShadow: `0 0 6px currentColor`,
          }}
        />
      ))}

      {/* Main content with parallax */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" as const }}
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <GlitchText
            text="IBAD"
            as="h1"
            className="text-primary glow-green"
            style={{ fontSize: "clamp(3rem, 12vw, 9rem)", lineHeight: "1.1" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-4"
        >
          <TypewriterText
            words={["CS Student", "Builder", "Hacker", "Robot Maker", "3× Hackathon Winner"]}
            className="font-mono text-2xl md:text-4xl text-secondary"
            prefix="> "
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-wrap gap-4 mt-10 justify-center"
        >
          <MovingBorder
            containerClassName="h-12 w-44"
            className="font-pixel text-[9px] text-primary border-primary/50 hover:bg-primary/10"
            borderClassName="bg-primary"
            onClick={() => scrollTo("projects")}
          >
            [ VIEW PROJECTS ]
          </MovingBorder>
          <a href="/Ibad_CV.pdf" download>
            <MovingBorder
              containerClassName="h-12 w-44"
              className="font-pixel text-[9px] text-accent border-accent/50 hover:bg-accent/10"
              borderClassName="bg-accent"
            >
              [ DOWNLOAD CV ]
            </MovingBorder>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-pixel text-[8px] text-muted flex flex-col items-center gap-2"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>SCROLL</span>
        <div className="w-2 h-2 bg-primary animate-[pixelBounce_1s_steps(4)_infinite]" />
      </motion.div>

      {/* Parallax bg layer */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary opacity-30" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent opacity-30" />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-secondary opacity-30" />
      </motion.div>
    </section>
  );
}
