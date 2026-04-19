# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Ibad's pixel-art retro-futuristic animated portfolio as a Next.js 14 app deployed free on Vercel.

**Architecture:** Single-page scroll app with 7 sections (Hero, About, Skills, Projects, Hackathons, Robot Demo, Contact). Global interactive layer (custom cursor, scroll progress, scanlines) sits above all sections. Aceternity UI components are copy-pasted into `components/aceternity/`. All animations use Framer Motion.

**Tech Stack:** Next.js 14 (App Router) · TypeScript 5 · Framer Motion 11 · Tailwind CSS 3 · Aceternity UI (copy-paste) · Press Start 2P + VT323 (Google Fonts) · Vercel

---

## File Map

```
D:/portfolio/
├── app/
│   ├── layout.tsx                    # fonts, metadata, global wrappers
│   ├── page.tsx                      # assembles all sections
│   └── globals.css                   # CSS vars, scanlines, noise, cursor hide, scroll-snap
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Hackathons.tsx
│   │   ├── RobotDemo.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── NavBar.tsx
│   │   ├── PixelCursor.tsx           # cursor + trail dots
│   │   ├── ScrollProgress.tsx        # top progress bar
│   │   ├── GlitchText.tsx            # CSS glitch animation
│   │   ├── TypewriterText.tsx        # typewriter hook + component
│   │   ├── PixelProgressBar.tsx      # animated fill bar
│   │   ├── MagneticButton.tsx        # spring-attract to cursor
│   │   ├── TiltCard.tsx              # 3D rotateX/Y wrapper
│   │   ├── Confetti.tsx              # CSS burst on mount
│   │   └── EasterEgg.tsx             # Konami code handler
│   └── aceternity/
│       ├── BackgroundBeams.tsx
│       ├── CardSpotlight.tsx
│       ├── MovingBorder.tsx
│       └── Spotlight.tsx
├── lib/
│   └── utils.ts                      # cn() helper
├── public/
│   ├── Ibad_CV.pdf                   # copied from D:/portfolio/
│   └── robot-demo.mp4                # copied from D:/portfolio/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `D:/portfolio/package.json` (via CLI)
- Create: `D:/portfolio/tailwind.config.ts`
- Create: `D:/portfolio/tsconfig.json`
- Create: `D:/portfolio/next.config.ts`
- Create: `D:/portfolio/lib/utils.ts`

- [ ] **Step 1: Run create-next-app inside the portfolio folder**

```bash
cd D:/portfolio
npx create-next-app@14 . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
```

Expected output: `Success! Created portfolio at D:/portfolio`

- [ ] **Step 2: Install additional dependencies**

```bash
cd D:/portfolio
npm install framer-motion clsx tailwind-merge
```

- [ ] **Step 3: Create lib/utils.ts**

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Verify dev server starts**

```bash
cd D:/portfolio
npm run dev
```

Expected: server running at http://localhost:3000

- [ ] **Step 5: Commit**

```bash
cd D:/portfolio
git add -A
git commit -m "feat: scaffold Next.js 14 project with Framer Motion and Tailwind"
```

---

## Task 2: Global Styles, Fonts, and CSS Variables

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Update tailwind.config.ts**

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0f",
        primary: "#00ff9f",
        accent: "#ff2d78",
        secondary: "#00cfff",
        muted: "#3a3a4a",
        "text-main": "#e0e0e0",
      },
      fontFamily: {
        pixel: ["'Press Start 2P'", "cursive"],
        mono: ["'VT323'", "monospace"],
        code: ["'Share Tech Mono'", "monospace"],
      },
      animation: {
        "glitch-1": "glitch1 0.3s infinite linear alternate-reverse",
        "glitch-2": "glitch2 0.3s infinite linear alternate-reverse",
        blink: "blink 1s step-end infinite",
        "float-up": "floatUp 8s linear infinite",
        "pixel-bounce": "pixelBounce 1s steps(4) infinite",
      },
      keyframes: {
        glitch1: {
          "0%": { clipPath: "inset(40% 0 61% 0)", transform: "translate(-2px, 0)" },
          "20%": { clipPath: "inset(92% 0 1% 0)", transform: "translate(1px, 0)" },
          "40%": { clipPath: "inset(43% 0 1% 0)", transform: "translate(-1px, 0)" },
          "60%": { clipPath: "inset(25% 0 58% 0)", transform: "translate(2px, 0)" },
          "80%": { clipPath: "inset(54% 0 7% 0)", transform: "translate(-1px, 0)" },
          "100%": { clipPath: "inset(58% 0 43% 0)", transform: "translate(1px, 0)" },
        },
        glitch2: {
          "0%": { clipPath: "inset(25% 0 58% 0)", transform: "translate(2px, 0)" },
          "20%": { clipPath: "inset(54% 0 7% 0)", transform: "translate(-2px, 0)" },
          "40%": { clipPath: "inset(58% 0 43% 0)", transform: "translate(1px, 0)" },
          "60%": { clipPath: "inset(40% 0 61% 0)", transform: "translate(-1px, 0)" },
          "80%": { clipPath: "inset(92% 0 1% 0)", transform: "translate(2px, 0)" },
          "100%": { clipPath: "inset(43% 0 1% 0)", transform: "translate(-2px, 0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        floatUp: {
          "0%": { transform: "translateY(100vh) translateX(0px)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-100px) translateX(20px)", opacity: "0" },
        },
        pixelBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Replace app/globals.css**

```css
/* app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Share+Tech+Mono&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #0a0a0f;
  --primary: #00ff9f;
  --accent: #ff2d78;
  --secondary: #00cfff;
  --muted: #3a3a4a;
  --text: #e0e0e0;
  --glow-green: 0 0 10px #00ff9f, 0 0 20px #00ff9f40;
  --glow-pink: 0 0 10px #ff2d78, 0 0 20px #ff2d7840;
  --glow-cyan: 0 0 10px #00cfff, 0 0 20px #00cfff40;
  --glow-gold: 0 0 10px #ffd700, 0 0 20px #ffd70040;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  scroll-behavior: smooth;
  cursor: none;
}

body {
  background-color: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  font-family: 'VT323', monospace;
}

/* CRT scanlines overlay */
body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
  pointer-events: none;
  z-index: 9998;
}

