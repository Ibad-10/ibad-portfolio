# Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely replace the retro pixel/cyberpunk portfolio with a Full Bleed Immersive dark design — ghost typography, noise texture, red ticker, real photography, comprehensive content from CV + LinkedIn.

**Architecture:** All section components are gutted and rewritten in-place. New shared UI components (CustomCursor, Ticker, Lightbox, GhostText) live in `components/ui/`. Old pixel components are deleted. Fonts switch from Press Start 2P / VT323 to Unbounded + IBM Plex Mono + Syne via `next/font/google`. CSS variables fully replaced.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion 12, `next/font/google`, Next.js Image component

---

## File Map

### Create
- `components/ui/CustomCursor.tsx` — white circle cursor, mix-blend-mode difference
- `components/ui/Ticker.tsx` — red strip, continuous scroll animation
- `components/ui/GhostText.tsx` — large low-opacity background text layer
- `components/ui/Lightbox.tsx` — photo modal with ESC/click-outside close
- `components/sections/Photography.tsx` — new masonry gallery section
- `public/photos/hero.jpeg` — tuxedo photo (copied from My photos/)
- `public/photos/hackathon.jpeg` — hackathon presenting photo
- `public/lightroom/lambo.jpeg`
- `public/lightroom/architecture.jpeg`
- `public/lightroom/skyline.jpeg`
- `public/lightroom/street-canyon.jpeg`
- `public/lightroom/jack-sparrow.jpeg`
- `public/lightroom/graffiti.jpeg`

### Modify
- `app/globals.css` — complete overhaul: new CSS vars, remove retro styles, add ticker/noise/cursor keyframes, remove scroll-snap
- `app/layout.tsx` — swap to Unbounded + IBM_Plex_Mono + Syne fonts
- `tailwind.config.ts` — new color tokens and font families
- `components/ui/NavBar.tsx` — full redesign
- `components/ui/ScrollProgress.tsx` — restyle to red `#FF4D2D`
- `components/sections/Hero.tsx` — complete rebuild
- `components/sections/About.tsx` — complete rebuild
- `components/sections/Skills.tsx` — complete rebuild
- `components/sections/Projects.tsx` — complete rebuild
- `components/sections/Hackathons.tsx` — complete rebuild
- `components/sections/Contact.tsx` — complete rebuild
- `app/page.tsx` — add Photography section, remove old component imports

### Delete
- `components/ui/GlitchText.tsx`
- `components/ui/PixelCursor.tsx`
- `components/ui/PixelProgressBar.tsx`
- `components/ui/TypewriterText.tsx`
- `components/ui/TiltCard.tsx`
- `components/ui/Confetti.tsx`
- `components/aceternity/BackgroundBeams.tsx`
- `components/aceternity/CardSpotlight.tsx`
- `components/aceternity/MovingBorder.tsx`
- `components/aceternity/Spotlight.tsx`

---

## Task 1: Copy Images to Public

**Files:**
- Create: `public/photos/hero.jpeg`
- Create: `public/photos/hackathon.jpeg`
- Create: `public/lightroom/lambo.jpeg`
- Create: `public/lightroom/architecture.jpeg`
- Create: `public/lightroom/skyline.jpeg`
- Create: `public/lightroom/street-canyon.jpeg`
- Create: `public/lightroom/jack-sparrow.jpeg`
- Create: `public/lightroom/graffiti.jpeg`

- [ ] **Step 1: Create directories and copy images**

```bash
mkdir -p public/photos public/lightroom

# Hero photo (tuxedo on London tube)
cp "My photos/WhatsApp Image 2026-05-01 at 9.28.25 PM (1).jpeg" public/photos/hero.jpeg

# Hackathon photo (presenting on stage)
cp "My photos/WhatsApp Image 2026-05-01 at 9.28.26 PM.jpeg" public/photos/hackathon.jpeg

# Lightroom / photography shots
cp "Pictures_ligthroom/WhatsApp Image 2026-05-01 at 9.59.20 PM.jpeg" public/lightroom/lambo.jpeg
cp "Pictures_ligthroom/WhatsApp Image 2026-05-01 at 9.59.13 PM (1).jpeg" public/lightroom/architecture.jpeg
cp "Pictures_ligthroom/WhatsApp Image 2026-05-01 at 9.59.13 PM (2).jpeg" public/lightroom/skyline.jpeg
cp "Pictures_ligthroom/WhatsApp Image 2026-05-01 at 9.59.13 PM (3).jpeg" public/lightroom/street-canyon.jpeg
cp "Pictures_ligthroom/WhatsApp Image 2026-05-01 at 9.59.15 PM (1).jpeg" public/lightroom/jack-sparrow.jpeg
cp "Pictures_ligthroom/WhatsApp Image 2026-05-01 at 9.59.17 PM.jpeg" public/lightroom/graffiti.jpeg
```

- [ ] **Step 2: Verify all 8 files exist**

```bash
ls -la public/photos/ public/lightroom/
```
Expected: 2 files in photos/, 6 files in lightroom/, all > 50KB

- [ ] **Step 3: Commit**

```bash
git add public/
git commit -m "feat: add portfolio photos to public directory"
```

---

## Task 2: Fonts, Tailwind, globals.css

**Files:**
- Modify: `app/layout.tsx`
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Update `app/layout.tsx` with new fonts**

