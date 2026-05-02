# Portfolio Redesign — Design Spec
**Date:** 2026-05-01

## Overview

Full redesign of Ibad Uzuberi's Next.js portfolio. Replacing retro 8-bit cyberpunk aesthetic with a Full Bleed Immersive dark style inspired by shader.se, itomdev.com, and awwwards-level portfolios.

---

## Aesthetic Direction — H: FULL BLEED IMMERSIVE

**Style:** Immersive dark. Ghost typography layered behind content. Noise texture. Stats bar. Red ticker. Feels alive, not static.

**Palette:**
- Background: `#050505` (near-pure black)
- Primary text: `#FFFFFF`
- Accent: `#FF4D2D` (electric red-orange)
- Ghost/outline type: `rgba(255,77,45,0.15)` (faint red outline)
- Muted: `#333333`
- Subtle border: `rgba(255,255,255,0.05)`

**Typography:**
- Display: `Unbounded` (900 weight — hero name, section numbers, stats)
- Body/UI: `IBM Plex Mono` (labels, descriptions, nav, metadata)
- `Syne` (subheadings, card titles)

**Signature effects:**
- Giant ghost name `IBAD IBAD` text behind hero at 3–5% opacity
- Solid `IBAD` in white + outline `UZUBERI` in red stroke layered on top
- Noise texture overlay (SVG feTurbulence, ~2% opacity)
- Red ticker tape (`#FF4D2D` strip, continuous scroll animation)
- Stats bar with `3×` / `5+` / `7` in heavy Unbounded
- Availability dot (green pulse)
- Section index numbers `01 / 05` top right

---

## Interactivity

- **Custom cursor:** Small white circle that grows + inverts on hover over links/buttons. Blend mode `mix-blend-mode: difference`.
- **Ticker tape:** `animation: ticker 20s linear infinite` — achievement scroll on red strip
- **Hover on project cards:** Subtle red left border + lift 4px + opacity change on number
- **Photography gallery:** Hover = scale 1.04 + black overlay + white "VIEW" text fades in. Click = lightbox modal.
- **Magnetic buttons:** CTAs pulled toward cursor (existing MagneticButton component, restyled)
- **Staggered entrance animations:** Framer Motion `useInView` — elements slide up with stagger on scroll
- **Stats counter:** Numbers count up when About enters viewport
- **Scroll progress:** Thin `#FF4D2D` line at very top of viewport
- **Nav highlight:** Active section underline tracks scroll position
- **Mobile:** All hover states become tap states. Ticker still animates. No scroll-snap (standard scroll).

---

## Sections

### 01 — Hero
- **Full viewport height**
- **Background layers (back to front):**
  1. `#050505` base
  2. Ghost text `IBAD\nIBAD` — Unbounded 900, ~180px, `rgba(255,255,255,0.025)`, absolute top-left, overflow hidden
  3. Noise SVG texture overlay
  4. Radial glow: subtle red `rgba(255,77,45,0.04)` top-right corner
- **Top bar:** `I.UZUBERI` logo left · `01 / 05 · LONDON` right — separated by `border-bottom: 1px solid rgba(255,255,255,0.05)`
- **Hero content (centered vertically, padding left):**
  - Label: `Vol. 01 · Portfolio · 2026` — IBM Plex Mono, 11px, `#333`, letter-spacing 0.3em
  - Name: `IBAD` solid white + `UZUBERI` outline (`-webkit-text-stroke: 1.5px rgba(255,77,45,0.5)`, transparent fill) — Unbounded 900, ~100–120px on desktop
  - Below name: thin `#FF4D2D` horizontal rule, 40px wide
  - Subtitle: `CS Student · Builder · Hackathon Winner` — IBM Plex Mono, 12px, `#555`
- **Red ticker strip** below hero content (not at very bottom — mid-lower):
  - Background `#FF4D2D`, padding `8px 0`, continuous scroll
  - Text: `ENCODE HACKATHON WINNER · BRUNEL UNIVERSITY WINNER · ROYAL HOLLOWAY WINNER · FULL-STACK DEVELOPER · BLOCKCHAIN · AI · ROBOTICS · AVAILABLE FOR WORK ·`
