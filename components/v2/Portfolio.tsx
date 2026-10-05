"use client";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import type { Mode } from "@/lib/site";
import { lenisRef } from "./scroll";
import { Nav, Progress } from "./Nav";
import { Hero } from "./Hero";
import { Stats, Ticker } from "./Band";
import { About } from "./About";
import { Works } from "./Works";
import { Hackathons } from "./Hackathons";
import { TechStack } from "./TechStack";
import { Photography } from "./Photography";
import { Lightbox } from "./Lightbox";
import { Contact } from "./Contact";

const EASE = "cubic-bezier(.22,.61,.36,1)";

export function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("software");
  const [lb, setLb] = useState(-1);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const motion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    // intro
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("loaded")));

    // scroll-triggered reveals
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const t = en.target as HTMLElement;
          io.unobserve(t);
          if (t.classList.contains("rv")) {
            const sib = Array.from(t.parentElement?.children ?? []).filter((c) => c.classList.contains("rv")).indexOf(t);
            t.style.transitionDelay = Math.max(0, sib) * 90 + "ms";
          }
          t.classList.add("in");
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    el.querySelectorAll(".rv, .rv-h").forEach((n) => io.observe(n));
    cleanups.push(() => io.disconnect());

    if (motion) {
      // smooth scroll
      try {
        const lenis = new Lenis({ lerp: 0.09 });
        lenisRef.current = lenis;
        let raf = 0;
        const loop = (t: number) => {
          lenis.raf(t);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        cleanups.push(() => {
          cancelAnimationFrame(raf);
          lenis.destroy();
          lenisRef.current = null;
        });
      } catch {
        /* native scroll */
      }
    }

    if (motion && fine) {
      // magnetic controls
      let mag: HTMLElement | null = null;
      const onMove = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest?.("[data-magnet]") as HTMLElement | null;
        if (mag && mag !== target) {
          mag.style.transform = "";
          mag = null;
        }
        if (!target) return;
        mag = target;
        const r = target.getBoundingClientRect();
        target.style.transition = `transform 300ms ${EASE}, background 220ms, color 220ms, border-color 220ms`;
        target.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      };
      el.addEventListener("mousemove", onMove);
      cleanups.push(() => el.removeEventListener("mousemove", onMove));

      // photo tilt
      el.querySelectorAll<HTMLElement>("[data-tilt]").forEach((t) => {
        const mv = (e: MouseEvent) => {
          const r = t.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          t.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
        };
        const lv = () => (t.style.transform = "");
        t.addEventListener("mousemove", mv);
        t.addEventListener("mouseleave", lv);
        cleanups.push(() => {
          t.removeEventListener("mousemove", mv);
          t.removeEventListener("mouseleave", lv);
        });
      });

      // cursor dot
      const c = document.createElement("div");
      c.className = "cursor-dot";
      c.setAttribute("aria-hidden", "true");
      document.body.appendChild(c);
      let x = -50, y = -50, tx = -50, ty = -50, raf = 0;
      const mv = (e: MouseEvent) => {
        tx = e.clientX;
        ty = e.clientY;
        const big = (e.target as HTMLElement).closest?.("a,button,[data-magnet]");
        const s = big ? 44 : 10;
        c.style.width = c.style.height = s + "px";
        c.style.margin = `-${s / 2}px 0 0 -${s / 2}px`;
      };
      const loop = () => {
        x += (tx - x) * 0.22;
        y += (ty - y) * 0.22;
        c.style.transform = `translate(${x}px,${y}px)`;
        raf = requestAnimationFrame(loop);
      };
      window.addEventListener("mousemove", mv);
      raf = requestAnimationFrame(loop);
      cleanups.push(() => {
        window.removeEventListener("mousemove", mv);
        cancelAnimationFrame(raf);
        c.remove();
      });
    }

    return () => cleanups.forEach((f) => f());
  }, []);

  return (
    <div ref={root} className="v2">
      <a href="#about" className="skip">Skip to content</a>
      <Progress />
      <Nav />
      <main>
        <Hero mode={mode} setMode={setMode} />
        <Stats />
        <Ticker />
        <About mode={mode} />
        <Works mode={mode} />
        <Hackathons />
        <TechStack mode={mode} />
        <Photography onPick={setLb} />
        <Contact />
      </main>
      <Lightbox index={lb} setIndex={setLb} />
    </div>
  );
}
