---
name: Ibad Portfolio Website Design
description: Full spec for Ibad's pixel-art retro-futuristic animated portfolio website
type: project
---

# Portfolio Website — Design Spec
**Date:** 2026-04-19  
**Owner:** Ibad  
**Hosting:** Vercel (free tier)  
**Stack:** Next.js 14 (App Router) · TypeScript · Framer Motion · Aceternity UI · Tailwind CSS

---

## 1. Aesthetic Direction

**Theme:** Retro-futuristic pixel art terminal  
**Mood:** Dark, electric, hacker-aesthetic — feels alive and interactive  
**Colors:**
- Background: `#0a0a0f` (near-black with blue tint)
- Primary: `#00ff9f` (neon green)
- Accent: `#ff2d78` (magenta/pink)
- Secondary: `#00cfff` (cyan)
- Text: `#e0e0e0` (off-white)
- Muted: `#3a3a4a`

**Typography:**
- Display/Headings: `Press Start 2P` (Google Fonts) — pixel font
- Body/Mono: `VT323` (Google Fonts) — retro terminal font
- Code snippets: `Share Tech Mono`

**Global effects:**
- CRT scanline overlay (CSS pseudo-element, subtle opacity)
- Noise/grain texture overlay on all backgrounds
- Custom pixel-art cursor (replaces default pointer)
- Scroll progress bar at top (neon green, pixelated)
- `BackgroundBeams` (Aceternity UI) on hero section
- Pixel-dissolve / glitch transition when sections enter viewport

---

## 2. Page Structure (Single-Page Scroll)

### Section 1: Hero
- Full-screen (`100vh`) dark canvas
- "IBAD" in `Press Start 2P`, massive (~10-14vw), with CSS glitch animation (chromatic aberration shift on keyframes)
- Typewriter subtitle cycling: `CS Student` → `Builder` → `Hacker` → `Robot Maker` → loop
- Aceternity UI `BackgroundBeams` as animated background layer
- Floating pixel particles drifting upward (canvas or CSS animation)
- Pixel-art sprite/character in bottom-right corner (CSS pixel art or SVG)
- Two CTA buttons with Aceternity UI `MovingBorder`:
  - `[ View Projects ]` — scrolls to projects
  - `[ Download CV ]` — downloads Ibad_CV.pdf
- Parallax depth: mouse movement shifts background layers slightly
- Scroll indicator: bouncing pixel arrow at bottom

### Section 2: About
- Heading: `> ABOUT_ME` in pixel font with blinking cursor `_`
- Two columns:
  - Left: animated stat counters (Framer Motion count-up on scroll-enter)
    - `5+` Projects Built
    - `3` Languages Mastered
    - `2` Open Source Contributions
    - `1` Robot Built
  - Right: Short bio paragraph in `VT323`, styled as terminal output with `$` prefix lines
- Pixel-art corner bracket decorations on section border
- Framer Motion stagger reveal on scroll-enter

### Section 3: Skills
- Heading: `> SKILL_TREE` 
- Four categories in a grid:
  - **Languages:** TypeScript, JavaScript, Python, C#, Rust, C++, Java
  - **Frontend:** React, Next.js, Tailwind CSS, Framer Motion, HTML/CSS
  - **Backend:** Node.js, Express.js, FastAPI, Socket.io
  - **Tools:** Docker, Vercel, Figma, Postman, Raspberry Pi, PostgreSQL, MongoDB
- Each skill rendered as a pixel-badge chip
- Animated pixel progress bars that fill left-to-right on scroll-enter (Framer Motion)
- Hover on each badge: tooltip showing proficiency level + glow effect

### Section 4: Projects
- Heading: `> PROJECTS`
- 2×2 grid of Aceternity UI `CardSpotlight` / `HoverEffect` cards
- Each card:
  - Project name in `Press Start 2P`
  - 1-line description in `VT323`
  - Tech stack badges (neon-colored)
  - GitHub link button
  - Neon pixel border that glows on hover
  - Framer Motion: card lifts (y: -8px) and shadow deepens on hover
- Projects:
  1. **HackTheWallet** — Starknet blockchain game with pixel-art AI opponent · Next.js, Starknet, Gemini AI
  2. **luffa-ai-bot** — LangGraph multi-tool AI assistant for Luffa Bot platform · Python, LangGraph, FastAPI
  3. **clipforge-ai** — AI-powered video tool · TypeScript
  4. **Atmos_Task** — Supermarket checkout system with discount engine · C#
- Contribution badge on HackTheWallet and luffa-ai-bot (different color to indicate "contributed to")

### Section 5: Hackathon Wins
- Heading: `> ACHIEVEMENTS` with trophy pixel-art icon
- Three large "award cards" displayed in a row, each with:
  - Gold/silver pixel-art trophy icon (animated spin-in on scroll-enter)
  - `🏆 WINNER` badge glowing in gold neon
  - Hackathon name in `Press Start 2P`
  - Organiser name + date underneath in `VT323`
  - Short line on what was built / prize won
  - Framer Motion: cards stagger-reveal left-to-right with a bounce easing
  - Hover: card tilts 3D (rotateX/rotateY via Framer Motion `useMotionValue`), gold glow intensifies
- Awards:
  1. **Encode Hackathon** — 1st Place · Built HackTheWallet, Starknet blockchain game
  2. **Brunel Hack** — 1st Place · Brunel University · AI + blockchain solution
  3. **Royal Holloway Hackathon** — 1st Place · Royal Holloway University