- **Stats bar** at very bottom of hero (above fold break):
  - 3 columns: `3×` Hackathon Wins · `5+` Projects Built · `7` Languages
  - Separated by `rgba(255,255,255,0.05)` vertical dividers
  - Numbers in Unbounded 900, labels in IBM Plex Mono 8px `#333`
- **Scroll indicator:** `↓ SCROLL` blinking at bottom center, IBM Plex Mono
- **Mobile:** Ghost text smaller, name ~64px, ticker still scrolls

### 02 — About
- **Background:** `#080808` (barely lighter than hero)
- **Layout:** 2 col on desktop. Left: bio text + section label. Right: tuxedo photo + hackathon photo stacked.
- **Left:**
  - Section label: `[ 02 ] — ABOUT` in IBM Plex Mono red
  - Bio headline: `Builder by nature,` / `hacker by choice.` — Unbounded 700, large
  - Bio copy: *CS student at Brunel University, London. I build things that matter — full-stack apps, blockchain protocols, AI tools, and robots that actually work. Three hackathons entered. Three won. Currently shipping ClipForge, an AI-powered video editor. Open to internships, collaborations, and interesting problems.*
- **Right:** Tuxedo photo (`public/photos/hero.jpeg`) + hackathon presenting photo below, both with subtle red corner brackets decoration
- **Stats:** 4 animated count-up boxes (same as current About but restyled to match new aesthetic — dark borders, Unbounded numbers, mono labels)
- **Mobile:** Single column, photos below text

### 03 — Skills
- **Background:** `#050505`
- **Layout:** 4 category columns (Languages, Frontend, Backend, Tools)
- **Style:** Pill tags only. Black-bordered pills on dark bg. Active/hot skills get `#FF4D2D` border + color.
- **Section header:** `[ 03 ] — SKILLS` same pattern
- **Mobile:** 2-col grid of pills

### 04 — Projects
- **Background:** `#080808`
- **Layout:** 2×2 grid, each card is a heavy dark panel
- **Card structure:**
  - Large ghost number `01`–`04` top-left (Unbounded, very large, `rgba(255,255,255,0.03)`)
  - Project name in Unbounded 700
  - 1-line description in IBM Plex Mono
  - Tag pills
  - GitHub arrow link → bottom right
- **Hover:** red left border (3px) appears, card lifts 4px, ghost number opacity increases slightly
- **Mobile:** Single column cards

### 05 — Hackathons
- **Background:** alternating `#050505` / `#080808` per block
- **Layout:** 3 full-width editorial blocks, stacked
- **Each block:** `★ 1st Place` label (red) · Event name huge Unbounded · Award · Date · 1-line description
- **Left edge:** `[ 05 ]` vertical text rotated 90°

### 06 — Photography
- **Section label:** `[ 06 ] — THROUGH THE LENS`
- **Subtitle:** `Street · Architecture · London`
- **Layout:** Masonry grid, 3 cols desktop / 2 tablet / 1 mobile
- **6 curated shots (in display order):**
  1. Lamborghini Kensington — spans 2 rows (hero of gallery)
  2. Golden brick building at sunset — architecture
  3. City skyline tower dusk — urban scale
  4. Street canyon sunset — geometric
  5. Jack Sparrow street — documentary
  6. Graffiti girl — urban lifestyle
- **Hover:** `scale(1.03)` + black overlay 60% opacity + white `VIEW` text + photo title fades in
- **Click:** Lightbox — dark overlay, full-size image, close on click/escape
- **Background:** `#050505`

### 07 — Contact
- **Background:** `#080808`
- **Layout:** Left col = headline + socials. Right col = form.
- **Headline:** `LET'S BUILD` / `SOMETHING.` — Unbounded 900, large, with `SOMETHING.` in red outline style
- **Socials (all real `<a>` tags, open in new tab):**
  - `↗ github.com/Ibad-10` → `https://github.com/Ibad-10`
  - `↗ zuberi.ibad@gmail.com` → `mailto:zuberi.ibad@gmail.com`
  - `↗ linkedin.com/in/ibad-ullah-zuberi` → `https://www.linkedin.com/in/ibad-ullah-zuberi/`
