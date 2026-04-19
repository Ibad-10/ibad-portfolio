"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface PixelProgressBarProps {
  label: string;
  value: number;
  color?: string;
}

export function PixelProgressBar({ label, value, color = "#00ff9f" }: PixelProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between mb-1 font-mono text-lg">
        <span style={{ color }}>{label}</span>
        <span className="text-muted">{value}%</span>
      </div>
      <div className="h-3 bg-muted/30 border border-muted" style={{ imageRendering: "pixelated" }}>
        <motion.div
          className="h-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
          initial={{ width: "0%" }}
          animate={inView ? { width: `${value}%` } : { width: "0%" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}