- Confetti burst animation fires once when section enters viewport (CSS keyframes, no heavy lib)
- Aceternity UI `Spotlight` background effect behind the three cards

### Section 6: Robot Demo
- Heading: `> OBJECT_RETRIEVER_BOT`
- Full-width video player for `automated object retriever.mp4`
- Video wrapped in CSS pixel-art CRT monitor frame (border-image or SVG overlay)
- Scanline CSS overlay on video
- Short description: "Autonomous robot built with Raspberry Pi that detects and retrieves objects using computer vision."
- Framer Motion: section fades in and slides up on scroll-enter
- Play button styled as pixel-art `▶` with glow effect

### Section 7: Contact
- Heading: `> CONTACT`
- Terminal-style layout — links displayed as shell commands:
  ```
  $ open https://github.com/Ibad-10
  $ open mailto:iyaduzuberi0@gmail.com
  ```
- Simple contact form (name, email, message) styled as terminal input fields
  - Neon green cursor blink on focus
  - Pixel-border inputs
  - Submit button with `MovingBorder` from Aceternity UI
- Social icons (GitHub, LinkedIn) with pixel hover glow

### Footer
- `[ IBAD © 2026 ]` in pixel font centered
- Animated pixel-art decoration (stars or dots scrolling)

---

## 3. Global Interactivity

| Feature | Implementation |
|---|---|
| Custom pixel cursor | CSS `cursor: none` + JS-tracked `div` with pixel sprite |
| Cursor trail | Last 8 cursor positions rendered as fading pixel dots |
| Mouse parallax on hero | Framer Motion `useMotionValue` + `useTransform` |
| 3D card tilt | Framer Motion `useMotionValue` rotateX/rotateY on hackathon + project cards |
| Scroll progress bar | Framer Motion `useScroll` → scaleX on fixed top bar |
| Section reveal animations | Framer Motion `whileInView` with `viewport: { once: true }` |
| Glitch text effect | CSS `@keyframes` chromatic shift on `::before`/`::after` |
| Glitch on hover | Hero name re-triggers glitch animation on mouse-enter |
| Particle system | CSS animation or lightweight canvas (no heavy libs) |
| Confetti burst | CSS keyframe explosion fires once on hackathon section enter |
| Scanline overlay | Fixed position `::after` pseudo-element, `pointer-events: none` |
| Noise texture | SVG filter or CSS `background-image` with noise pattern |
| Pixel progress bars | Framer Motion width animation triggered by `useInView` |
| Card hover glow | Tailwind `group-hover` + CSS `box-shadow` neon color |
| Typewriter effect | Custom React hook with `useState` + `useEffect` interval |
| Magnetic buttons | CTA buttons subtly attract toward cursor (Framer Motion spring) |
| Scroll-snap sections | CSS `scroll-snap-type: y mandatory` for satisfying section jumps |
| Sticky pixel nav | Navbar appears after scrolling past hero, with active section highlight |
| Nav active indicator | Glowing pixel dot tracks current section as you scroll |
| Terminal typing in About | Bio text types itself out letter-by-letter on scroll-enter |
| Easter egg | Konami code (↑↑↓↓←→←→BA) triggers full-screen pixel art explosion |
| Tilt + depth on robot video | Video section has subtle 3D perspective tilt on mouse move |
| Hover sound cues | Optional: subtle 8-bit blip on button hover (user toggle in corner) |

---

## 4. File Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # fonts, metadata, global styles
│   ├── page.tsx            # main single-page scroll
│   └── globals.css         # CSS variables, scanlines, noise, cursor
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
│   │   ├── PixelCursor.tsx       # cursor + trail
│   │   ├── ScrollProgress.tsx
│   │   ├── GlitchText.tsx
│   │   ├── TypewriterText.tsx
│   │   ├── PixelProgressBar.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── TiltCard.tsx          # 3D tilt wrapper
│   │   ├── Confetti.tsx
│   │   ├── EasterEgg.tsx         # Konami code handler
│   │   └── NavBar.tsx
│   └── aceternity/         # copied Aceternity UI components
│       ├── BackgroundBeams.tsx
│       ├── CardSpotlight.tsx
│       ├── HoverEffect.tsx
│       └── MovingBorder.tsx
├── public/
│   ├── Ibad_CV.pdf
│   └── robot-demo.mp4
├── package.json
├── tailwind.config.ts
└── next.config.ts
```

---

## 5. Dependencies

```json
{
  "next": "14.x",
  "react": "18.x",
  "typescript": "5.x",
  "framer-motion": "^11",
  "tailwindcss": "^3",
  "clsx": "^2",
  "tailwind-merge": "^2"
}
```

Aceternity UI components are copy-pasted (not npm installed) per their docs.

---

## 6. Deployment

- Push to GitHub repo `ibad-portfolio` 
- Connect to Vercel (free Hobby plan)
- Auto-deploy on `main` branch push
- Custom domain optional (Vercel provides `ibad-portfolio.vercel.app` for free)

---

## 7. Interactivity Checklist (User Experience Goals)

- [ ] Every hover state has a visible, satisfying response
- [ ] Scroll through entire page feels like a narrative journey
- [ ] No section feels static — everything has motion
- [ ] Mobile responsive (pixel aesthetic adapts to small screens)
- [ ] CV downloadable in one click
- [ ] Video autoplay muted with click-to-unmute
- [ ] All animations respect `prefers-reduced-motion`
