"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { PHOTOS } from "@/lib/site";
import { PoleGallery } from "./fx/poleGallery";

export function Photography({ onPick }: { onPick: (i: number) => void }) {
  const roomRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pick = useRef(onPick);
  pick.current = onPick;
  const [count, setCount] = useState(1);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (!roomRef.current || !canvasRef.current) return;
    const g = new PoleGallery(canvasRef.current, roomRef.current, PHOTOS, {
      onPick: (i) => pick.current(i),
      onCount: setCount,
      onProgress: (p) => {
        if (barRef.current) barRef.current.style.width = p * 100 + "%";
      },
    });
    if (!g.ok) setFallback(true);
    return () => g.destroy();
  }, []);

  const N = PHOTOS.length;
  if (fallback) {
    return (
      <section id="photography" className="pole-fallback" aria-label="Photography">
        {PHOTOS.map((s, i) => (
          <button key={s} type="button" onClick={() => onPick(i)} style={{ background: "none", border: 0, padding: 0, cursor: "pointer" }} aria-label={`Open photograph ${i + 1}`}>
            <img src={s} alt="" loading="lazy" />
          </button>
        ))}
      </section>
    );
  }
  return (
    <section id="photography" style={{ position: "relative" }}>
      <div ref={roomRef} className="pole" style={{ height: `calc(${120 + 30 * N}vh)` }}>
        <div className="stage">
          <div className="glow" />
          <div className="ttl">
            <div className="eyebrow">05 — Photography</div>
            <h2 className="disp big">
              Through the <span className="ital">lens</span>
            </h2>
          </div>
          <canvas ref={canvasRef} role="img" aria-label="Rotating gallery of street and architecture photographs. Scroll to turn it, click a photo to open it." />
          <div className="count" aria-hidden="true">
            {String(count).padStart(2, "0")} <span>/ {String(N).padStart(2, "0")}</span>
          </div>
          <div className="tip" aria-hidden="true">Scroll to turn · click a photo to open</div>
          <div className="bar" aria-hidden="true">
            <div ref={barRef} />
          </div>
        </div>
      </div>
      <button type="button" className="sr-only" onClick={() => onPick(count - 1)}>
        Open current photograph in viewer
      </button>
    </section>
  );
}
