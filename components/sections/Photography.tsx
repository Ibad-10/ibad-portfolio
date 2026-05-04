"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Lightbox } from "@/components/ui/Lightbox";

const PHOTOS = Array.from({ length: 39 }, (_, i) => ({
  src: `/lightroom/photo-${String(i + 1).padStart(2, "0")}.jpeg`,
  alt: `Photography ${i + 1}`,
}));

const VISIBLE = 5; // cards visible in stack

function getCardStyle(offset: number, total: number) {
  // offset: 0 = front, positive = behind
  const absOff = Math.abs(offset);
  const sign = offset < 0 ? -1 : 1;

  if (absOff > Math.floor(VISIBLE / 2)) return null; // hidden

  const depth = absOff / VISIBLE;
  const scale = 1 - depth * 0.12;
  const translateX = sign * absOff * 60;
  const translateY = absOff * 8;
  const rotateY = sign * absOff * -6;
  const opacity = 1 - depth * 0.5;
  const zIndex = total - absOff;

  return { scale, translateX, translateY, rotateY, opacity, zIndex };
}

export function Photography() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<null | (typeof PHOTOS)[0]>(null);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % PHOTOS.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + PHOTOS.length) % PHOTOS.length), []);

  // Auto-advance
  useEffect(() => {
    autoRef.current = setInterval(next, 3500);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [next]);

  function resetAuto() {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 3500);
  }

  function handleDragStart(x: number) {
    setDragging(true);
    dragStart.current = x;
  }

  function handleDragEnd(x: number) {
    setDragging(false);
    const delta = dragStart.current - x;
    if (Math.abs(delta) > 40) {
      delta > 0 ? next() : prev();
      resetAuto();
    }
  }

  const half = Math.floor(VISIBLE / 2);

  return (
    <section id="photography" ref={ref} className="bg-[#050505] px-6 md:px-12 py-24 overflow-hidden">
      <motion.p
        className="section-label mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
      >
        [ 06 ] — Through the Lens
      </motion.p>

      <div className="flex items-center justify-between mb-12">
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

      {/* Carousel stage */}
      <motion.div
        className="relative flex items-center justify-center select-none"
        style={{ height: "clamp(280px, 50vw, 520px)", perspective: "1200px" }}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.7 }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseUp={(e) => handleDragEnd(e.clientX)}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
      >
        {Array.from({ length: VISIBLE }, (_, i) => {
          const offset = i - half;
          const photoIdx = (current + offset + PHOTOS.length) % PHOTOS.length;
          const photo = PHOTOS[photoIdx];
          const style = getCardStyle(offset, VISIBLE);
          if (!style) return null;

          return (
            <motion.div
              key={`${photoIdx}-${current}`}
              className="absolute"
              style={{
                zIndex: style.zIndex,
                width: "clamp(180px, 28vw, 360px)",
                height: "clamp(240px, 38vw, 480px)",
              }}
              animate={{
                x: style.translateX,
                y: style.translateY,
                scale: style.scale,
                rotateY: style.rotateY,
                opacity: style.opacity,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              onClick={() => {
                if (offset === 0 && !dragging) {
                  setLightbox(photo);
                } else if (!dragging) {
                  offset > 0 ? next() : prev();
                  resetAuto();
                }
              }}
              whileHover={offset === 0 ? { scale: style.scale * 1.02 } : {}}
            >
              <div
                className="relative w-full h-full overflow-hidden"
                style={{
                  border: offset === 0 ? "1px solid rgba(255,77,45,0.4)" : "1px solid rgba(255,255,255,0.04)",
                  boxShadow: offset === 0
                    ? "0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,77,45,0.2)"
                    : "0 20px 60px rgba(0,0,0,0.6)",
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 60vw, 30vw"
                  draggable={false}
                />
                {/* Front card overlay on hover */}
                {offset === 0 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <p className="font-mono text-[9px] text-white/60 tracking-widest uppercase">
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
      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          onClick={() => { prev(); resetAuto(); }}
          className="font-mono text-[11px] text-[#444] hover:text-white tracking-widest uppercase border border-white/5 hover:border-white/20 px-5 py-2 transition-all duration-200"
        >
          ← PREV
        </button>

        {/* Dot strip — show 7 around current */}
        <div className="flex items-center gap-1.5">
          {PHOTOS.map((_, i) => {
            const dist = Math.abs(i - current);
            const wrapped = Math.min(dist, PHOTOS.length - dist);
            if (wrapped > 4) return null;
            return (
              <button
                key={i}
                onClick={() => { setCurrent(i); resetAuto(); }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 20 : 5,
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
