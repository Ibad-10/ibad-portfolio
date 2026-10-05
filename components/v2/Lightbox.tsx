"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { PHOTOS } from "@/lib/site";

export function Lightbox({ index, setIndex }: { index: number; setIndex: (i: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index >= 0;
  const N = PHOTOS.length;

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(-1);
      if (e.key === "ArrowRight") setIndex((index + 1) % N);
      if (e.key === "ArrowLeft") setIndex((index - 1 + N) % N);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, N, setIndex]);

  if (!open) return null;
  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label="Photograph viewer" onClick={(e) => e.target === e.currentTarget && setIndex(-1)}>
      <img src={PHOTOS[index]} alt={`Photograph ${index + 1} of ${N} by Ibad Zuberi`} />
      <button type="button" className="nav-b l" aria-label="Previous photograph" onClick={(e) => { e.stopPropagation(); setIndex((index - 1 + N) % N); }}>←</button>
      <button type="button" className="nav-b r" aria-label="Next photograph" onClick={(e) => { e.stopPropagation(); setIndex((index + 1) % N); }}>→</button>
      <div className="info">{index + 1} / {N} · Esc to close</div>
      <button ref={closeRef} type="button" className="x" onClick={() => setIndex(-1)}>Close</button>
    </div>
  );
}
