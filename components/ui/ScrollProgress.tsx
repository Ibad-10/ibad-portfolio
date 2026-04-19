"use client";
import { useScroll, useSpring, motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[9996] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #00ff9f, #00cfff, #ff2d78)",
        boxShadow: "0 0 8px #00ff9f",
      }}
    />
  );
}