/* Noise texture overlay */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9997;
  opacity: 0.4;
}

/* Scroll snap */
.snap-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.snap-section {
  scroll-snap-align: start;
  min-height: 100vh;
}

/* Pixel border utility */
.pixel-border {
  box-shadow: 
    inset -2px -2px 0 0 var(--muted),
    inset 2px 2px 0 0 var(--primary);
  image-rendering: pixelated;
}

.pixel-border-glow {
  box-shadow: 
    inset -2px -2px 0 0 var(--muted),
    inset 2px 2px 0 0 var(--primary),
    var(--glow-green);
}

/* Neon text glow utilities */
.glow-green { text-shadow: var(--glow-green); }
.glow-pink  { text-shadow: var(--glow-pink); }
.glow-cyan  { text-shadow: var(--glow-cyan); }
.glow-gold  { text-shadow: var(--glow-gold); }

/* Glitch pseudo-elements — applied to elements with class "glitch" */
.glitch {
  position: relative;
}
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.glitch::before {
  color: var(--accent);
  animation: glitch1 0.3s infinite linear alternate-reverse;
}
.glitch::after {
  color: var(--secondary);
  animation: glitch2 0.3s infinite linear alternate-reverse;
}

@keyframes glitch1 {
  0%   { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 0); }
  20%  { clip-path: inset(92% 0 1% 0);  transform: translate(1px, 0); }
  40%  { clip-path: inset(43% 0 1% 0);  transform: translate(-1px, 0); }
  60%  { clip-path: inset(25% 0 58% 0); transform: translate(2px, 0); }
  80%  { clip-path: inset(54% 0 7% 0);  transform: translate(-1px, 0); }
  100% { clip-path: inset(58% 0 43% 0); transform: translate(1px, 0); }
}

