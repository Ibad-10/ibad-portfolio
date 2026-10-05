"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { MODES, PROJECTS, type Mode, type Project } from "@/lib/site";
import { Heading } from "./Heading";
import { useBrokenImages } from "./useBrokenImages";
import { LightLines } from "./fx/lightLines";

function Lines() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const l = new LightLines(ref.current);
    return () => l.destroy();
  }, []);
  return <div ref={ref} className="ll-inner" style={{ position: "absolute", inset: 0 }} aria-hidden="true" />;
}

function Card({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(0);
  const imgs = p.imgs ?? [];

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", x + "px");
    el.style.setProperty("--my", y + "px");
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y / r.height) * 4}deg) rotateY(${(x / r.width - 0.5) * 4}deg) translateY(-4px)`;
    if (imgs.length > 1) {
      const shot = el.querySelector<HTMLElement>("[data-shot]");
      if (!shot) return;
      const sr = shot.getBoundingClientRect();
      const idx = Math.max(0, Math.min(imgs.length - 1, Math.floor(((e.clientX - sr.left) / sr.width) * imgs.length)));
      setK(idx);
    }
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
    setK(0);
  };

  return (
    <div ref={ref} className="card" onMouseMove={move} onMouseLeave={leave} style={{ animationDelay: `${i * 60}ms` } as CSSProperties}>
      {imgs.length > 0 && (
        <div className="shot" data-shot="1" style={{ background: p.imgBg ?? "#111" }}>
          {imgs.map((src, j) => (
            <img
              key={src}
              src={src}
              alt={j === 0 ? `${p.name} screenshot` : ""}
              loading="lazy"
              referrerPolicy="no-referrer"
              style={{ objectFit: p.fit ?? "cover", opacity: j === k ? 1 : 0, transform: j === k && imgs.length > 1 ? "scale(1.04)" : undefined }}
            />
          ))}
          {imgs.length > 1 && (
            <div className="segs" aria-hidden="true">
              {imgs.map((_, j) => (
                <span key={j} className={j === k ? "on" : ""} />
              ))}
            </div>
          )}
          {p.video && (
            <a href={p.video} target="_blank" rel="noopener noreferrer" className="watch">
              ▶ Watch demo
            </a>
          )}
        </div>
      )}
      <div className="meta">
        <span className={`badge2${p.gold ? " gold" : ""}`}>{p.badge}</span>
        <span className="date">{p.date}</span>
      </div>
      <h3 className="disp">{p.name}</h3>
      <p>{p.desc}</p>
      <div className="chips">
        {p.tags.map((t) => (
          <span className="chip" key={t}>{t}</span>
        ))}
      </div>
      {(p.gh || p.video || p.live) && (
        <div className="links">
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-blue">
              Visit getpegboard.co.uk ↗
            </a>
          )}
          {p.gh && (
            <a href={p.gh} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-w">
              GitHub ↗
            </a>
          )}
          {p.video && (
            <a href={p.video} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-o">
              Demo video ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export function Works({ mode }: { mode: Mode }) {
  const M = MODES[mode];
  const [filter, setFilter] = useState("All");
  const root = useRef<HTMLElement>(null);
  useBrokenImages(root, [mode, filter]);
  const cats = useMemo(() => ["All", ...Array.from(new Set(M.projects.map((k) => PROJECTS[k].cat)))], [M]);
  useEffect(() => setFilter("All"), [mode]);
  const list = M.projects.map((k) => PROJECTS[k]).filter((p) => filter === "All" || p.cat === filter);

  return (
    <section id="work" className="work" ref={root}>
      <div className="ll">
        <Lines />
      </div>
      <div className="fade" />
      <div className="work-in">
        <div className="sec-head">
          <div className="col" style={{ gap: 20 }}>
            <div className="eyebrow rv">02 — {M.label} work</div>
            <Heading parts={["Selected ", { i: "Works" }]} className="h-xl" />
          </div>
          <div className="filters rv" role="group" aria-label="Filter projects">
            {cats.map((c) => (
              <button type="button" key={c} aria-pressed={filter === c} onClick={() => setFilter(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="grid">
          {list.map((p, i) => (
            <Card key={`${mode}-${filter}-${p.name}`} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