- **Form fields:** Name, Email, Message — dark bg, `rgba(255,255,255,0.05)` border, white text, red focus ring
- **Submit button:** MagneticButton restyled — `#FF4D2D` fill, Unbounded label `SEND →`
- **Footer:** `IBAD UZUBERI © 2026 · LONDON` — IBM Plex Mono, centered, `#333`

---

## Navigation

- Fixed top nav, `position: fixed`, `background: rgba(5,5,5,0.85)`, `backdrop-filter: blur(12px)`
- Logo: `I.UZUBERI` left — Unbounded 700
- Links: `WORK · ABOUT · SKILLS · CONTACT` — IBM Plex Mono, uppercase, `#555`, hover → `#fff`
- Active section: thin `#FF4D2D` underline 2px
- Mobile: hamburger → full-screen overlay menu

---

## Technical Notes

- **Framework:** Next.js 14 App Router (existing)
- **Animations:** Framer Motion (existing) — `useInView`, `motion.div`, `useSpring`
- **Fonts:** Add `Unbounded`, `IBM Plex Mono`, `Syne` via `next/font/google`
- **Remove entirely:**
  - All pixel/retro components: `GlitchText`, `PixelCursor`, `PixelProgressBar`, `TypewriterText`
  - Aceternity components: `BackgroundBeams`, `CardSpotlight`, `MovingBorder`, `Spotlight`
  - Old CSS variables (neon green, cyan, pink, pixel fonts)
  - `scroll-snap` from globals.css
  - CRT scanlines + noise (replacing with new noise)
- **Keep/restyle:** `MagneticButton`, `ScrollProgress`, `NavBar`, `EasterEgg` (keep konami)
- **New components needed:**
  - `CustomCursor` (white circle, mix-blend-mode difference)
  - `Ticker` (red strip continuous scroll)
  - `Lightbox` (photography modal)
  - `GhostText` (large background text layer)
- **Mobile:** Standard scroll (no snap). All grids → 1-col. Touch tap states replace hover.
- **Accessibility:** Alt text on all images, keyboard nav for lightbox, contrast AA pass.

---

## Content Rewrites — All Sections

### Hero
**Name display:** `IBAD ULLAH` (solid white) + `ZUBERI` (red outline/ghost)
**Subtitle line:** `BEng Computer Systems Engineering @ Brunel · BMW Logistics Intern · AI + Robotics Builder`
**Vol label:** `Vol. 01 · Portfolio · 2026`
**Ticker tape:**
> `ENCODE AI HACKATHON — 1ST PLACE · BRUNEL HACK — 1ST PLACE · RADIX HACK — 1ST PLACE · BMW GROUP INTERN · EY DATA ANALYST · AUTONOMOUS ROBOT 95% ACCURACY · BLOCKCHAIN DEVELOPER · AI BUILDER · LONDON · OPEN TO INTERNSHIPS SUMMER 2026 ·`

**CTA buttons:** `VIEW WORK` + `DOWNLOAD CV`
**Scroll hint:** `↓ SCROLL`

---

### About
**Section label:** `[ 02 ] — ABOUT`
**Headline (2 lines, big type):**
> Builder by nature,
> hacker by choice.

**Bio paragraph:**
> BEng Computer Systems Engineering at Brunel University London — Predicted First Class, ranked 1st out of 30. Currently a Logistics Planning Intern (Controls & Automation) at BMW Group, writing PLC logic and supporting Industry 4.0 projects in a live engine manufacturing plant. Previously at EY, where I analysed 20,000+ data entries and cut interpretation time by 25%. I build things that work: blockchain games that win hackathons, AI agents, autonomous robots with 95% retrieval accuracy, and decentralised payment platforms. Open to high-impact engineering internships, Summer 2026.

**Experience strip (horizontal, subtle — between bio and stats):**
- BMW Group · Logistics Planning Intern (Controls & Automation) · Jul 2025–Present
- EY · Data Analyst · Jul–Sep 2024
- Cloud Nebula Enterprises · Web Developer · Jun–Sep 2024

**Stats (count-up):**
- `1st` — Out of 30 (Year Topper)
- `8+` — Projects Shipped
- `4×` — Hackathon Podiums
- `95%` — Robot Retrieval Accuracy