@keyframes glitch2 {
  0%   { clip-path: inset(25% 0 58% 0); transform: translate(2px, 0); }
  20%  { clip-path: inset(54% 0 7% 0);  transform: translate(-2px, 0); }
  40%  { clip-path: inset(58% 0 43% 0); transform: translate(1px, 0); }
  60%  { clip-path: inset(40% 0 61% 0); transform: translate(-1px, 0); }
  80%  { clip-path: inset(92% 0 1% 0);  transform: translate(2px, 0); }
  100% { clip-path: inset(43% 0 1% 0);  transform: translate(-2px, 0); }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

@keyframes floatUp {
  0%   { transform: translateY(100vh) translateX(0px);  opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
}

@keyframes pixelBounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}

/* Confetti pieces */
@keyframes confettiFall {
  0%   { transform: translateY(-20px) rotate(0deg);   opacity: 1; }
  100% { transform: translateY(300px) rotate(720deg); opacity: 0; }
}

/* 8-bit style scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--primary); image-rendering: pixelated; }
```

- [ ] **Step 3: Update app/layout.tsx**

```typescript
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IBAD | Portfolio",
  description: "CS Student · Builder · Hacker · Robot Maker",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-text-main antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Verify fonts load**

Run `npm run dev` and open http://localhost:3000. Background should be near-black (`#0a0a0f`).

- [ ] **Step 5: Commit**

```bash
cd D:/portfolio
git add -A
git commit -m "feat: add global CSS, pixel theme, fonts, scanlines, noise texture"
```

---

## Task 3: Aceternity UI Components

**Files:**
- Create: `components/aceternity/BackgroundBeams.tsx`
- Create: `components/aceternity/CardSpotlight.tsx`
- Create: `components/aceternity/MovingBorder.tsx`
- Create: `components/aceternity/Spotlight.tsx`

- [ ] **Step 1: Create BackgroundBeams.tsx**

```typescript
// components/aceternity/BackgroundBeams.tsx
"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BackgroundBeams({ className }: { className?: string }) {
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
    "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
    "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
    "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
    "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
    "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
    "M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
    "M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811",
    "M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803",
  ];

  return (
    <div className={cn("absolute inset-0 h-full w-full overflow-hidden", className)}>
      <svg
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        viewBox="-500 -300 1400 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {paths.map((_, i) => (
            <motion.linearGradient
              key={i}
              id={`beam-gradient-${i}`}
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={{
                x1: ["0%", "100%"],
                x2: ["0%", "95%"],
                y1: ["0%", "100%"],
                y2: ["0%", "97%"],
              }}
              transition={{
                duration: 10 + i * 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                delay: i * 0.5,
              }}
            >
              <stop stopColor="#00ff9f" stopOpacity="0" />
              <stop stopColor="#00ff9f" />
              <stop offset="32.5%" stopColor="#00cfff" />
              <stop offset="100%" stopColor="#ff2d78" stopOpacity="0" />
            </motion.linearGradient>
          ))}
        </defs>
        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={path}
            stroke={`url(#beam-gradient-${i})`}
            strokeOpacity="0.4"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Create CardSpotlight.tsx**

```typescript
// components/aceternity/CardSpotlight.tsx
"use client";
import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardSpotlightProps {
  children: React.ReactNode;
  className?: string;
  radius?: number;
  color?: string;
}

export function CardSpotlight({
  children,
  className,
  radius = 350,
  color = "rgba(0, 255, 159, 0.15)",
}: CardSpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, ${color}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create MovingBorder.tsx**

```typescript
// components/aceternity/MovingBorder.tsx
"use client";
import { useRef } from "react";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: React.ElementType;
  [key: string]: unknown;
}

export function MovingBorder({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
  as: Component = "button",
  ...props
}: MovingBorderProps) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pct = (time % duration) / duration;
      progress.set(pct);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val * (pathRef.current?.getTotalLength() ?? 0))?.x ?? 0);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val * (pathRef.current?.getTotalLength() ?? 0))?.y ?? 0);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <Component
      className={cn("relative h-10 overflow-hidden bg-transparent p-[1px]", containerClassName)}
      {...props}
    >
      <div className="absolute inset-0">
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute h-full w-full" width="100%" height="100%">
          <rect fill="none" width="100%" height="100%" rx="0" ry="0" ref={pathRef} />
        </svg>
        <motion.div
          style={{ position: "absolute", top: 0, left: 0, display: "inline-block", transform }}
          className={cn("h-4 w-4 rounded-full opacity-80", borderClassName)}
        />
      </div>
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-primary/30 bg-bg text-sm antialiased",
          className
        )}
      >
        {children}
      </div>
    </Component>
  );
}
```

- [ ] **Step 4: Create Spotlight.tsx**

```typescript
// components/aceternity/Spotlight.tsx
"use client";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
  fill?: string;
}

export function Spotlight({ className, fill = "#00ff9f" }: SpotlightProps) {
  return (
    <svg
      className={cn("pointer-events-none absolute z-[1] h-[169%] w-[138%] opacity-50 lg:opacity-100", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse cx="1924.71" cy="273.501" rx="1924.71" ry="273.501" transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)" fill={fill} fillOpacity="0.21" />
      </g>
      <defs>
        <filter id="filter" x="0.860352" y="0.838989" width="3785.16" height="2840.26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
}
```

- [ ] **Step 5: Commit**

```bash
cd D:/portfolio
git add -A
git commit -m "feat: add Aceternity UI components (BackgroundBeams, CardSpotlight, MovingBorder, Spotlight)"
```

---

## Task 4: UI Primitives — Cursor, Glitch, Typewriter, ScrollProgress

**Files:**
- Create: `components/ui/PixelCursor.tsx`
- Create: `components/ui/GlitchText.tsx`
- Create: `components/ui/TypewriterText.tsx`
- Create: `components/ui/ScrollProgress.tsx`

- [ ] **Step 1: Create PixelCursor.tsx**

```typescript
// components/ui/PixelCursor.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const TRAIL_LENGTH = 8;

export function PixelCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailId = useRef(0);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const p = { x: e.clientX, y: e.clientY };
      setPos(p);
      setTrail((prev) => {
        const next = [{ ...p, id: trailId.current++ }, ...prev].slice(0, TRAIL_LENGTH);
        return next;
      });
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {/* Trail dots */}
      {trail.map((dot, i) => (
        <div
          key={dot.id}
          className="pointer-events-none fixed z-[9999] rounded-none"
          style={{
            left: dot.x - 2,
            top: dot.y - 2,
            width: 4,
            height: 4,
            backgroundColor: `rgba(0, 255, 159, ${1 - i / TRAIL_LENGTH})`,
            imageRendering: "pixelated",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed z-[9999]"
        style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
        animate={{ x: 0, y: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.2 }}
      >
        {/* Pixel crosshair */}
        <div className="relative w-5 h-5">
          <div className="absolute top-0 left-2 w-1 h-2 bg-primary" />
          <div className="absolute bottom-0 left-2 w-1 h-2 bg-primary" />
          <div className="absolute left-0 top-2 w-2 h-1 bg-primary" />
          <div className="absolute right-0 top-2 w-2 h-1 bg-primary" />
          <div className="absolute top-2 left-2 w-1 h-1 bg-accent" />
        </div>
      </motion.div>
    </>
  );
}
```

- [ ] **Step 2: Create GlitchText.tsx**

```typescript
// components/ui/GlitchText.tsx
"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  alwaysGlitch?: boolean;
}

export function GlitchText({ text, className, as: Tag = "span", alwaysGlitch = false }: GlitchTextProps) {
  const [glitching, setGlitching] = useState(alwaysGlitch);

  return (
    <Tag
      data-text={text}
      className={cn(
        "font-pixel relative inline-block select-none",
        (glitching || alwaysGlitch) && "glitch",
        className
      )}
      onMouseEnter={() => setGlitching(true)}
      onMouseLeave={() => !alwaysGlitch && setGlitching(false)}
    >
      {text}
    </Tag>
  );
}
```

- [ ] **Step 3: Create TypewriterText.tsx**

```typescript
// components/ui/TypewriterText.tsx
"use client";
import { useEffect, useState } from "react";

interface TypewriterTextProps {
  words: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
  className?: string;
  prefix?: string;
}

export function TypewriterText({
  words,
  speed = 80,
  deleteSpeed = 40,
  pauseMs = 1500,
  className = "",
  prefix = "",
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];

    if (!deleting && displayed === current) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }

    if (deleting && displayed === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () => {
        setDisplayed(deleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1));
      },
      deleting ? deleteSpeed : speed
    );
    return () => clearTimeout(t);
  }, [displayed, deleting, wordIdx, words, speed, deleteSpeed, pauseMs]);

  return (
    <span className={className}>
      {prefix}
      {displayed}
      <span className="animate-blink text-primary">_</span>
    </span>
  );
}
```

- [ ] **Step 4: Create ScrollProgress.tsx**

```typescript
// components/ui/ScrollProgress.tsx
"use client";
import { useScroll, useSpring, motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[9996] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #00ff9f, #00cfff, #ff2d78)",
        boxShadow: "0 0 8px #00ff9f",
      }}
    />
  );
}
```

- [ ] **Step 5: Commit**

```bash
cd D:/portfolio
git add -A
git commit -m "feat: add PixelCursor (with trail), GlitchText, TypewriterText, ScrollProgress"
```

---

## Task 5: UI Primitives — PixelProgressBar, MagneticButton, TiltCard, Confetti, EasterEgg

**Files:**
- Create: `components/ui/PixelProgressBar.tsx`
- Create: `components/ui/MagneticButton.tsx`
- Create: `components/ui/TiltCard.tsx`
- Create: `components/ui/Confetti.tsx`
- Create: `components/ui/EasterEgg.tsx`

- [ ] **Step 1: Create PixelProgressBar.tsx**

```typescript
// components/ui/PixelProgressBar.tsx
"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface PixelProgressBarProps {
  label: string;
  value: number; // 0-100
  color?: string;
}

