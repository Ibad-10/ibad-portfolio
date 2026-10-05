"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MODES, WORDS, type Mode } from "@/lib/site";
import { SandField } from "./fx/sand";
import { goTo } from "./scroll";
import { Roll } from "./Roll";

const css = (v: Record<string, string | number>) => v as CSSProperties;

function Sand() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const s = new SandField(ref.current);
    return () => s.destroy();
  }, []);
  return <div ref={ref} className="sandhost" aria-hidden="true" />;
}

export function Hero({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  const [word, setWord] = useState(0);
  const M = MODES[mode];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  const move = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--hx", e.clientX - r.left + "px");
    e.currentTarget.style.setProperty("--hy", e.clientY - r.top + "px");
  };

  return (
    <section id="hero" className="hero" onMouseMove={move}>
      <div className="spot" />
      <div className="glowbars" aria-hidden="true">
        {Array.from({ length: 15 }, (_, i) => {
          const d = Math.abs(i - 7);
          return <div key={i} style={{ height: 100 - d * 9 + "%", animationDelay: `${(i % 5) * 0.4 + d * 0.1}s` }} />;
        })}
      </div>
      <Sand />
      <div className="hero-stack">
        <div className="badge intro" style={css({ "--d": "300ms" })}>
          <span className="d" />
          Computer Systems Engineering · Brunel · London
        </div>
        <h1 className="disp h1">
          <span className="line split-line" style={css({ "--i": 0 })}>
            Ibad Ullah <span className="ital">Zuberi</span>
          </span>
          <span className="line dim split-line" style={css({ "--i": 1 })}>
            builds{" "}
            <span className="ital word" aria-live="off">
              <span key={word}>{WORDS[word]}</span>
            </span>
          </span>
        </h1>
        <p className="lead intro" style={css({ "--d": "520ms" })}>
          {M.line}
        </p>
        <div className="modes intro" data-mode={mode} role="group" aria-label="Portfolio focus" style={css({ "--d": "630ms" })}>
          <div className="thumb" />
          <button type="button" aria-pressed={mode === "software"} onClick={() => setMode("software")}>
            Software
          </button>
          <button type="button" aria-pressed={mode === "electronics"} onClick={() => setMode("electronics")}>
            Electronics
          </button>
        </div>
        <div className="btn-row intro" style={css({ "--d": "740ms" })}>
          <a
            href="#work"
            data-magnet="1"
            className="btn btn-w rollhost"
            onClick={(e) => {
              e.preventDefault();
              goTo("work");
            }}
          >
            <Roll text="View work" />
            <span aria-hidden="true">↓</span>
          </a>
          <a href={M.cv.href} download={M.cv.file} data-magnet="1" className="btn btn-o">
            <span>{M.cv.label}</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="hint intro" style={css({ "--d": "850ms" })}>
        <span className="d" />
        Move your cursor to pour sand · click to scatter it
      </div>
    </section>
  );
}
