"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Lightbox } from "@/components/ui/Lightbox";

const PHOTOS = Array.from({ length: 39 }, (_, i) => ({
  src: `/lightroom/photo-${String(i + 1).padStart(2, "0")}.jpeg`,
  alt: `Photography ${i + 1}`,
}));

export function Photography() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<null | (typeof PHOTOS)[0]>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStart = useRef(0);
  const didDrag = useRef(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % PHOTOS.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + PHOTOS.length) % PHOTOS.length), []);

  useEffect(() => {
    autoRef.current = setInterval(next, 4000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { next(); resetAuto(); }
      if (e.key === "ArrowLeft")  { prev(); resetAuto(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  function resetAuto() {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 4000);
  }

  // Precompute indices for the visible strip: prev2, prev1, current, next1, next2
  const indices = [-2, -1, 0, 1, 2].map(
    (o) => (current + o + PHOTOS.length) % PHOTOS.length
  );

  const CARD_CONFIGS = [
    // [xPercent, scale, opacity, zIndex, blur]
    { x: "-72%", scale: 0.72, opacity: 0.35, z: 1, blur: "blur(2px)" },
    { x: "-38%", scale: 0.86, opacity: 0.65, z: 2, blur: "blur(1px)" },
    { x: "0%",   scale: 1,    opacity: 1,    z: 3, blur: "none" },
    { x: "38%",  scale: 0.86, opacity: 0.65, z: 2, blur: "blur(1px)" },
    { x: "72%",  scale: 0.72, opacity: 0.35, z: 1, blur: "blur(2px)" },
  ];

  return (
    <section id="photography" ref={ref} className="bg-[#050505] py-24 overflow-hidden">
      <div className="px-6 md:px-12">
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
        >
          [ 06 ] — Through the Lens
        </motion.p>

        <div className="flex items-center justify-between mb-10">
          <motion.p
            className="font-mono text-[11px] text-[#444] tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.15 }}
          >
            Street · Architecture · London
          </motion.p>
          <span className="font-mono text-[10px] text-[#333] tracking-widest">
            {String(current + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Carousel — full width, no side padding */}
      <motion.div
        className="relative w-full flex items-center justify-center"
        style={{ height: "clamp(340px, 55vw, 680px)" }}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.7 }}
        onMouseDown={(e) => { dragStart.current = e.clientX; didDrag.current = false; }}
        onMouseMove={(e) => { if (Math.abs(e.clientX - dragStart.current) > 8) didDrag.current = true; }}
        onMouseUp={(e) => {
          if (!didDrag.current) return;
          const delta = dragStart.current - e.clientX;
          if (Math.abs(delta) > 40) { delta > 0 ? next() : prev(); resetAuto(); }
        }}
        onTouchStart={(e) => { dragStart.current = e.touches[0].clientX; didDrag.current = false; }}
        onTouchMove={(e) => { if (Math.abs(e.touches[0].clientX - dragStart.current) > 8) didDrag.current = true; }}
        onTouchEnd={(e) => {
          const delta = dragStart.current - e.changedTouches[0].clientX;
          if (Math.abs(delta) > 40) { delta > 0 ? next() : prev(); resetAuto(); }
        }}
      >
        {indices.map((photoIdx, slot) => {
          const cfg = CARD_CONFIGS[slot];
          const isCenter = slot === 2;
          const photo = PHOTOS[photoIdx];

          return (
            <motion.div
              key={`${photoIdx}-${slot}`}
              className="absolute top-0 bottom-0 flex items-center justify-center"
              style={{ width: "clamp(240px, 38vw, 560px)", zIndex: cfg.z }}
              animate={{
                x: cfg.x,
                scale: cfg.scale,
                opacity: cfg.opacity,
                filter: cfg.blur,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 32 }}
              onClick={() => {
                if (!didDrag.current) {
                  if (isCenter) setLightbox(photo);
                  else { slot < 2 ? prev() : next(); resetAuto(); }
                }
              }}
            >
              {/* Card — natural height, image uncropped */}
              <div
                className="w-full relative overflow-hidden"
                style={{
                  background: "#0a0a0a",
                  border: "none",
                  boxShadow: isCenter
                    ? "0 40px 100px rgba(0,0,0,0.85)"
                    : "0 20px 60px rgba(0,0,0,0.6)",
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={900}
                  height={1200}
                  className="w-full h-auto object-contain block"
                  style={{ maxHeight: "clamp(320px, 50vw, 640px)" }}
                  draggable={false}
                  priority={isCenter}
                />
                {isCenter && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="font-mono text-[9px] text-white/50 tracking-widest uppercase">
                      Click to expand
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-10 px-6">
        <button
          onClick={() => { prev(); resetAuto(); }}
          className="font-mono text-[11px] text-[#444] hover:text-white tracking-widest uppercase border border-white/5 hover:border-white/20 px-5 py-2 transition-all duration-200"
        >
          ← PREV
        </button>

        {/* Dot indicators — condensed */}
        <div className="flex items-center gap-1.5 overflow-hidden max-w-[160px]">
          {PHOTOS.map((_, i) => {
            const dist = Math.min(Math.abs(i - current), PHOTOS.length - Math.abs(i - current));
            if (dist > 5) return null;
            return (
              <button
                key={i}
                onClick={() => { setCurrent(i); resetAuto(); }}
                className="rounded-full flex-shrink-0 transition-all duration-300"
                style={{
                  width: i === current ? 18 : 5,
                  height: 5,
                  background: i === current ? "#FF4D2D" : "rgba(255,255,255,0.15)",
                }}
              />
            );
          })}
        </div>

        <button
          onClick={() => { next(); resetAuto(); }}
          className="font-mono text-[11px] text-[#444] hover:text-white tracking-widest uppercase border border-white/5 hover:border-white/20 px-5 py-2 transition-all duration-200"
        >
          NEXT →
        </button>
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            src={lightbox.src}
            alt={lightbox.alt}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