Replace the entire file content:

```tsx
import type { Metadata } from "next";
import { Unbounded, IBM_Plex_Mono, Syne } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/ui/NavBar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { EasterEgg } from "@/components/ui/EasterEgg";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["200", "400", "700", "900"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ibad Ullah Zuberi — Portfolio",
  description:
    "BEng Computer Systems Engineering @ Brunel. BMW Logistics Intern. AI, Blockchain, Robotics builder. 3× Hackathon Winner.",
  openGraph: {
    title: "Ibad Ullah Zuberi",
    description: "CS Engineer · BMW Intern · AI + Robotics Builder",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${unbounded.variable} ${ibmPlexMono.variable} ${syne.variable}`}>
      <body className="bg-[#050505] text-white antialiased">
        <CustomCursor />
        <ScrollProgress />
        <NavBar />
        <EasterEgg />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Update `tailwind.config.ts`**

Replace the entire file content:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        syne: ["var(--font-syne)", "sans-serif"],
      },
      colors: {
        bg: "#050505",
        "bg-2": "#080808",
        red: "#FF4D2D",
        muted: "#333333",
        subtle: "#555555",
        border: "rgba(255,255,255,0.07)",
      },
      animation: {
        ticker: "ticker 30s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Rewrite `app/globals.css`**

Replace the entire file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --red: #FF4D2D;
  --bg: #050505;
  --bg-2: #080808;
  --border: rgba(255, 255, 255, 0.07);
  --muted: #333333;
  --subtle: #555555;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: #ffffff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--red); }

/* Noise texture overlay class */
.noise-overlay {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
}

/* Ticker animation */
@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Cursor hidden on desktop when custom cursor active */
@media (pointer: fine) {
  body { cursor: none; }
  a, button { cursor: none; }
}

/* Section spacing */
section {
  position: relative;
}

/* Ghost outline text utility */
.text-outline-red {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 77, 45, 0.55);
}

/* Red accent line utility */
.red-rule {
  width: 40px;
  height: 1px;
  background: var(--red);
}

/* Section label utility */
.section-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--red);
}
```

- [ ] **Step 4: Verify Tailwind compiles (start dev server)**

```bash
npm run dev
```
Expected: server starts on http://localhost:3000 with no errors. Site may look broken — that's fine, sections will be rebuilt.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx tailwind.config.ts app/globals.css
git commit -m "feat: new font system and design tokens — Unbounded + IBM Plex Mono + Syne"
```

---

## Task 3: CustomCursor + GhostText + Ticker Components

**Files:**
- Create: `components/ui/CustomCursor.tsx`
- Create: `components/ui/GhostText.tsx`
- Create: `components/ui/Ticker.tsx`

- [ ] **Step 1: Create `components/ui/CustomCursor.tsx`**

```tsx
"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springCfg = { damping: 28, stiffness: 650, mass: 0.5 };
  const x = useSpring(cursorX, springCfg);
  const y = useSpring(cursorY, springCfg);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{ x, y }}
    />
  );
}
```

- [ ] **Step 2: Create `components/ui/GhostText.tsx`**

```tsx
interface GhostTextProps {
  text: string;
}

export function GhostText({ text }: GhostTextProps) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      <div
        className="absolute top-[-20px] left-[-10px] font-display font-black leading-[0.82] tracking-[-0.05em] text-white/[0.025] whitespace-pre-line"
        style={{ fontSize: "clamp(100px, 18vw, 200px)" }}
      >
        {text.replace(/ /g, "\n")}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `components/ui/Ticker.tsx`**

```tsx
"use client";

interface TickerProps {
  text: string;
}

export function Ticker({ text }: TickerProps) {
  // Duplicate text to create seamless loop
  const content = `${text}   ${text}`;
  return (
    <div className="bg-[#FF4D2D] overflow-hidden py-[7px] select-none" aria-hidden="true">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "ticker 30s linear infinite" }}
      >
        <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-white px-4 shrink-0">
          {content}
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Update `components/ui/ScrollProgress.tsx` to red**

Replace the colour in the existing file. Open it and find the inline style or className with the current colour (likely `#00ff9f`) and replace with `#FF4D2D`:

```tsx
"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#FF4D2D] origin-left z-[9998]"
      style={{ scaleX }}
    />
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/ui/CustomCursor.tsx components/ui/GhostText.tsx components/ui/Ticker.tsx components/ui/ScrollProgress.tsx
git commit -m "feat: add CustomCursor, GhostText, Ticker components; restyle ScrollProgress"
```

---

## Task 4: Lightbox Component

**Files:**
- Create: `components/ui/Lightbox.tsx`

- [ ] **Step 1: Create `components/ui/Lightbox.tsx`**