---

### Skills
**Section label:** `[ 03 ] — SKILLS`
**6 categories (expanded from CV), pills only, no progress bars:**

Web & Software: TypeScript · JavaScript · Python · C · C++ · Java · MATLAB · SQL · VBA · Assembly · Verilog HDL
Frontend: React / Next.js · Tailwind CSS · Framer Motion · HTML / CSS
Backend: Node / Express · FastAPI · Flask · Socket.io · PostgreSQL · MongoDB · SQLAlchemy · REST APIs
Controls & Automation: PLC Programming · Siemens TIA Portal V17 · WAGO e!COCKPIT · Ladder Logic
Embedded & Hardware: Arduino · Raspberry Pi (Pico) · FPGA · Sensor Integration · Soldering · Embedded C
Data & Tools: SAP · SAP Analytics Cloud · Oracle SQL / APEX · Pandas · NumPy · Dash · Docker · Vercel · Git · Figma · Fusion 360 · LabVIEW

Hot skills (red pill accent): TypeScript, Python, React / Next.js, PLC Programming, Arduino, SAP

---

### Projects
**Section label:** `[ 04 ] — WORK`
**Show 6 projects (no "contributed" or "CONTRIB" labels — all presented as own work):**

**01 — HackTheWallet**
> A blockchain game built on Starknet: connect your wallet, then convince an AI to give your crypto back. Uses Gemini 1.5 Flash for conversational gameplay with a real trust-scoring system. Deployed on Sepolia testnet with on-chain rewards.
Tags: Next.js · Starknet · Gemini AI · TypeScript · Framer Motion
Link: github.com/Sahid-m/HackTheWallet

**02 — luffa-ai-bot**
> A LangGraph-powered AI assistant integrated into the Luffa messaging platform. Listens to chat messages, figures out intent, and executes actions — voting, image generation, hotel booking — all in one agent loop.
Tags: Python · LangGraph · FastAPI · LangChain
Link: github.com/Sahid-m/luffa-ai-bot

**03 — StreamFlow**
> Decentralised creator tipping platform built on the Radix blockchain. Streamers get tipped directly by viewers, with real-time analytics and on-chain transaction processing. Built at Radix Hack.
Tags: TypeScript · React · Rust · Radix Blockchain
Link: github.com/Sahid-m/radix-hack

**04 — Foodo-Baggins**
> AI nutrition tracker that roasts your diet. Upload a photo of your meal — it analyses calories, gives advice, posts a sarcastic tweet about your choices, and earns you sustainability Green Points redeemable for tree planting.
Tags: Next.js · TypeScript · MongoDB · Ollama · GenAI
Link: github.com/Sahid-m/foodo_baggins

**05 — Go Fish**
> Decentralised payment platform on Polkadot for the global fishing import/export industry. Smart contracts enable instant payments — exporters receive 97.5% of trade value immediately. Eliminates FX volatility and intermediary fees with stablecoin integration. Built at EasyA x Polkadot Hackathon.
Tags: Next.js · Polkadot · Solidity · TypeScript · Smart Contracts
Link: github.com/Sahid-m (EasyA Hackathon)

**06 — Automated Object Retriever**
> Autonomous robot achieving 95% item retrieval accuracy and cutting manual retrieval time by 70%. Built using Arduino, ultrasonic sensors, and embedded C — hardware and software, all from scratch.
Tags: Arduino · Ultrasonic Sensor · Embedded C · Robotics

**07 — ClipForge AI** *(in progress)*
> AI-powered video clipping tool. Feed it a long video, get back the best moments — cut, captioned, ready to post.
Tags: TypeScript · AI · Video Processing
Link: github.com/Ibad-10/clipforge-ai

**08 — Atmos Task**
> Supermarket checkout system with automated discount engine, SKU scanning, and multi-offer logic. Clean OOP in C#.
Tags: C# · OOP · CLI
Link: github.com/Ibad-10/Atmos_Task

**Display strategy:** Show top 6 in main grid (HackTheWallet, Go Fish, StreamFlow, Foodo-Baggins, Automated Object Retriever, ClipForge AI). Atmos_Task omitted from main view.

---

