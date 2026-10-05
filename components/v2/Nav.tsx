"use client";
import { useEffect, useRef, useState } from "react";
import { NAV } from "@/lib/site";
import { goTo } from "./scroll";
import { Roll } from "./Roll";

const IDS = ["hero", ...NAV.map((n) => n[0]), "contact"];

export function Progress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) ref.current.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div ref={ref} className="progress" aria-hidden="true" />;
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 80);
      let act = "hero";
      IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) act = id;
      });
      setActive(act);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenu(false);
    goTo(id);
  };

  return (
    <>
      <header className={`nav${scrolled ? " scrolled" : ""}`}>
        <a href="#hero" onClick={go("hero")} className="logo">
          <span className="dot" />
          Ibad<span className="ital">Zuberi</span>
        </a>
        <nav aria-label="Primary" className="nav-links">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={go(id)} className={active === id ? "on" : ""} aria-current={active === id ? "true" : undefined}>
              {label}
            </a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href="#contact" onClick={go("contact")} data-magnet="1" className="btn btn-w nav-cta rollhost">
            <Roll text="Let's Connect" />
          </a>
          <button className="burger" onClick={() => setMenu((m) => !m)} aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu}>
            {menu ? "×" : "≡"}
          </button>
        </div>
      </header>
      {menu && (
        <div className="menu" role="dialog" aria-modal="true" aria-label="Menu">
          {NAV.map(([id, label], i) => (
            <a key={id} href={`#${id}`} onClick={go(id)} className={`item${active === id ? " on" : ""}`}>
              <span className="num">0{i + 1}</span>
              {label}
            </a>
          ))}
          <a href="#contact" onClick={go("contact")} className="cta">
            Let&apos;s Connect
          </a>
        </div>
      )}
    </>
  );
}
