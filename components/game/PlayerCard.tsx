"use client";
import { useRef } from "react";
import { profile } from "@/lib/data";

const FACTS = [
  { value: "1st", label: "of 30" },
  { value: "27", label: "KPIs" },
  { value: "4", label: "podiums" },
];

/** CSS-3D tilting player card (no WebGL needed, so it works everywhere). */
export function PlayerCard() {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${px * 22}deg`);
    el.style.setProperty("--rx", `${-py * 22}deg`);
    el.style.setProperty("--sx", `${(px + 0.5) * 100}%`);
  }
  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--sx", "50%");
  }

  return (
    <div style={{ perspective: 900 }} className="mx-auto w-full max-w-[300px]">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        role="img"
        aria-label={`Player card for ${profile.name}: ranked 1st of 30, 27 KPIs delivered, 4 hackathon podiums`}
        className="relative aspect-[3/4] overflow-hidden rounded-3xl border-2 border-gold/80 bg-gradient-to-b from-[#16264b] via-[#0f1a35] to-[#080d1a] p-5 text-[#F2F5FA] shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-transform duration-150 ease-out"
        style={{ transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))", transformStyle: "preserve-3d" }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60" style={{ background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.22) var(--sx,50%), transparent 70%)" }} />
        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-display text-5xl font-bold leading-none text-[#E6B84C]">CSE</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-[#B8C2D6]">Engineer</p>
            </div>
            <p className="text-right text-[10px] uppercase tracking-widest text-[#B8C2D6]">Brunel<br />London</p>
          </div>
          <div aria-hidden="true" className="my-4 flex flex-1 items-center justify-center">
            <span className="font-display text-[8rem] font-bold leading-none text-white/10">IZ</span>
          </div>
          <div className="border-t border-[#E6B84C]/50 pt-3">
            <p className="text-center font-display text-3xl font-bold uppercase tracking-wide">{profile.shortName}</p>
            <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
              {FACTS.map((f) => (
                <div key={f.label}>
                  <dd className="font-display text-2xl font-bold text-[#E6B84C]">{f.value}</dd>
                  <dt className="text-[10px] uppercase tracking-widest text-[#B8C2D6]">{f.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