### Hackathons
**Section label:** `[ 05 ] — HACKATHONS`
**Intro line:** `Multiple hackathons. Multiple wins.`

**★ Encode AI London Hackathon 2025 — 1st Place (Main Track)**
> Also won: 🥈 2nd Prize — Nethermind Bounty · 🏅 5th Prize — StarkWare Bounty
> Built HackTheWallet — a Starknet blockchain game where you convince an AI to return your locked crypto. Prompt engineering meets DeFi. First place across all teams, plus two sponsor bounties.

**★ Brunel University Hack — 1st Place**
> Shipped luffa-ai-bot — a LangGraph multi-tool AI assistant integrated into the Luffa live messaging platform. Handles voting, image generation, bookings — all from chat. Built and deployed in under 24 hours.

**★ Radix Hack — 1st Place**
> Built StreamFlow, a decentralised creator tipping platform on Radix blockchain. Real-time tip analytics, on-chain transaction processing, TypeScript + Rust architecture.

**🥉 Royal Hackaway v8 — 3rd Place (Verdn Environmental Hack)**
> Built Foodo-Baggins at Royal Holloway's inter-university hackathon. AI nutrition tracker that analyses food photos, roasts your diet choices, and converts meals into sustainability Green Points. 3rd in the environmental track.

**★ EasyA x Polkadot Hackathon London — Top Finish**
> Built Go Fish — a decentralised payment platform on Polkadot for the global fishing import/export industry. Smart contracts give exporters 97.5% of trade value instantly, with automated collateral management and stablecoin FX protection.

**Also attended:** HackMeridian · Royal Hackaway V7 (built Voice Assistant, 92% recognition accuracy)

---

### Photography
**Section label:** `[ 06 ] — THROUGH THE LENS`
**Subtitle:** `Street · Architecture · London`
**No additional copy needed — images speak.**

Photo captions (shown on hover):
1. Lamborghini — *Kensington, London*
2. Architecture — *Golden hour, West London*
3. Skyline — *City of London at dusk*
4. Street Canyon — *Birmingham city centre*
5. Jack Sparrow — *Street performer, Windsor*
6. Graffiti — *Shoreditch, London*

---

### Contact
**Section label:** `[ 07 ] — CONTACT`
**Headline (big type):**
> LET'S BUILD
> SOMETHING.

**Subtext:**
> Got a project, an idea, or just want to say hi — reach out. Always open to interesting conversations.

**Social links:**
- `↗ github.com/Ibad-10`
- `↗ zuberi.ibad@gmail.com`
- `↗ linkedin.com/in/ibad-ullah-zuberi`

**Form placeholders:**
- Name: `Your name`
- Email: `your@email.com`
- Message: `Tell me about your project...`

**Submit button:** `SEND MESSAGE →`
**Success state:** `Message sent. I'll be in touch.`

**Footer:** `IBAD ULLAH ZUBERI © 2026 · LONDON · Built with Next.js`

---

## File Mapping — Images to copy to `public/`

```
public/photos/hero.jpeg        ← My photos/WhatsApp Image 2026-05-01 at 9.28.25 PM (1).jpeg
public/photos/hackathon.jpeg   ← My photos/WhatsApp Image 2026-05-01 at 9.28.26 PM.jpeg
public/lightroom/lambo.jpeg           ← Pictures_ligthroom/WhatsApp Image 2026-05-01 at 9.59.20 PM.jpeg
public/lightroom/architecture.jpeg   ← Pictures_ligthroom/WhatsApp Image 2026-05-01 at 9.59.13 PM (1).jpeg
public/lightroom/skyline.jpeg        ← Pictures_ligthroom/WhatsApp Image 2026-05-01 at 9.59.13 PM (2).jpeg
public/lightroom/street-canyon.jpeg  ← Pictures_ligthroom/WhatsApp Image 2026-05-01 at 9.59.13 PM (3).jpeg
public/lightroom/jack-sparrow.jpeg   ← Pictures_ligthroom/WhatsApp Image 2026-05-01 at 9.59.15 PM (1).jpeg
public/lightroom/graffiti.jpeg       ← Pictures_ligthroom/WhatsApp Image 2026-05-01 at 9.59.17 PM.jpeg
```
