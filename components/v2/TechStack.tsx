"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { MODES, iconUrl, mono, type Mode } from "@/lib/site";
import { Heading } from "./Heading";
import { scrollToEl } from "./scroll";
import { useBrokenImages } from "./useBrokenImages";

export function TechStack({ mode }: { mode: Mode }) {
  const M = MODES[mode];
  const keys = Object.keys(M.skills);
  const [cat, setCat] = useState(0);
  const root = useRef<HTMLElement>(null);
  useBrokenImages(root, [mode]);
  const all = useMemo(() => Array.from(new Set(Object.values(M.skills).flat())), [M]);
  const half = Math.ceil(all.length / 2);
  const rows: [string[], boolean][] = [[all.slice(0, half), false], [all.slice(half), true]];

  useEffect(() => {
    const on = () => {
      let c = 0;
      document.querySelectorAll<HTMLElement>("[data-cat]").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.45) c = Number(el.dataset.cat);
      });
      setCat(c);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [mode]);

  const pill = (n: string, i: number) => (
    <span className="pill" key={n + i}>
      {iconUrl(n) ? <img src={iconUrl(n)} alt="" /> : <span className="d" />}
      {n}
    </span>
  );

  return (
    <section id="skills" className="skills" ref={root}>
      <div className="skills-head">
        <div className="col" style={{ gap: 20 }}>
          <div className="eyebrow rv">04 — Tech stack</div>
          <Heading parts={["Tools of the ", { i: "trade" }]} className="h-xl" />
        </div>
        <p className="sub rv">{M.stackLine}</p>
      </div>
      <div className="marquees" aria-hidden="true">
        {rows.map(([items, rev], r) => (
          <div key={`${mode}-${r}`} className={`mrow${rev ? " rev" : ""}`} style={{ animationDuration: `${30 + items.length}s` }}>
            {items.concat(items).map(pill)}
          </div>
        ))}
      </div>
      <div className="split">
        <nav className="cats" aria-label="Skill categories">
          {keys.map((k, i) => (
            <a
              key={k}
              href={`#cat-${i}`}
              className={cat === i ? "on" : ""}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(`cat-${i}`);
                if (el) scrollToEl(el, -110, 1.2);
              }}
            >
              <span className="dot" />
              {k}
              <span className="count">{M.skills[k].length}</span>
            </a>
          ))}
        </nav>
        <div className="blocks">
          {keys.map((k, i) => (
            <div key={`${mode}-${k}`} id={`cat-${i}`} data-cat={i} className="block">
              <div className="ttl">
                <span className="nn">0{i + 1}</span>
                <h3 className="disp" style={{ fontSize: 32, letterSpacing: "-0.04em" }}>{k}</h3>
              </div>
              <ul className="tiles">
                {M.skills[k].map((n, j) => (
                  <li className="tile" key={n} style={{ animationDelay: `${j * 60}ms` } as CSSProperties}>
                    <div className="ic" aria-hidden="true">
                      <span className="mono">{mono(n)}</span>
                      {iconUrl(n) && <img src={iconUrl(n)} alt="" loading="lazy" />}
                    </div>
                    <span className="nm">{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
