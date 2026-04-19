"use client";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

const COLORS = ["#00ff9f", "#ff2d78", "#00cfff", "#ffd700", "#ff8c00"];
const PIECES = 40;

export function Confetti() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [fired, setFired] = useState(false);

  useEffect(() => {
    if (inView && !fired) setFired(true);
  }, [inView, fired]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      {fired &&
        Array.from({ length: PIECES }).map((_, i) => {
          const color = COLORS[i % COLORS.length];
          const left = Math.random() * 100;
          const delay = Math.random() * 1.5;
          const dur = 1.5 + Math.random() * 1;
          const size = 4 + Math.floor(Math.random() * 3) * 2;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${left}%`,
                top: "30%",
                width: size,
                height: size,
                backgroundColor: color,
                boxShadow: `0 0 4px ${color}`,
                imageRendering: "pixelated",
                animation: `confettiFall ${dur}s ${delay}s ease-in forwards`,
              }}
            />
          );
        })}
    </div>
  );
}
