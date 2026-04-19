"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export function EasterEgg() {
  const seqRef = useRef<string[]>([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const next = [...seqRef.current, e.key].slice(-KONAMI.length);
      seqRef.current = next;
      if (next.join(",") === KONAMI.join(",")) {
        setActive(true);
        setTimeout(() => setActive(false), 3000);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[9995] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full h-full overflow-hidden">
            {Array.from({ length: 80 }).map((_, i) => {
              const color = ["#00ff9f","#ff2d78","#00cfff","#ffd700"][i % 4];
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: 8,
                    height: 8,
                    backgroundColor: color,
                    boxShadow: `0 0 8px ${color}`,
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 3, 0],
                    opacity: [1, 1, 0],
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 400,
                  }}
                  transition={{ duration: 2, delay: Math.random() * 0.5 }}
                />
              );
            })}
            <motion.p
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-pixel text-primary text-sm text-center glow-green"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              CHEAT CODE<br />ACTIVATED!
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
