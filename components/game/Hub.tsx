"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BootScreen, bootAlreadySeen } from "./BootScreen";
import { useMode } from "@/components/mode/ModeProvider";
import { education, experience, profile } from "@/lib/data";

type Tile = { id: string; label: string; blurb: string; href?: string };

const TILES: Tile[] = [
  { id: "transfers", label: "Transfers", blurb: "BMW, EY, Cloud Nebula: my career so far", href: "/transfers" },
  { id: "matches", label: "Match Centre", blurb: "Projects, results and hackathon fixtures", href: "/matches" },
  { id: "recruiter", label: "Recruiter view", blurb: "A clean one-page CV, printable", href: "/recruiter" },
  { id: "trophies", label: "Trophy Room", blurb: "Hackathon wins", href: "/trophies" },
  { id: "training", label: "Training Ground", blurb: "Skills and attributes", href: "/training" },
  { id: "squad", label: "Squad", blurb: "About me", href: "/squad" },
  { id: "media", label: "Media", blurb: "Photography", href: "/media" },
  { id: "play", label: "Penalty Shootout", blurb: "Beat the keeper: 5 kicks", href: "/play" },
  { id: "contact", label: "Contact", blurb: "Get in touch", href: "/contact" },
];

export function Hub() {
  const { ready } = useMode();
  const [booting, setBooting] = useState(false);
  const gridRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!ready) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setBooting(!bootAlreadySeen() && !reduce);
  }, [ready]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      const items = Array.from(gridRef.current?.querySelectorAll<HTMLElement>("[data-tile]") ?? []);
      if (items.length === 0) return;
      const cols = window.matchMedia("(min-width: 768px)").matches ? 4 : 2;
      const current = items.indexOf(document.activeElement as HTMLElement);
      let next = current < 0 ? 0 : current;
      if (current >= 0) {
        if (e.key === "ArrowRight") next = Math.min(items.length - 1, current + 1);
        if (e.key === "ArrowLeft") next = Math.max(0, current - 1);
        if (e.key === "ArrowDown") next = Math.min(items.length - 1, current + cols);
        if (e.key === "ArrowUp") next = Math.max(0, current - cols);
      }
      e.preventDefault();
      items[next].focus();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const bmw = experience[0];
  return (
    <>
      {booting && <BootScreen onDone={() => setBooting(false)} />}
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:px-6 md:py-16 lg:grid-cols-[320px_1fr]">
        <section aria-labelledby="hub-title" className="rounded-2xl border border-line/10 bg-panel/80 p-6 backdrop-blur">
          <p className="eyebrow">Player profile</p>
          <h1 id="hub-title" className="mt-2 font-display text-4xl font-bold uppercase leading-tight tracking-wide">
            {profile.name}
          </h1>
          <p className="mt-2 text-sm text-muted">{profile.degree}</p>
          <dl className="mt-5 space-y-3 text-sm">
            <div><dt className="eyebrow">Club</dt><dd>{education.school}</dd></div>
            <div><dt className="eyebrow">Standing</dt><dd>{profile.standing}</dd></div>
            <div><dt className="eyebrow">Last spell</dt><dd>{bmw.club}, {bmw.note}</dd></div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.cvs.map((c) => (
              <a key={c.href} href={c.href} className="inline-block rounded-full border border-line/20 px-4 py-2 text-sm font-semibold hover:border-blue">
                {c.label}
              </a>
            ))}
          </div>
        </section>

        <section aria-label="Menu">
          <ul ref={gridRef} className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {TILES.map((t, i) => {
              const active = Boolean(t.href);
              const big = i < 2;
              const base = `group relative flex min-h-[9rem] flex-col justify-end rounded-xl border bg-panel/85 p-4 text-left backdrop-blur transition focus-visible:-translate-y-1 focus-visible:scale-[1.03] ${big ? "md:col-span-2 md:min-h-[12rem]" : ""}`;
              return (
                <li key={t.id} className={big ? "col-span-2" : ""}>
                  {active ? (
                    <Link
                      href={t.href!}
                      data-tile
                      className={`${base} border-line/15 hover:-translate-y-1 hover:scale-[1.03] hover:border-blue hover:shadow-[0_0_30px_rgb(var(--blue)/0.35)] focus-visible:border-blue focus-visible:shadow-[0_0_30px_rgb(var(--blue)/0.35)]`}
                    >
                      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 rounded-t-xl bg-blue" />
                      <span className="font-display text-3xl font-bold uppercase tracking-wide">{t.label}</span>
                      <span className="mt-1 text-sm text-muted">{t.blurb}</span>
                    </Link>
                  ) : (
                    <div data-tile tabIndex={0} aria-disabled="true" className={`${base} cursor-not-allowed border-line/10 opacity-60`}>
                      <span className="font-display text-2xl font-bold uppercase tracking-wide">{t.label}</span>
                      <span className="mt-1 text-sm text-muted">{t.blurb}</span>
                      <span className="mt-2 text-xs uppercase tracking-widest text-gold">Coming soon</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </>
  );
}