export function PixelProgressBar({ label, value, color = "#00ff9f" }: PixelProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between mb-1 font-mono text-lg">
        <span style={{ color }}>{label}</span>
        <span className="text-muted">{value}%</span>
      </div>
      <div className="h-3 bg-muted/30 border border-muted" style={{ imageRendering: "pixelated" }}>
        <motion.div
          className="h-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
          initial={{ width: "0%" }}
          animate={inView ? { width: `${value}%` } : { width: "0%" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create MagneticButton.tsx**

```typescript
// components/ui/MagneticButton.tsx
"use client";
import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

export function MagneticButton({ children, className, onClick, strength = 30 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className="inline-block">
      <motion.button
        style={{ x: sx, y: sy }}
        onClick={onClick}
        className={cn("font-pixel text-xs px-6 py-3 transition-all duration-200", className)}
      >
        {children}
      </motion.button>
    </div>
  );
}
```

- [ ] **Step 3: Create TiltCard.tsx**

```typescript
// components/ui/TiltCard.tsx
"use client";
import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className, maxTilt = 12 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), { stiffness: 200, damping: 30 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), { stiffness: 200, damping: 30 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 1000 }}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Create Confetti.tsx**

```typescript
// components/ui/Confetti.tsx
"use client";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

const COLORS = ["#00ff9f", "#ff2d78", "#00cfff", "#ffd700", "#ff8c00"];
const PIECES = 40;

export function Confetti() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [fired, setFired] = useState(false);

  useEffect(() => {
    if (inView && !fired) setFired(true);
  }, [inView, fired]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      {fired &&
        Array.from({ length: PIECES }).map((_, i) => {
          const color = COLORS[i % COLORS.length];
          const left = Math.random() * 100;
          const delay = Math.random() * 1.5;
          const dur = 1.5 + Math.random() * 1;
          const size = 4 + Math.floor(Math.random() * 3) * 2;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${left}%`,
                top: "30%",
                width: size,
                height: size,
                backgroundColor: color,
                boxShadow: `0 0 4px ${color}`,
                imageRendering: "pixelated",
                animation: `confettiFall ${dur}s ${delay}s ease-in forwards`,
              }}
            />
          );
        })}
    </div>
  );
}
```

- [ ] **Step 5: Create EasterEgg.tsx**

```typescript
// components/ui/EasterEgg.tsx
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export function EasterEgg() {
  const [seq, setSeq] = useState<string[]>([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      setSeq((prev) => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.join(",") === KONAMI.join(",")) {
          setActive(true);
          setTimeout(() => setActive(false), 3000);
        }
        return next;
      });
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[9995] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full h-full overflow-hidden">
            {Array.from({ length: 80 }).map((_, i) => {
              const color = ["#00ff9f","#ff2d78","#00cfff","#ffd700"][i % 4];
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: 8,
                    height: 8,
                    backgroundColor: color,
                    boxShadow: `0 0 8px ${color}`,
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: [0, 3, 0], opacity: [1, 1, 0], x: (Math.random() - 0.5) * 400, y: (Math.random() - 0.5) * 400 }}
                  transition={{ duration: 2, delay: Math.random() * 0.5 }}
                />
              );
            })}
            <motion.p
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-pixel text-primary text-sm text-center glow-green"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              CHEAT CODE<br />ACTIVATED!
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 6: Commit**

```bash
cd D:/portfolio
git add -A
git commit -m "feat: add PixelProgressBar, MagneticButton, TiltCard, Confetti, EasterEgg"
```

---

## Task 6: NavBar

**Files:**
- Create: `components/ui/NavBar.tsx`

- [ ] **Step 1: Create NavBar.tsx**

```typescript
// components/ui/NavBar.tsx
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
```

- [ ] **Step 2: Commit**

```bash
cd D:/portfolio
git add -A
git commit -m "feat: add sticky NavBar with active section tracking"
```

---

## Task 7: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create Hero.tsx**

```typescript
// components/sections/Hero.tsx
"use client";
import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { BackgroundBeams } from "@/components/aceternity/BackgroundBeams";
import { MovingBorder } from "@/components/aceternity/MovingBorder";
import { GlitchText } from "@/components/ui/GlitchText";
import { TypewriterText } from "@/components/ui/TypewriterText";

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  dur: 6 + Math.random() * 6,
  size: 2 + Math.floor(Math.random() * 2) * 2,
}));

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), { stiffness: 100, damping: 30 });
  const bgX = useTransform(mouseX, [0, 1], [-20, 20]);
  const bgY = useTransform(mouseY, [0, 1], [-20, 20]);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="snap-section relative flex flex-col items-center justify-center overflow-hidden bg-bg"
    >
      <BackgroundBeams className="z-0" />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0 pointer-events-none"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.id % 3 === 0 ? "#00ff9f" : p.id % 3 === 1 ? "#00cfff" : "#ff2d78",
            imageRendering: "pixelated",
            animation: `floatUp ${p.dur}s ${p.delay}s linear infinite`,
            boxShadow: `0 0 6px currentColor`,
          }}
        />
      ))}

      {/* Main content with parallax */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <GlitchText
            text="IBAD"
            as="h1"
            className="text-primary glow-green"
            style={{ fontSize: "clamp(3rem, 12vw, 9rem)", lineHeight: 1.1 } as React.CSSProperties}
          />
        </motion.div>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-4"
        >
          <TypewriterText
            words={["CS Student", "Builder", "Hacker", "Robot Maker", "3× Hackathon Winner"]}
            className="font-mono text-2xl md:text-4xl text-secondary"
            prefix="> "
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-wrap gap-4 mt-10 justify-center"
        >
          <MovingBorder
            containerClassName="h-12 w-44"
            className="font-pixel text-[9px] text-primary border-primary/50 hover:bg-primary/10"
            borderClassName="bg-primary"
            onClick={() => scrollTo("projects")}
          >
            [ VIEW PROJECTS ]
          </MovingBorder>
          <a href="/Ibad_CV.pdf" download>
            <MovingBorder
              containerClassName="h-12 w-44"
              className="font-pixel text-[9px] text-accent border-accent/50 hover:bg-accent/10"
              borderClassName="bg-accent"
            >
              [ DOWNLOAD CV ]
            </MovingBorder>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-pixel text-[8px] text-muted flex flex-col items-center gap-2"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>SCROLL</span>
        <div className="w-2 h-2 bg-primary animate-[pixelBounce_1s_steps(4)_infinite]" />
      </motion.div>

      {/* Parallax bg layer */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary opacity-30" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent opacity-30" />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-secondary opacity-30" />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify by adding to page.tsx temporarily**

```typescript
// app/page.tsx (temporary test)
import { Hero } from "@/components/sections/Hero";
export default function Home() {
  return <main><Hero /></main>;
}
```

Run `npm run dev` — hero should show glitch name, typewriter, beams, particles.

- [ ] **Step 3: Commit**

```bash
cd D:/portfolio
git add -A
git commit -m "feat: Hero section with glitch, typewriter, parallax, particles, moving border CTAs"
```

---

## Task 8: About Section

**Files:**
- Create: `components/sections/About.tsx`

- [ ] **Step 1: Create About.tsx**

```typescript
// components/sections/About.tsx
"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function CountUp({ to, inView }: { to: number; inView: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 40);
    const interval = setInterval(() => {
      start = Math.min(start + step, to);
      setVal(start);
      if (start >= to) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [inView, to]);
  return <>{val}</>;
}

const STATS = [
  { label: "Projects Built",           value: 5,  suffix: "+" },
  { label: "Languages",                value: 7,  suffix: "" },
  { label: "Hackathons Won",           value: 3,  suffix: "🏆" },
  { label: "Open Source Contributions",value: 2,  suffix: "" },
];

const BIO_LINES = [
  "$ whoami",
  "> Ibad — CS Student @ Brunel University",
  "$ cat skills.txt",
  "> Full-Stack · Blockchain · AI · Robotics",
  "$ ls ./achievements",
  "> 3x Hackathon Winner",
  "> Object Retriever Robot",
  "> Starknet DeFi Game",
  "$ echo 'currently_building'",
  "> ClipForge AI",
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [typedLines, setTypedLines] = useState<string[]>([]);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      setTypedLines((prev) => [...prev, BIO_LINES[i]]);
      i++;
      if (i >= BIO_LINES.length) clearInterval(interval);
    }, 300);
    return () => clearInterval(interval);
  }, [inView]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" ref={ref} className="snap-section relative flex items-center bg-bg px-6 py-20">
      {/* Corner brackets */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-primary opacity-60" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-primary opacity-60" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-primary opacity-60" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-primary opacity-60" />

      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          className="font-pixel text-primary text-lg md:text-2xl mb-12 glow-green"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          &gt; ABOUT_ME
          <span className="animate-blink">_</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-6"
          >
            {STATS.map(({ label, value, suffix }) => (
              <motion.div
                key={label}
                variants={itemVariants}
                className="border border-muted p-4 hover:border-primary transition-colors duration-300"
                style={{ imageRendering: "pixelated" }}
              >
                <div className="font-pixel text-3xl text-primary glow-green">
                  <CountUp to={value} inView={inView} />{suffix}
                </div>
                <div className="font-mono text-lg text-muted mt-1">{label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Terminal bio */}
          <div className="border border-muted p-4 font-mono text-lg bg-black/30 min-h-[240px]">
            <div className="flex gap-2 mb-3">
              <div className="w-2 h-2 rounded-none bg-accent" />
              <div className="w-2 h-2 rounded-none bg-primary" style={{ backgroundColor: "#ffd700" }} />
              <div className="w-2 h-2 rounded-none bg-primary" />
            </div>
            {typedLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={line.startsWith("$") ? "text-primary" : "text-text-main"}
              >
                {line}
              </motion.p>
            ))}
            {typedLines.length < BIO_LINES.length && (
              <span className="text-primary animate-blink">_</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd D:/portfolio
git add -A
git commit -m "feat: About section with count-up stats and terminal typing bio"
```

---

## Task 9: Skills Section

**Files:**
- Create: `components/sections/Skills.tsx`

- [ ] **Step 1: Create Skills.tsx**

```typescript
// components/sections/Skills.tsx
"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { PixelProgressBar } from "@/components/ui/PixelProgressBar";

const SKILLS = {
  Languages: [
    { name: "TypeScript", value: 85 },
    { name: "JavaScript", value: 88 },
    { name: "Python",     value: 78 },
    { name: "C#",         value: 65 },
    { name: "Rust",       value: 50 },
    { name: "C++",        value: 55 },
    { name: "Java",       value: 60 },
  ],
  Frontend: [
    { name: "React / Next.js", value: 88 },
    { name: "Tailwind CSS",    value: 85 },
    { name: "Framer Motion",   value: 75 },
    { name: "HTML / CSS",      value: 90 },
  ],
  Backend: [
    { name: "Node / Express", value: 80 },
    { name: "FastAPI",        value: 70 },
    { name: "Socket.io",      value: 68 },
    { name: "PostgreSQL",     value: 65 },
    { name: "MongoDB",        value: 70 },
  ],
  Tools: [
    { name: "Docker",       value: 60 },
    { name: "Vercel",       value: 85 },
    { name: "Figma",        value: 70 },
    { name: "Raspberry Pi", value: 72 },
    { name: "Git",          value: 88 },
  ],
};

const COLORS: Record<string, string> = {
  Languages: "#00ff9f",
  Frontend:  "#00cfff",
  Backend:   "#ff2d78",
  Tools:     "#ffd700",
};

type Category = keyof typeof SKILLS;

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<Category>("Languages");

  return (
    <section id="skills" ref={ref} className="snap-section flex items-center bg-bg px-6 py-20">
      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          className="font-pixel text-primary text-lg md:text-2xl mb-10 glow-green"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          &gt; SKILL_TREE<span className="animate-blink">_</span>
        </motion.h2>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {(Object.keys(SKILLS) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className="font-pixel text-[8px] px-4 py-2 border transition-all duration-200"
              style={{
                borderColor: activeTab === cat ? COLORS[cat] : "#3a3a4a",
                color: activeTab === cat ? COLORS[cat] : "#3a3a4a",
                boxShadow: activeTab === cat ? `0 0 10px ${COLORS[cat]}40` : "none",
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Progress bars */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 gap-x-12"
        >
          {SKILLS[activeTab].map((skill) => (
            <PixelProgressBar
              key={skill.name}
              label={skill.name}
              value={skill.value}
              color={COLORS[activeTab]}
            />
          ))}
        </motion.div>

        {/* Skill badges */}
        <motion.div
          className="flex flex-wrap gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {SKILLS[activeTab].map((skill, i) => (
            <motion.span
              key={skill.name}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.05, type: "spring", stiffness: 300 }}
              className="font-mono text-base px-3 py-1 border"
              style={{
                borderColor: COLORS[activeTab],
                color: COLORS[activeTab],
                boxShadow: `0 0 6px ${COLORS[activeTab]}40`,
                imageRendering: "pixelated",
              }}
            >
              {skill.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd D:/portfolio
git add -A
git commit -m "feat: Skills section with tabbed categories and animated pixel progress bars"
```

---

## Task 10: Projects Section

**Files:**
- Create: `components/sections/Projects.tsx`

- [ ] **Step 1: Create Projects.tsx**

```typescript
// components/sections/Projects.tsx
"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CardSpotlight } from "@/components/aceternity/CardSpotlight";
import { TiltCard } from "@/components/ui/TiltCard";

const PROJECTS = [
  {
    name: "HackTheWallet",
    desc: "Blockchain game where you convince an AI to give back your crypto. Built on Starknet.",
    tags: ["Next.js", "Starknet", "Gemini AI", "TypeScript"],
    url: "https://github.com/Sahid-m/HackTheWallet",
    color: "#00ff9f",
    contributed: true,
  },
  {
    name: "luffa-ai-bot",
    desc: "LangGraph multi-tool AI assistant integrated with Luffa Bot messaging platform.",
    tags: ["Python", "LangGraph", "FastAPI", "LangChain"],
    url: "https://github.com/Sahid-m/luffa-ai-bot",
    color: "#ff2d78",
    contributed: true,
  },
  {
    name: "clipforge-ai",
    desc: "AI-powered video clipping and editing tool built with TypeScript.",
    tags: ["TypeScript", "AI", "Video"],
    url: "https://github.com/Ibad-10/clipforge-ai",
    color: "#00cfff",
    contributed: false,
  },
  {
    name: "Atmos_Task",
    desc: "Supermarket checkout system with automated discount engine and SKU scanning.",
    tags: ["C#", "OOP", "CLI"],
    url: "https://github.com/Ibad-10/Atmos_Task",
    color: "#ffd700",
    contributed: false,
  },
];

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="snap-section flex items-center bg-bg px-6 py-20">
      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          className="font-pixel text-primary text-lg md:text-2xl mb-10 glow-green"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          &gt; PROJECTS<span className="animate-blink">_</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <TiltCard>
                <CardSpotlight
                  className="h-full border p-5 transition-all duration-300 group"
                  color={`${project.color}18`}
                  style={{
                    borderColor: "#3a3a4a",
                    background: "#0d0d14",
                  } as React.CSSProperties}
                >
                  <div
                    className="border"
                    style={{ borderColor: project.color, boxShadow: `0 0 20px ${project.color}20` }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${project.color}50`;
                      (e.currentTarget as HTMLDivElement).style.borderColor = project.color;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${project.color}20`;
                    }}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-pixel text-[10px] md:text-xs" style={{ color: project.color }}>
                          {project.name}
                        </h3>
                        {project.contributed && (
                          <span className="font-mono text-xs px-2 py-0.5 border border-accent text-accent ml-2 shrink-0">
                            CONTRIB
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-base text-text-main/80 mb-4 leading-relaxed">{project.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-xs px-2 py-0.5 border"
                            style={{ borderColor: `${project.color}60`, color: `${project.color}cc` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-pixel text-[8px] transition-colors duration-200"
                        style={{ color: project.color }}
                        onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.textShadow = `0 0 8px ${project.color}`)}
                        onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.textShadow = "none")}
                      >
                        [ VIEW ON GITHUB ] →
                      </a>
                    </div>
                  </div>
                </CardSpotlight>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd D:/portfolio
git add -A
git commit -m "feat: Projects section with CardSpotlight, TiltCard 3D, glow borders"
```

---

## Task 11: Hackathons Section

**Files:**
- Create: `components/sections/Hackathons.tsx`

- [ ] **Step 1: Create Hackathons.tsx**

```typescript
// components/sections/Hackathons.tsx
"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Spotlight } from "@/components/aceternity/Spotlight";
import { TiltCard } from "@/components/ui/TiltCard";
import { Confetti } from "@/components/ui/Confetti";

const WINS = [
  {
    event: "Encode Hackathon",
    prize: "1ST PLACE",
    org: "Encode Club",
    desc: "Built HackTheWallet — a Starknet blockchain game where players convince an AI to return crypto.",
    color: "#ffd700",
    icon: "🏆",
  },
  {
    event: "Brunel Hack",
    prize: "1ST PLACE",
    org: "Brunel University",
    desc: "Won the university hackathon with an AI + blockchain solution built in under 24 hours.",
    color: "#ffd700",
    icon: "🏆",
  },
  {
    event: "Royal Holloway Hackathon",
    prize: "1ST PLACE",
    org: "Royal Holloway University",
    desc: "Top prize at Royal Holloway's hackathon, competing against teams from multiple universities.",
    color: "#ffd700",
    icon: "🏆",
  },
];

export function Hackathons() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="hackathons" ref={ref} className="snap-section relative flex items-center bg-bg px-6 py-20 overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60" fill="#ffd700" />
      <Confetti />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <motion.h2
          className="font-pixel text-lg md:text-2xl mb-4 glow-gold"
          style={{ color: "#ffd700" }}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          &gt; ACHIEVEMENTS<span className="animate-blink" style={{ color: "#ffd700" }}>_</span>
        </motion.h2>
        <motion.p
          className="font-mono text-xl text-muted mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          3× Hackathon Winner
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {WINS.map((win, i) => (
            <motion.div
              key={win.event}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.15 + 0.2, duration: 0.5, type: "spring", stiffness: 150 }}
            >
              <TiltCard maxTilt={8}>
                <div
                  className="border p-6 h-full flex flex-col gap-4 transition-all duration-300 cursor-pointer group"
                  style={{
                    borderColor: "#ffd70060",
                    background: "linear-gradient(135deg, #0d0d14, #1a1500)",
                    boxShadow: "0 0 20px #ffd70010",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 40px #ffd70030, inset 0 0 20px #ffd70008";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#ffd700";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px #ffd70010";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#ffd70060";
                  }}
                >
                  <div className="text-4xl">{win.icon}</div>
                  <div
                    className="font-pixel text-[8px] px-3 py-1 border self-start"
                    style={{ borderColor: "#ffd700", color: "#ffd700", boxShadow: "0 0 8px #ffd70060" }}
                  >
                    {win.prize}
                  </div>
                  <h3 className="font-pixel text-[9px] text-text-main leading-relaxed">{win.event}</h3>
                  <p className="font-mono text-base text-muted">{win.org}</p>
                  <p className="font-mono text-base text-text-main/80 leading-relaxed flex-1">{win.desc}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd D:/portfolio
git add -A
git commit -m "feat: Hackathons section with 3 winner cards, confetti, gold glow, TiltCard 3D"
```

---

## Task 12: Robot Demo Section

**Files:**
- Create: `components/sections/RobotDemo.tsx`

- [ ] **Step 1: Create RobotDemo.tsx**

```typescript
// components/sections/RobotDemo.tsx
"use client";
import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

export function RobotDemo() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rx = useSpring(useTransform(mouseY, [0, 1], [4, -4]), { stiffness: 100, damping: 30 });
  const ry = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), { stiffness: 100, damping: 30 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <section id="robot" ref={ref} className="snap-section flex items-center bg-bg px-6 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <motion.h2
          className="font-pixel text-primary text-lg md:text-2xl mb-4 glow-green"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          &gt; OBJECT_RETRIEVER_BOT<span className="animate-blink">_</span>
        </motion.h2>
        <motion.p
          className="font-mono text-xl text-muted mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          Autonomous robot that detects and retrieves objects using computer vision + Raspberry Pi
        </motion.p>

        {/* CRT Monitor frame with video */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          onMouseMove={handleMove}
          onMouseLeave={() => { mouseX.set(0.5); mouseY.set(0.5); }}
        >
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 1000 }}
            className="relative"
          >
            {/* Monitor outer frame */}
            <div
              className="border-4 p-2 relative"
              style={{
                borderColor: "#3a3a4a",
                boxShadow: "0 0 30px #00ff9f20, inset 0 0 20px #00000060",
                background: "#0a0a0f",
              }}
            >
              {/* Monitor top bar */}
              <div className="flex gap-2 p-2 border-b border-muted mb-2 items-center">
                <div className="w-2 h-2 bg-accent" />
                <div className="w-2 h-2" style={{ backgroundColor: "#ffd700" }} />
                <div className="w-2 h-2 bg-primary" />
                <span className="font-pixel text-[7px] text-muted ml-2">robot_demo.mp4</span>
              </div>

              {/* Scanline overlay on video */}
              <div className="relative overflow-hidden">
                <video
                  src="/robot-demo.mp4"
                  controls
                  muted
                  loop
                  className="w-full block"
                  style={{ display: "block", maxHeight: "60vh" }}
                />
                {/* Scanlines on top of video */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)",
                  }}
                />
                {/* CRT glow edges */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 60px rgba(0, 255, 159, 0.08)" }}
                />
              </div>
            </div>

            {/* Monitor stand */}
            <div className="flex justify-center">
              <div className="w-16 h-4 border border-t-0 border-muted" />
            </div>
            <div className="flex justify-center">
              <div className="w-24 h-2 border border-t-0 border-muted" />
            </div>
          </motion.div>
        </motion.div>

        {/* Tech badges */}
        <motion.div
          className="flex flex-wrap gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          {["Raspberry Pi", "Computer Vision", "Python", "OpenCV", "Servo Motors"].map((tech) => (
            <span
              key={tech}
              className="font-mono text-base px-3 py-1 border border-primary/40 text-primary/80"
              style={{ boxShadow: "0 0 6px #00ff9f20" }}
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Copy video to public folder**

```bash
cd D:/portfolio
cp "D:/portfolio/automated object retriver.mp4" public/robot-demo.mp4
cp "D:/portfolio/Ibad_CV.pdf" public/Ibad_CV.pdf
```

- [ ] **Step 3: Commit**

```bash
cd D:/portfolio
git add -A
git commit -m "feat: RobotDemo section with CRT monitor frame, scanlines, 3D tilt, video player"
```

---

## Task 13: Contact Section + Footer

**Files:**
- Create: `components/sections/Contact.tsx`

- [ ] **Step 1: Create Contact.tsx**

```typescript
// components/sections/Contact.tsx
"use client";
import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { MovingBorder } from "@/components/aceternity/MovingBorder";
import { MagneticButton } from "@/components/ui/MagneticButton";

const LINKS = [
  { label: "$ open github",   href: "https://github.com/Ibad-10",            display: "github.com/Ibad-10",         color: "#00ff9f" },
  { label: "$ open email",    href: "mailto:iyaduzuberi0@gmail.com",           display: "iyaduzuberi0@gmail.com",     color: "#00cfff" },
  { label: "$ open linkedin", href: "https://linkedin.com/in/sahidm",          display: "linkedin.com/in/sahidm",     color: "#ff2d78" },
];

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  const inputClass = `
    w-full bg-transparent border border-muted font-mono text-xl px-3 py-2 text-text-main outline-none
    focus:border-primary transition-colors duration-200
    [&:focus]:shadow-[0_0_8px_#00ff9f40]
  `;

  return (
    <section id="contact" ref={ref} className="snap-section flex flex-col items-center justify-center bg-bg px-6 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <motion.h2
          className="font-pixel text-primary text-lg md:text-2xl mb-10 glow-green"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          &gt; CONTACT<span className="animate-blink">_</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Terminal links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <p className="font-mono text-xl text-muted mb-6">// Find me here</p>
            {LINKS.map(({ label, href, display, color }, i) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-mono text-lg group"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 8 }}
              >
                <span className="text-muted">{label} </span>
                <span
                  className="transition-all duration-200 group-hover:underline"
                  style={{ color, textShadow: `0 0 0px ${color}` }}
                  onMouseEnter={(e) => ((e.target as HTMLSpanElement).style.textShadow = `0 0 8px ${color}`)}
                  onMouseLeave={(e) => ((e.target as HTMLSpanElement).style.textShadow = "none")}
                >
                  {display}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div>
              <label className="font-mono text-base text-muted block mb-1">$ name</label>
              <input
                required
                className={inputClass}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="your_name"
              />
            </div>
            <div>
              <label className="font-mono text-base text-muted block mb-1">$ email</label>
              <input
                required
                type="email"
                className={inputClass}
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="font-mono text-base text-muted block mb-1">$ message</label>
              <textarea
                required
                rows={4}
                className={inputClass + " resize-none"}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Hello Ibad, ..."
              />
            </div>
            <MagneticButton
              className="border border-primary text-primary hover:bg-primary/10 w-full justify-center font-pixel text-[9px]"
              onClick={() => {}}
            >
              {sent ? "[ MESSAGE SENT ✓ ]" : "[ SEND MESSAGE ]"}
            </MagneticButton>
          </motion.form>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-16 pt-8 border-t border-muted text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="font-pixel text-[8px] text-muted">
            [ IBAD © 2026 ] · Built with Next.js + Framer Motion
          </p>
          <div className="flex justify-center gap-1 mt-3">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-primary/30"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, delay: i * 0.08, repeat: Infinity }}
              />
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
cd D:/portfolio
git add -A
git commit -m "feat: Contact section with terminal links, form, magnetic button, footer"
```

---

## Task 14: Main Page Assembly

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace app/page.tsx**

```typescript
// app/page.tsx
"use client";
import { Hero }       from "@/components/sections/Hero";
import { About }      from "@/components/sections/About";
import { Skills }     from "@/components/sections/Skills";
import { Projects }   from "@/components/sections/Projects";
import { Hackathons } from "@/components/sections/Hackathons";
import { RobotDemo }  from "@/components/sections/RobotDemo";
import { Contact }    from "@/components/sections/Contact";
import { NavBar }           from "@/components/ui/NavBar";
import { PixelCursor }      from "@/components/ui/PixelCursor";
import { ScrollProgress }   from "@/components/ui/ScrollProgress";
import { EasterEgg }        from "@/components/ui/EasterEgg";

export default function Home() {
  return (
    <>
      <PixelCursor />
      <ScrollProgress />
      <NavBar />
      <EasterEgg />
      <main className="snap-container">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Hackathons />
        <RobotDemo />
        <Contact />
      </main>
    </>
  );
}
```

- [ ] **Step 2: Update layout.tsx to add scroll container metadata**

```typescript
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IBAD | Portfolio",
  description: "CS Student · Builder · 3× Hackathon Winner · Robot Maker",
  openGraph: {
    title: "IBAD | Portfolio",
    description: "CS Student · Builder · 3× Hackathon Winner · Robot Maker",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body className="bg-bg text-text-main antialiased" style={{ height: "100%", overflow: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify full site in browser**

Run `npm run dev` and open http://localhost:3000.

Checklist:
- [ ] Hero shows name + glitch + typewriter + particles + beams
- [ ] Scrolling snaps between sections
- [ ] Custom pixel cursor + trail visible
- [ ] NavBar appears after scrolling past hero
- [ ] Active section dot moves as you scroll
- [ ] About: stat counters + terminal typing
- [ ] Skills: tabs switch categories, progress bars animate
- [ ] Projects: 4 cards with tilt, spotlight, glow
- [ ] Hackathons: 3 gold cards + confetti burst
- [ ] Robot Demo: CRT monitor video player
- [ ] Contact: terminal links + form + footer
- [ ] Konami code (↑↑↓↓←→←→BA) triggers easter egg

- [ ] **Step 4: Fix any TypeScript errors**

```bash
cd D:/portfolio
npx tsc --noEmit
```

Fix any reported errors before committing.

- [ ] **Step 5: Commit**

```bash
cd D:/portfolio
git add -A
git commit -m "feat: assemble full portfolio — all 7 sections, cursor, nav, easter egg"
```

---

## Task 15: Vercel Deployment

**Files:**
- Create: `next.config.ts` (update for video)

- [ ] **Step 1: Update next.config.ts to allow large video**

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
};

export default nextConfig;
```

- [ ] **Step 2: Create GitHub repo and push**

```bash
cd D:/portfolio
git remote add origin https://github.com/Ibad-10/ibad-portfolio.git
git branch -M main
git push -u origin main
```

(Create the repo at https://github.com/new first — name it `ibad-portfolio`, public, no README)

- [ ] **Step 3: Deploy to Vercel**

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select `Ibad-10/ibad-portfolio`
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy**

Expected: Vercel builds and gives URL `ibad-portfolio.vercel.app`

- [ ] **Step 4: Verify live deployment**

Open `https://ibad-portfolio.vercel.app` and run the full checklist from Task 14 Step 3.

- [ ] **Step 5: Final commit**

```bash
cd D:/portfolio
git add -A
git commit -m "feat: production deployment config"
git push origin main
```

---

## Self-Review

### Spec Coverage Check

| Spec requirement | Task |
|---|---|
| Press Start 2P + VT323 fonts | Task 2 |
| CSS vars, scanlines, noise | Task 2 |
| Custom pixel cursor + trail | Task 4 |
| BackgroundBeams on hero | Tasks 3, 7 |
| Glitch text on hero name | Tasks 4, 7 |
| Typewriter subtitle | Tasks 4, 7 |
| Parallax mouse on hero | Task 7 |
| Floating particles | Task 7 |
| MovingBorder CTAs | Tasks 3, 7 |
| Scroll progress bar | Task 4 |
| Sticky nav with active dot | Task 6 |
| About count-up stats | Task 8 |
| Terminal typing bio | Task 8 |
| Tabbed skills + progress bars | Task 9 |
| Projects CardSpotlight | Tasks 3, 10 |
| TiltCard 3D on cards | Tasks 5, 10, 11 |
| Contribution badge on 2 projects | Task 10 |
| Hackathons 3 winner cards | Task 11 |
| Confetti burst | Tasks 5, 11 |
| Gold glow on hackathon cards | Task 11 |
| CRT monitor video player | Task 12 |
| Scanline overlay on video | Task 12 |
| CV download button | Task 7 |
| Contact terminal links | Task 13 |
| Contact form | Task 13 |
| MagneticButton | Tasks 5, 13 |
| Scroll-snap sections | Task 2 |
| Konami code easter egg | Tasks 5, 14 |
| Vercel deployment | Task 15 |

All requirements covered. No gaps found.
