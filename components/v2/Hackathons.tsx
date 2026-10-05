"use client";
import { useState } from "react";
import { HACKS } from "@/lib/site";
import { Heading } from "./Heading";

export function Hackathons() {
  const [open, setOpen] = useState(0);
  return (
    <section id="hackathons" className="hacks">
      <div className="eyebrow rv">03 — Hackathons</div>
      <Heading parts={["Three firsts, one ", { i: "third" }, ", one final."]} className="h2" />
      <div className="hack-list rv">
        {HACKS.map((h, i) => (
          <div key={h.event} className={`acc-item${open === i ? " open" : ""}`}>
            <button type="button" className="hack-head" aria-expanded={open === i} aria-controls={`hack-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
              <span className={`place${h.place === "1st" ? " first" : ""}`}>{h.place}</span>
              <span className="ev">{h.event}</span>
              <span className="dt">{h.date}</span>
              <span className="chev" aria-hidden="true">⌄</span>
            </button>
            <div className="acc-body hack-body" id={`hack-${i}`} role="region" aria-label={`${h.event} details`}>
              <div>
                <p>
                  <b>{h.project}.</b> {h.desc}
                </p>
                <div className="gh">
                  <a href={h.gh} target="_blank" rel="noopener noreferrer">View on GitHub ↗</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
