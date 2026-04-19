"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const TRAIL_LENGTH = 8;

export function PixelCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailId = useRef(0);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const p = { x: e.clientX, y: e.clientY };
      setPos(p);
      setTrail((prev) => {
        const next = [{ ...p, id: trailId.current++ }, ...prev].slice(0, TRAIL_LENGTH);
        return next;
      });
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {trail.map((dot, i) => (
        <div
          key={dot.id}
          className="pointer-events-none fixed z-[9999] rounded-none"
          style={{
            left: dot.x - 2,
            top: dot.y - 2,
            width: 4,
            height: 4,
            backgroundColor: `rgba(0, 255, 159, ${1 - i / TRAIL_LENGTH})`,
            imageRendering: "pixelated",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      <motion.div
        className="pointer-events-none fixed z-[9999]"
        style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
        animate={{ x: 0, y: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.2 }}
      >
        <div className="relative w-5 h-5">
          <div className="absolute top-0 left-2 w-1 h-2 bg-primary" />
          <div className="absolute bottom-0 left-2 w-1 h-2 bg-primary" />
          <div className="absolute left-0 top-2 w-2 h-1 bg-primary" />
          <div className="absolute right-0 top-2 w-2 h-1 bg-primary" />
          <div className="absolute top-2 left-2 w-1 h-1 bg-accent" />
        </div>
      </motion.div>
    </>
  );
}
