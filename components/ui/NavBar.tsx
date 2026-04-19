"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "hero",       label: "HOME" },
  { id: "about",      label: "ABOUT" },
  { id: "skills",     label: "SKILLS" },
  { id: "projects",   label: "PROJECTS" },
  { id: "hackathons", label: "WINS" },
  { id: "robot",      label: "ROBOT" },
  { id: "contact",    label: "CONTACT" },
];

export function NavBar() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.5 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[9994] flex justify-center py-3"
          style={{ backdropFilter: "blur(12px)", background: "rgba(10,10,15,0.85)", borderBottom: "1px solid #3a3a4a" }}
        >
          <div className="flex gap-6 items-center">
            {SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative font-pixel text-[8px] transition-colors duration-200"
                style={{ color: active === id ? "#00ff9f" : "#3a3a4a" }}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-none bg-primary"
                    style={{ boxShadow: "0 0 6px #00ff9f" }}
                  />
                )}
                {label}
              </button>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
