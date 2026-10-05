"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { EXPERIENCE, MODES, type Mode } from "@/lib/site";
import { Heading } from "./Heading";

export function About({ mode }: { mode: Mode }) {
  const [open, setOpen] = useState(0);
  const items = EXPERIENCE(MODES[mode]);
  return (
    <section id="about" className="about">
      <div className="about-grid">
        <div className="col">
          <div className="eyebrow rv">01 — About</div>
          <Heading parts={["Builder by nature, ", { i: "hacker" }, " by choice."]} className="h2" />
          <p className="body rv">
            Final-year Computer Systems Engineering student at Brunel, <b>ranked 1st of 30 with First Class marks in both years</b>. I spent my placement year at BMW Group writing PLC logic and building logistics dashboards, after a summer at EY in data analysis. Outside of that I build at hackathons, and have won three of them.
          </p>
          <div className="acc rv">
            {items.map((e, i) => (
              <div key={e.company} className={`acc-item${open === i ? " open" : ""}`}>
                <button type="button" className="acc-head" aria-expanded={open === i} aria-controls={`exp-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
                  <span className="t">
                    <b>{e.company}</b>
                    <small>{e.role}</small>
                  </span>
                  <span className="per">{e.period}</span>
                  <span className="plus" aria-hidden="true">+</span>
                </button>
                <div className="acc-body" id={`exp-${i}`} role="region" aria-label={`${e.company} details`}>
                  <div>
                    <ul>
                      {e.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <div className="chips">
                      {e.tech.map((t) => (
                        <span className="chip" key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="photos rv">
          <div className="photo" data-tilt="1">
            <img src="/photos/hero.jpeg" alt="Ibad Ullah Zuberi" />
          </div>
          <div className="photo" data-tilt="1">
            <img src="/photos/hackathon.jpeg" alt="Ibad at a hackathon" />
          </div>
          <div className="tags">
            <span className="tag">Course Representative</span>
            <span className="tag">IET member</span>
            <span className="tag">DSS Brunel</span>
          </div>
        </div>
      </div>
    </section>
  );
}
