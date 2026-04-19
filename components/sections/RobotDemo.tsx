"use client";
import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

export function RobotDemo() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rx = useSpring(useTransform(mouseY, [0, 1], [4, -4]), { stiffness: 100, damping: 30 });
  const ry = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), { stiffness: 100, damping: 30 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <section id="robot" ref={ref} className="snap-section flex items-center bg-bg px-6 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <motion.h2
          className="font-pixel text-primary text-lg md:text-2xl mb-4 glow-green"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          &gt; OBJECT_RETRIEVER_BOT<span className="animate-blink">_</span>
        </motion.h2>
        <motion.p
          className="font-mono text-xl text-muted mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          Autonomous robot that detects and retrieves objects using computer vision + Raspberry Pi
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          onMouseMove={handleMove}
          onMouseLeave={() => { mouseX.set(0.5); mouseY.set(0.5); }}
        >
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" as const, perspective: 1000 }}
            className="relative"
          >
            {/* Monitor outer frame */}
            <div
              className="border-4 p-2 relative"
              style={{
                borderColor: "#3a3a4a",
                boxShadow: "0 0 30px #00ff9f20, inset 0 0 20px #00000060",
                background: "#0a0a0f",
              }}
            >
              {/* Monitor top bar */}
              <div className="flex gap-2 p-2 border-b border-muted mb-2 items-center">
                <div className="w-2 h-2 bg-accent" />
                <div className="w-2 h-2" style={{ backgroundColor: "#ffd700" }} />
                <div className="w-2 h-2 bg-primary" />
                <span className="font-pixel text-[7px] text-muted ml-2">robot_demo.mp4</span>
              </div>

              {/* Video with scanlines overlay */}
              <div className="relative overflow-hidden">
                <video
                  src="/robot-demo.mp4"
                  controls
                  muted
                  loop
                  className="w-full block"
                  style={{ display: "block", maxHeight: "60vh" }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)",
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 60px rgba(0, 255, 159, 0.08)" }}
                />
              </div>
            </div>

            {/* Monitor stand */}
            <div className="flex justify-center">
              <div className="w-16 h-4 border border-t-0 border-muted" />
            </div>
            <div className="flex justify-center">
              <div className="w-24 h-2 border border-t-0 border-muted" />
            </div>
          </motion.div>
        </motion.div>

        {/* Tech badges */}
        <motion.div
          className="flex flex-wrap gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          {["Raspberry Pi", "Computer Vision", "Python", "OpenCV", "Servo Motors"].map((tech) => (
            <span
              key={tech}
              className="font-mono text-base px-3 py-1 border border-primary/40 text-primary/80"
              style={{ boxShadow: "0 0 6px #00ff9f20" }}
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