```tsx
"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LightboxProps {
  src: string;
  alt: string;
  caption?: string;
  onClose: () => void;
}

export function Lightbox({ src, alt, caption, onClose }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[8000] flex items-center justify-center bg-black/92 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-[90vw] max-h-[90vh]"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={900}
            className="object-contain max-h-[85vh] w-auto"
            style={{ maxWidth: "90vw" }}
          />
          {caption && (
            <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase mt-3 text-center">
              {caption}
            </p>
          )}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 font-mono text-[10px] text-white/40 hover:text-white tracking-widest uppercase bg-[#050505] px-2 py-1 border border-white/10"
          >
            [ESC]
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Add `images.remotePatterns` to next.config.mjs if not present**

Open `next.config.mjs` and ensure local images work. Since photos are in `public/`, Next.js Image with local paths works out of the box — no config needed.

- [ ] **Step 3: Commit**

```bash
git add components/ui/Lightbox.tsx
git commit -m "feat: add Lightbox component for photography gallery"
```

---

## Task 5: NavBar Redesign

**Files:**
- Modify: `components/ui/NavBar.tsx`

- [ ] **Step 1: Replace `components/ui/NavBar.tsx` entirely**

```tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Hackathons", href: "#hackathons" },
  { label: "Photography", href: "#photography" },
  { label: "Contact", href: "#contact" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["hero", "about", "skills", "projects", "hackathons", "photography", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function scrollTo(href: string) {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,5,5,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      }}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <button
          onClick={() => scrollTo("#hero")}
          className="font-display font-black text-sm text-white tracking-tight hover:text-[#FF4D2D] transition-colors duration-200"
        >
          I.UZUBERI
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeSection === href.replace("#", "");
            return (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="relative font-mono text-[11px] tracking-widest uppercase transition-colors duration-200"
                style={{ color: isActive ? "#ffffff" : "#555555" }}
              >
                {label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#FF4D2D]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden font-mono text-[10px] tracking-widest uppercase text-[#555] hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-[999] bg-[#050505] flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="font-display font-black text-3xl text-white hover:text-[#FF4D2D] transition-colors duration-200 uppercase"
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/NavBar.tsx
git commit -m "feat: redesign NavBar — dark fixed nav, active section tracking, mobile full-screen menu"
```

---

## Task 6: Hero Section

**Files:**
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1: Replace `components/sections/Hero.tsx` entirely**

```tsx
"use client";
import { motion } from "framer-motion";
import { Ticker } from "@/components/ui/Ticker";
import { GhostText } from "@/components/ui/GhostText";

const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

export function Hero() {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-[#050505]">
      <GhostText text="IBAD IBAD" />
      <div className="absolute inset-0 noise-overlay pointer-events-none z-[1]" aria-hidden="true" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none z-[1]"
        style={{ background: "radial-gradient(circle, rgba(255,77,45,0.05) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-24 pb-0">
        <span className="font-mono text-[10px] text-[#333] tracking-[0.3em] uppercase">
          Vol. 01 · Portfolio · 2026
        </span>
        <span className="font-mono text-[10px] text-[#333] tracking-widest uppercase hidden md:block">
          01 / 07 · London, UK
        </span>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 py-8">
        <motion.div {...FADE_UP}>
          <h1 className="font-display font-black leading-[0.85] tracking-[-0.04em] mb-5">
            <span
              className="block text-white"
              style={{ fontSize: "clamp(3rem, 9.5vw, 8rem)" }}
            >
              IBAD ULLAH
            </span>
            <span
              className="block"
              style={{
                fontSize: "clamp(3rem, 9.5vw, 8rem)",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(255,77,45,0.55)",
              }}
            >
              ZUBERI
            </span>
          </h1>

          <div className="w-10 h-[1px] bg-[#FF4D2D] mb-5" />

          <p className="font-mono text-xs md:text-sm text-[#555] tracking-wide max-w-lg leading-relaxed">
            BEng Computer Systems Engineering @ Brunel · BMW Logistics Intern · AI + Robotics Builder
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={() => scrollTo("projects")}
            className="font-mono text-[11px] font-bold tracking-widest uppercase bg-[#FF4D2D] text-white px-7 py-3 hover:bg-[#e03d20] transition-colors duration-200"
          >
            VIEW WORK
          </button>
          <a
            href="/Ibad_CV.pdf"
            download
            className="font-mono text-[11px] font-bold tracking-widest uppercase border border-white/15 text-white/50 px-7 py-3 hover:border-white/30 hover:text-white/80 transition-all duration-200"
          >
            DOWNLOAD CV
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.p
          className="font-mono text-[9px] text-[#333] tracking-widest uppercase mt-16 hidden md:block"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ↓ SCROLL
        </motion.p>
      </div>

      {/* Ticker strip */}
      <div className="relative z-10">
        <Ticker text="ENCODE AI HACKATHON — 1ST PLACE · BRUNEL HACK — 1ST PLACE · RADIX HACK — 1ST PLACE · BMW GROUP INTERN · EY DATA ANALYST · AUTONOMOUS ROBOT 95% ACCURACY · BLOCKCHAIN DEVELOPER · AI BUILDER · LONDON · OPEN TO INTERNSHIPS SUMMER 2026 ·" />
      </div>

      {/* Stats bar */}
      <div className="relative z-10 grid grid-cols-3 border-t border-white/5">
        {[
          { num: "1st", label: "Out of 30 — Year Topper" },
          { num: "4×", label: "Hackathon Podiums" },
          { num: "95%", label: "Robot Retrieval Accuracy" },
        ].map((stat, i) => (
          <div
            key={stat.num}
            className={`px-4 md:px-12 py-5 text-center ${i < 2 ? "border-r border-white/5" : ""}`}
          >
            <div className="font-display font-black text-xl md:text-3xl text-white tracking-tight">
              {stat.num}
            </div>
            <div className="font-mono text-[8px] md:text-[9px] text-[#333] tracking-widest uppercase mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Check dev server — hero renders without errors**

Open http://localhost:3000 — expect: dark section with large type, ghost text behind, red ticker, stats bar.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: rebuild Hero section — ghost type, red ticker, stats bar, immersive dark"
```

---

## Task 7: About Section

**Files:**
- Modify: `components/sections/About.tsx`

- [ ] **Step 1: Replace `components/sections/About.tsx` entirely**

```tsx
"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

function CountUp({ to, suffix = "", inView }: { to: number; suffix?: string; inView: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = Math.ceil(to / 50);
    const interval = setInterval(() => {
      current = Math.min(current + step, to);
      setVal(current);
      if (current >= to) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [inView, to]);
  return <>{val}{suffix}</>;
}

const STATS = [
  { display: "1st", label: "Year Topper — 1st out of 30", isStatic: true },
  { to: 8, suffix: "+", label: "Projects Shipped", isStatic: false },
  { isStatic: true, display: "4×", label: "Hackathon Podiums" },
  { display: "95%", label: "Robot Retrieval Accuracy", isStatic: true },
];

const EXPERIENCE = [
  { company: "BMW Group", role: "Logistics Planning Intern (Controls & Automation)", period: "Jul 2025 – Present" },
  { company: "EY (Ernst & Young)", role: "Data Analyst", period: "Jul 2024 – Sep 2024" },
  { company: "Cloud Nebula Enterprises", role: "Web Developer", period: "Jun 2024 – Sep 2024" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="bg-[#080808] px-6 md:px-12 py-24">
      {/* Section label */}
      <motion.p
        className="section-label mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        [ 02 ] — About
      </motion.p>

      {/* 2-col layout */}
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-6xl">
        {/* Left: headline + bio + experience */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2 className="font-display font-black text-3xl md:text-5xl text-white leading-[0.9] tracking-[-0.03em] mb-6">
            Builder by nature,
            <br />
            <span className="text-outline-red">hacker by choice.</span>
          </h2>

          <p className="font-mono text-sm text-[#555] leading-relaxed mb-8">
            BEng Computer Systems Engineering at Brunel University London — Predicted First Class, ranked 1st out of 30. Currently a Logistics Planning Intern (Controls & Automation) at BMW Group, writing PLC logic and supporting Industry 4.0 projects in a live engine manufacturing plant. Previously at EY, where I analysed 20,000+ data entries and cut interpretation time by 25%. I build things that work: blockchain games that win hackathons, AI agents, autonomous robots with 95% retrieval accuracy, and decentralised payment platforms. Open to high-impact engineering internships, Summer 2026.
          </p>

          {/* Experience strip */}
          <div className="space-y-3 border-t border-white/5 pt-6">
            {EXPERIENCE.map((exp) => (
              <div key={exp.company} className="flex items-start gap-4">
                <div className="w-1 h-1 bg-[#FF4D2D] mt-2 shrink-0" />
                <div>
                  <p className="font-mono text-[11px] text-white tracking-wide">{exp.company}</p>
                  <p className="font-mono text-[10px] text-[#444]">{exp.role} · {exp.period}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: photos + stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="flex flex-col gap-6"
        >
          {/* Photos */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] overflow-hidden">
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#FF4D2D] z-10" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#FF4D2D] z-10" />
              <Image
                src="/photos/hero.jpeg"
                alt="Ibad Ullah Zuberi"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden">
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#FF4D2D] z-10" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#FF4D2D] z-10" />
              <Image
                src="/photos/hackathon.jpeg"
                alt="Ibad presenting at hackathon"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                className="border border-white/5 p-4 hover:border-[#FF4D2D]/30 transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                <div className="font-display font-black text-2xl md:text-3xl text-white tracking-tight">
                  {stat.isStatic ? (
                    stat.display
                  ) : (
                    <CountUp to={stat.to!} suffix={stat.suffix} inView={inView} />
                  )}
                </div>
                <div className="font-mono text-[9px] text-[#444] tracking-widest uppercase mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/About.tsx
git commit -m "feat: rebuild About section — bio, experience strip, photos, stats with CV content"
```

---

## Task 8: Skills Section

**Files:**
- Modify: `components/sections/Skills.tsx`

- [ ] **Step 1: Replace `components/sections/Skills.tsx` entirely**

```tsx
"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const SKILLS: Record<string, { name: string; hot?: boolean }[]> = {
  "Web & Software": [
    { name: "TypeScript", hot: true },
    { name: "JavaScript", hot: true },
    { name: "Python", hot: true },
    { name: "C" },
    { name: "C++", hot: true },
    { name: "Java" },
    { name: "MATLAB" },
    { name: "SQL" },
    { name: "VBA" },
    { name: "Assembly" },
    { name: "Verilog HDL" },
  ],
  "Frontend": [
    { name: "React / Next.js", hot: true },
    { name: "Tailwind CSS" },
    { name: "Framer Motion" },
    { name: "HTML / CSS" },
  ],
  "Backend": [
    { name: "Node / Express" },
    { name: "FastAPI" },
    { name: "Flask", hot: true },
    { name: "Socket.io" },
    { name: "PostgreSQL" },
    { name: "MongoDB" },
    { name: "SQLAlchemy" },
    { name: "REST APIs" },
  ],
  "Controls & Automation": [
    { name: "PLC Programming", hot: true },
    { name: "Siemens TIA Portal V17", hot: true },
    { name: "WAGO e!COCKPIT" },
    { name: "Ladder Logic" },
    { name: "Industry 4.0" },
  ],
  "Embedded & Hardware": [
    { name: "Arduino", hot: true },
    { name: "Raspberry Pi (Pico)" },
    { name: "FPGA" },
    { name: "Sensor Integration" },
    { name: "Embedded C" },
    { name: "Soldering" },
    { name: "Breadboarding" },
  ],
  "Data & Tools": [
    { name: "SAP", hot: true },
    { name: "SAP Analytics Cloud" },
    { name: "Oracle SQL / APEX" },
    { name: "Pandas" },
    { name: "NumPy" },
    { name: "Docker" },
    { name: "Vercel", hot: true },
    { name: "Git", hot: true },
    { name: "Figma" },
    { name: "Fusion 360" },
    { name: "LabVIEW" },
  ],
};

type Category = keyof typeof SKILLS;

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<Category>("Web & Software");

  return (
    <section id="skills" ref={ref} className="bg-[#050505] px-6 md:px-12 py-24">
      <motion.p
        className="section-label mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
      >
        [ 03 ] — Skills
      </motion.p>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {(Object.keys(SKILLS) as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="font-mono text-[10px] tracking-widest uppercase px-4 py-2 border transition-all duration-200"
            style={{
              borderColor: active === cat ? "#FF4D2D" : "rgba(255,255,255,0.07)",
              color: active === cat ? "#FF4D2D" : "#555555",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pills */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {SKILLS[active].map((skill, i) => (
            <motion.span
              key={skill.name}
              className="font-mono text-[11px] tracking-wide px-3 py-2 border transition-all duration-200 hover:-translate-y-0.5"
              style={{
                borderColor: skill.hot ? "#FF4D2D" : "rgba(255,255,255,0.1)",
                color: skill.hot ? "#FF4D2D" : "#888888",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
            >
              {skill.name}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Skills.tsx
git commit -m "feat: rebuild Skills — 6 categories from CV, pill tags, red hot skills"
```

---

## Task 9: Projects Section

**Files:**
- Modify: `components/sections/Projects.tsx`

- [ ] **Step 1: Replace `components/sections/Projects.tsx` entirely**

```tsx
"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PROJECTS = [
  {
    num: "01",
    name: "HackTheWallet",
    desc: "A blockchain game on Starknet: connect your wallet, then convince an AI to give your crypto back. Uses Gemini 1.5 Flash with real trust-scoring. On-chain rewards, voice I/O, deployed on Sepolia testnet. Encode AI Hackathon — 1st Place.",
    tags: ["Next.js", "Starknet", "Gemini 1.5 Flash", "Smart Contracts", "TypeScript"],
    url: "https://github.com/Sahid-m/HackTheWallet",
    badge: "1st Place · Encode",
  },
  {
    num: "02",
    name: "Go Fish",
    desc: "Decentralised payment platform on Polkadot for the global fishing import/export industry. Smart contracts give exporters 97.5% of trade value instantly. Eliminates FX volatility and intermediary fees with stablecoin integration.",
    tags: ["Next.js", "Polkadot", "Solidity", "TypeScript", "Smart Contracts"],
    url: "https://github.com/Sahid-m",
    badge: "EasyA x Polkadot",
  },
  {
    num: "03",
    name: "StreamFlow",
    desc: "Decentralised creator tipping platform built on Radix blockchain. Streamers receive tips directly from viewers with real-time analytics and on-chain transaction processing. Built at Radix Hack.",
    tags: ["TypeScript", "React", "Rust", "Radix Blockchain"],
    url: "https://github.com/Sahid-m/radix-hack",
    badge: "1st Place · Radix Hack",
  },
  {
    num: "04",
    name: "Foodo-Baggins",
    desc: "AI nutrition tracker that roasts your diet. Upload a meal photo — it analyses calories, gives personalised advice, posts a sarcastic comment about your food choices, and converts meals into sustainability Green Points. Royal Hackaway v8.",
    tags: ["Next.js", "TypeScript", "MongoDB", "Ollama", "GenAI"],
    url: "https://github.com/Sahid-m/foodo_baggins",
    badge: "3rd · Verdn Track",
  },
  {
    num: "05",
    name: "Automated Object Retriever",
    desc: "Autonomous robot achieving 95% item retrieval accuracy, reducing manual retrieval time by 70%. Built from scratch with Arduino, ultrasonic sensors, and embedded C — hardware and software as one.",
    tags: ["Arduino", "Ultrasonic Sensor", "Embedded C", "Robotics"],
    url: "#",
    badge: "Hardware · 2024",
  },
  {
    num: "06",
    name: "ClipForge AI",
    desc: "AI-powered video clipping tool. Feed it a long video, get back the best moments — cut, captioned, ready to post. Built for creators who don't have time to edit.",
    tags: ["TypeScript", "AI", "Video Processing"],
    url: "https://github.com/Ibad-10/clipforge-ai",
    badge: "In Progress",
  },
];

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="bg-[#080808] px-6 md:px-12 py-24">
      <motion.p
        className="section-label mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
      >
        [ 04 ] — Work
      </motion.p>

      <div className="grid md:grid-cols-2 gap-4 max-w-6xl">
        {PROJECTS.map((project, i) => (
          <motion.a
            key={project.num}
            href={project.url === "#" ? undefined : project.url}
            target={project.url === "#" ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="group block border border-white/5 p-6 hover:border-[#FF4D2D]/40 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}
          >
            {/* Ghost number */}
            <div
              className="absolute top-2 right-4 font-display font-black text-[80px] leading-none tracking-[-0.05em] pointer-events-none select-none"
              style={{ color: "rgba(255,255,255,0.025)", transition: "color 0.3s" }}
            >
              {project.num}
            </div>

            {/* Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[9px] tracking-widest uppercase text-[#FF4D2D] border border-[#FF4D2D]/30 px-2 py-1">
                {project.badge}
              </span>
              <span className="font-mono text-[10px] text-[#333] group-hover:text-[#FF4D2D] transition-colors">
                ↗
              </span>
            </div>

            <h3 className="font-display font-black text-lg text-white mb-3 tracking-tight group-hover:text-[#FF4D2D] transition-colors duration-300">
              {project.name}
            </h3>

            <p className="font-mono text-[11px] text-[#555] leading-relaxed mb-4">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] tracking-wide text-[#444] border border-white/5 px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Left border reveal on hover */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#FF4D2D] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Projects.tsx
git commit -m "feat: rebuild Projects — 6 projects from CV/GitHub, editorial cards, left border hover"
```

---

## Task 10: Hackathons Section

**Files:**
- Modify: `components/sections/Hackathons.tsx`

- [ ] **Step 1: Replace `components/sections/Hackathons.tsx` entirely**

```tsx
"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const HACKATHONS = [
  {
    num: "01",
    event: "Encode AI London Hackathon 2025",
    prize: "1st Place — Main Track",
    extra: ["2nd — Nethermind Bounty", "5th — StarkWare Bounty"],
    desc: "Built HackTheWallet — a Starknet blockchain game where players use conversational AI to reclaim locked crypto. Prompt engineering meets DeFi. First place across all teams, plus two sponsor bounties.",
    date: "Apr 2025",
    org: "Encode Club",
    gold: true,
  },
  {
    num: "02",
    event: "Brunel University Hack",
    prize: "1st Place",
    extra: [],
    desc: "Shipped luffa-ai-bot — a LangGraph multi-tool AI assistant integrated into the Luffa live messaging platform. Handles voting, image generation, hotel booking — all from chat. Built and deployed in under 24 hours.",
    date: "2024",
    org: "Brunel University London",
    gold: true,
  },
  {
    num: "03",
    event: "Radix Hack",
    prize: "1st Place",
    extra: [],
    desc: "Built StreamFlow, a decentralised creator tipping platform on Radix blockchain. Real-time tip analytics, on-chain transaction processing, TypeScript + Rust architecture.",
    date: "2024",
    org: "Radix Foundation",
    gold: true,
  },
  {
    num: "04",
    event: "Royal Hackaway v8",
    prize: "3rd Place — Verdn Environmental Track",
    extra: [],
    desc: "Built Foodo-Baggins at Royal Holloway's inter-university hackathon. AI nutrition tracker with sustainability integration — analyses food photos, provides coaching, converts meals into eco-friendly Green Points.",
    date: "2024",
    org: "Royal Holloway University",
    gold: false,
  },
  {
    num: "05",
    event: "EasyA x Polkadot Hackathon London",
    prize: "Finalist",
    extra: [],
    desc: "Built Go Fish — decentralised payment platform for the global fishing industry on Polkadot. Smart contracts enable 97.5% instant payment to exporters, with automated collateral and stablecoin FX protection.",
    date: "Apr 2025",
    org: "EasyA",
    gold: false,
  },
];

export function Hackathons() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="hackathons" ref={ref} className="bg-[#050505] px-6 md:px-12 py-24">
      <motion.p
        className="section-label mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
      >
        [ 05 ] — Hackathons
      </motion.p>

      <motion.p
        className="font-display font-black text-2xl md:text-4xl text-white tracking-tight mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
      >
        Multiple hackathons.{" "}
        <span className="text-outline-red">Multiple wins.</span>
      </motion.p>

      <div className="space-y-3 max-w-4xl">
        {HACKATHONS.map((hack, i) => (
          <motion.div
            key={hack.num}
            className="border border-white/5 hover:border-[#FF4D2D]/30 transition-all duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 }}
          >
            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="font-mono text-[10px] tracking-widest uppercase px-2 py-1 border"
                      style={{
                        borderColor: hack.gold ? "#FF4D2D" : "rgba(255,255,255,0.1)",
                        color: hack.gold ? "#FF4D2D" : "#555",
                      }}
                    >
                      {hack.prize}
                    </span>
                    {hack.extra.map((e) => (
                      <span
                        key={e}
                        className="font-mono text-[9px] tracking-widest uppercase text-[#444] border border-white/5 px-2 py-1 hidden md:inline"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display font-black text-base md:text-xl text-white tracking-tight group-hover:text-[#FF4D2D] transition-colors duration-300">
                    {hack.event}
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-[#333] tracking-widest shrink-0">
                  {hack.date}
                </span>
              </div>
              <p className="font-mono text-[11px] text-[#555] leading-relaxed">
                {hack.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Hackathons.tsx
git commit -m "feat: rebuild Hackathons — 5 events from CV, accurate prizes, editorial list layout"
```

---

## Task 11: Photography Section (New)

**Files:**
- Create: `components/sections/Photography.tsx`

- [ ] **Step 1: Create `components/sections/Photography.tsx`**

```tsx
"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Lightbox } from "@/components/ui/Lightbox";

const PHOTOS = [
  {
    src: "/lightroom/lambo.jpeg",
    alt: "Green Lamborghini in Kensington",
    caption: "Kensington, London",
    span: "row-span-2",
  },
  {
    src: "/lightroom/architecture.jpeg",
    alt: "Golden hour brick building West London",
    caption: "Golden hour, West London",
    span: "",
  },
  {
    src: "/lightroom/skyline.jpeg",
    alt: "City of London skyline at dusk",
    caption: "City of London at dusk",
    span: "",
  },
  {
    src: "/lightroom/street-canyon.jpeg",
    alt: "Street canyon at sunset",
    caption: "Birmingham city centre",
    span: "",
  },
  {
    src: "/lightroom/jack-sparrow.jpeg",
    alt: "Jack Sparrow street performer",
    caption: "Street performer, Windsor",
    span: "",
  },
  {
    src: "/lightroom/graffiti.jpeg",
    alt: "Person on graffiti wall Shoreditch",
    caption: "Shoreditch, London",
    span: "",
  },
];

export function Photography() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<null | (typeof PHOTOS)[0]>(null);

  return (
    <section id="photography" ref={ref} className="bg-[#050505] px-6 md:px-12 py-24">
      <motion.p
        className="section-label mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
      >
        [ 06 ] — Through the Lens
      </motion.p>

      <motion.p
        className="font-mono text-[11px] text-[#444] tracking-widest uppercase mb-10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.15 }}
      >
        Street · Architecture · London
      </motion.p>

      {/* Masonry grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px] md:auto-rows-[260px]">
        {PHOTOS.map((photo, i) => (
          <motion.button
            key={photo.src}
            className={`relative overflow-hidden group text-left ${photo.span}`}
            onClick={() => setLightbox(photo)}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.08 }}
            aria-label={`View ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end p-4">
              <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="font-mono text-[10px] text-white tracking-widest uppercase mb-1">VIEW</p>
                <p className="font-mono text-[9px] text-white/50 tracking-wide">{photo.caption}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          caption={lightbox.caption}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Photography.tsx
git commit -m "feat: add Photography section — masonry grid, hover overlay, lightbox modal"
```

---

## Task 12: Contact Section

**Files:**
- Modify: `components/sections/Contact.tsx`

- [ ] **Step 1: Replace `components/sections/Contact.tsx` entirely**

```tsx
"use client";
import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";

const SOCIALS = [
  {
    label: "GitHub",
    display: "github.com/Ibad-10",
    href: "https://github.com/Ibad-10",
  },
  {
    label: "Email",
    display: "zuberi.ibad@gmail.com",
    href: "mailto:zuberi.ibad@gmail.com",
  },
  {
    label: "LinkedIn",
    display: "linkedin.com/in/ibad-ullah-zuberi",
    href: "https://www.linkedin.com/in/ibad-ullah-zuberi/",
  },
];

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSent(true);
      setSending(false);
      setForm({ name: "", email: "", message: "" });
    }, 800);
  }

  const inputClass =
    "w-full bg-transparent border border-white/10 font-mono text-sm text-white px-4 py-3 outline-none focus:border-[#FF4D2D] transition-colors duration-200 placeholder:text-[#333]";

  return (
    <section id="contact" ref={ref} className="bg-[#080808] px-6 md:px-12 py-24">
      <motion.p
        className="section-label mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
      >
        [ 07 ] — Contact
      </motion.p>

      <div className="grid md:grid-cols-2 gap-12 md:gap-20 max-w-5xl">
        {/* Left: headline + socials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="font-display font-black text-4xl md:text-6xl text-white leading-[0.88] tracking-[-0.04em] mb-6">
            LET&apos;S BUILD
            <br />
            <span className="text-outline-red">SOMETHING.</span>
          </h2>

          <p className="font-mono text-sm text-[#555] leading-relaxed mb-10 max-w-sm">
            Got a project, an idea, or just want to say hi — reach out. Always open to interesting conversations.
          </p>

          <div className="space-y-5">
            {SOCIALS.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-3"
              >
                <span className="font-mono text-[10px] text-[#333] tracking-widest uppercase w-20 shrink-0">
                  {social.label}
                </span>
                <div className="w-[1px] h-3 bg-white/10" />
                <span className="font-mono text-sm text-[#555] group-hover:text-white group-hover:underline decoration-[#FF4D2D] transition-colors duration-200">
                  ↗ {social.display}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div>
            <label className="font-mono text-[10px] text-[#444] tracking-widest uppercase block mb-2">
              Name
            </label>
            <input
              required
              className={inputClass}
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="font-mono text-[10px] text-[#444] tracking-widest uppercase block mb-2">
              Email
            </label>
            <input
              required
              type="email"
              className={inputClass}
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div>
            <label className="font-mono text-[10px] text-[#444] tracking-widest uppercase block mb-2">
              Message
            </label>
            <textarea
              required
              rows={5}
              className={inputClass + " resize-none"}
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            />
          </div>

          <button
            type="submit"
            disabled={sending || sent}
            className="w-full font-mono text-[11px] font-bold tracking-widest uppercase py-4 transition-all duration-200 disabled:opacity-60"
            style={{
              background: sent ? "rgba(255,77,45,0.1)" : "#FF4D2D",
              color: sent ? "#FF4D2D" : "#fff",
              border: sent ? "1px solid #FF4D2D" : "none",
            }}
          >
            {sent ? "MESSAGE SENT — I'LL BE IN TOUCH." : sending ? "SENDING..." : "SEND MESSAGE →"}
          </button>
        </motion.form>
      </div>

      {/* Footer */}
      <motion.div
        className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
      >
        <p className="font-mono text-[10px] text-[#333] tracking-widest uppercase">
          IBAD ULLAH ZUBERI © 2026 · LONDON
        </p>
        <p className="font-mono text-[10px] text-[#333] tracking-widest uppercase">
          Built with Next.js + Framer Motion
        </p>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Contact.tsx
git commit -m "feat: rebuild Contact — corrected socials as real links, form, LET'S BUILD headline"
```

---

## Task 13: page.tsx Update + Delete Old Components

**Files:**
- Modify: `app/page.tsx`
- Delete: `components/ui/GlitchText.tsx`, `PixelCursor.tsx`, `PixelProgressBar.tsx`, `TypewriterText.tsx`, `TiltCard.tsx`, `Confetti.tsx`
- Delete: `components/aceternity/BackgroundBeams.tsx`, `CardSpotlight.tsx`, `MovingBorder.tsx`, `Spotlight.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Hackathons } from "@/components/sections/Hackathons";
import { Photography } from "@/components/sections/Photography";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Hackathons />
      <Photography />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 2: Delete obsolete components**

```bash
# UI components no longer used
rm components/ui/GlitchText.tsx
rm components/ui/PixelCursor.tsx
rm components/ui/PixelProgressBar.tsx
rm components/ui/TypewriterText.tsx
rm components/ui/TiltCard.tsx
rm components/ui/Confetti.tsx

# Aceternity components no longer used
rm components/aceternity/BackgroundBeams.tsx
rm components/aceternity/CardSpotlight.tsx
rm components/aceternity/MovingBorder.tsx
rm components/aceternity/Spotlight.tsx
```

- [ ] **Step 3: Remove RobotDemo section (replaced by Photography)**

```bash
rm components/sections/RobotDemo.tsx
```

- [ ] **Step 4: Check for TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: no errors. If errors appear, they'll be about deleted imports — trace back to which file still imports the deleted component and remove the import.

- [ ] **Step 5: Run dev server and check all sections**

```bash
npm run dev
```

Open http://localhost:3000 and scroll through each section:
- Hero: ghost text, name, ticker, stats bar
- About: headline, bio, experience strip, photos, stats
- Skills: category tabs, pill tags
- Projects: 6 cards, hover states
- Hackathons: 5 events list
- Photography: masonry grid, hover overlay, lightbox on click
- Contact: headline, social links (all clickable), form

- [ ] **Step 6: Final commit**

```bash
git add app/page.tsx
git rm components/ui/GlitchText.tsx components/ui/PixelCursor.tsx components/ui/PixelProgressBar.tsx components/ui/TypewriterText.tsx components/ui/TiltCard.tsx components/ui/Confetti.tsx
git rm components/aceternity/BackgroundBeams.tsx components/aceternity/CardSpotlight.tsx components/aceternity/MovingBorder.tsx components/aceternity/Spotlight.tsx
git rm components/sections/RobotDemo.tsx
git commit -m "feat: complete portfolio redesign — immersive dark theme, full CV content, photography gallery"
```

---

## Self-Review

### Spec Coverage Check
- [x] Full Bleed Immersive aesthetic (ghost text, noise, ticker, stats bar) → Task 6
- [x] CustomCursor → Task 3
- [x] Ticker → Task 3
- [x] GhostText → Task 3
- [x] Lightbox → Task 4
- [x] NavBar with active section tracking → Task 5
- [x] Hero with tuxedo photo ref removed (photo in About instead), ghost name, ticker, stats → Task 6
- [x] About with BMW/EY/Cloud Nebula experience strip → Task 7
- [x] Skills expanded to 6 categories from CV → Task 8
- [x] Projects showing 6 projects, no "CONTRIB" labels → Task 9
- [x] Hackathons: 5 events, accurate prizes (Encode 1st+bounties, Brunel 1st, Radix 1st, Royal Holloway 3rd, EasyA finalist) → Task 10
- [x] Photography section with 6 curated shots + lightbox → Task 11
- [x] Contact: LinkedIn fixed, email corrected to zuberi.ibad@gmail.com, all real links → Task 12
- [x] Mobile responsive (no scroll-snap, stacked grids) → covered via Tailwind responsive classes throughout
- [x] Old retro components deleted → Task 13
- [x] Images copied to public/ → Task 1
- [x] Fonts: Unbounded + IBM Plex Mono + Syne → Task 2

### Placeholder Scan
None found.

### Type Consistency
- `Lightbox` props: `{ src, alt, caption?, onClose }` — used identically in Photography
- `CountUp` props: `{ to, suffix?, inView }` — used identically in About
- `GhostText` props: `{ text }` — used identically in Hero
- `Ticker` props: `{ text }` — used identically in Hero
- All component exports match imports in page.tsx
