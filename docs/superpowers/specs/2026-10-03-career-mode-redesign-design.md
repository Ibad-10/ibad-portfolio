# Portfolio Redesign v3 — "Career Mode" — Design Spec

> **Superseded 2026-10-05:** the site now uses the Portfolio v2 design handoff (black theme, sand hero, pole gallery). The Game/Classic modes described here were removed; only the `/play` penalty shootout was kept.

**Date:** 2026-10-03
**Status:** Draft for review (no code changes yet)
**Supersedes:** `2026-05-01-portfolio-redesign-design.md` (Full Bleed Immersive)

## 1. Overview

Redesign the portfolio as a football-game **Career Mode** save file, styled as a homage to the FIFA 14 / FIFA 15 menu UI. The visitor "boots" the game, lands on a tile hub, and opens tiles that map to portfolio sections. A permanent **Recruiter view** gives a clean, fast, CV-style path for non-gamers.

Concepts combined: **Matchday experience** (boot/loading, fixtures, broadcast ticker, penalty game) + **Career Mode** (transfers, season stats, trophies, attributes).

**Audience:** both recruiters (graduate engineering roles) and the dev/hackathon community. Content must never be hidden behind the theme.

**Two experiences, one site (added 2026-10-03):** a visitor can switch at any time between
- **Game Mode:** the 3D immersive Career Mode described below.
- **Classic Mode:** a plain, polished, animated portfolio about Ibad with no game framing (normal nav, scrolling sections, subtle motion). This is a full website, not only a CV page.

Both modes read from the same content data files, so they never drift apart.

**Non-goals (v1):** live football data, real FIFA/FC stats, official club badges or EA assets.

## 2. Legal / branding guardrails

- Homage only: original layouts, icons, copy. No EA logos, EA fonts, FIFA trademarks, or screenshots.
- No official FC Barcelona crest or kit imagery. Use club-inspired colours and a neutral shield shape.
- No real player photos. Avatar slot uses the owner's own photo.

## 3. Visual system — "Night Match" (+ light mode)

| Token | Dark (default) | Light (Recruiter view default) |
|---|---|---|
| `--bg` | `#070B14` | `#EEF1F6` |
| `--panel` | `#0F1626` (glass, blur 12px) | `#FFFFFF` |
| `--text` | `#F2F5FA` | `#0B1220` |
| `--muted` | `#8A94A8` | `#556079` |
| `--blue` (primary accent) | `#2F7BFF` | `#1E5FD8` |
| `--garnet` (secondary) | `#C8174F` | `#B0123F` |
| `--gold` (trophies, rating only) | `#E6B84C` | `#B8892A` |

**Rules**
- Accent colours are never used for body text. Body text ≥ 4.5:1 contrast (AA).
- Blue = focus, selected tile, links. Garnet = live/notification items and the primary CTA only. Gold = trophies and overall rating only.
- Colour is never the only state indicator (selected tile also gets border + scale + prompt).
- Honour `prefers-reduced-motion` (disable parallax, tile tilt, ticker auto-scroll becomes static).

**Typography**
- Display / menu headings and numbers: a condensed, sporty sans via `next/font/google` (candidate: `Barlow Condensed` or `Oswald`), uppercase, wide tracking on labels.
- Body: `Inter`. Mono for metadata: `JetBrains Mono` (small use).
- Paragraphs never use the display face.

**FIFA 14/15 UI cues (original implementation)**
- Blurred stadium-style background (CSS gradient + photo from the owner's own gallery, heavy blur, vignette).
- Large rectangular tiles with a thin top accent line; selected tile scales ~1.04 and gains a blue glow edge.
- Bottom **button-prompt bar** (`Enter` Select · `Esc` Back · `R` Recruiter view) shown on desktop; tap targets on mobile.
- Top bar: profile chip (avatar, name, rating), section breadcrumb, clock-style date.
- Bottom **news ticker** with real career news.
- Slide/fade panel transitions (Framer Motion), ~250 ms.

## 3a. Experience modes and the switch

- **First visit:** a "Choose your experience" screen with two large options (Game Mode / Classic Mode), each with a short looping preview. The choice is remembered (localStorage, try/catch) and can be changed any time.
- **Persistent mode switch** in the top bar of both modes (labelled "Game / Classic"), also reachable by keyboard (`M`). Switching keeps the visitor on the equivalent page (e.g. `/matches` stays Projects).
- **Automatic Classic fallback** when any of these is true: no WebGL, `prefers-reduced-motion`, Save-Data / very slow connection, or low-memory device. A small banner explains it and offers "Try Game Mode anyway".
- **Deep links never force the game:** `/matches/[slug]` etc. open in the visitor's remembered mode; with no stored choice they open in Classic Mode.
- **Classic Mode design:** same colour tokens and light/dark toggle, but a conventional layout (sticky nav, hero, about, experience timeline, projects grid, skills, trophies, photography, contact). Motion limited to scroll-reveals, hover lift and count-up numbers. No football language in headings (Experience, Projects, Skills, not Transfers or Match Centre).
- **Recruiter print view (`/recruiter`) stays** as a one-page, print-friendly CV inside Classic Mode.

## 3b. 3D and immersive media (Game Mode only)

**Goal:** make Game Mode feel like entering a stadium, not a flat menu. All 3D is lazy-loaded so Classic Mode and first paint stay light.

**Stack:** `three`, `@react-three/fiber`, `@react-three/drei` (scene helpers), Framer Motion for UI. Postprocessing (bloom, vignette) only on capable devices.

**3D set pieces**
1. **Tunnel walk-out (boot):** camera moves down a dark stadium tunnel toward a bright pitch opening, with light flares and a crowd-noise swell (sound toggle permitting), ending at the hub.
2. **Hub stage:** a slow-moving stadium-at-night backdrop with floodlight beams and depth parallax driven by mouse or device tilt. Tiles float above it with subtle 3D tilt toward the cursor.
3. **Player card:** a 3D "player card" of Ibad (rating, position, key stats) that rotates with the pointer, with a holographic sheen. Used in Squad and the hub summary.
4. **Trophy Room (phase 2):** 3D shelf with the five hackathon trophies, orbit on drag, light-up on hover.
5. **Pitch map for Match Centre (phase 2):** projects as markers on a 3D pitch with a camera fly-to when selected.
6. **Penalty shootout (phase 3):** real 3D goal, ball and goalkeeper with physics-lite aiming and shot arcs.

**Generated and captured media**
- Candidates: a looping stadium-tunnel video, a night-stadium hero still, trophy and card textures, and an ambient crowd bed.
- **Provenance:** the build environment cannot generate images or video. Assets are produced by the owner with an image/video generator of their choice (prompt pack to be supplied in the implementation plan), or replaced by procedural 3D/CSS equivalents. Generated assets must carry no real club crests, real player likenesses or EA/FIFA branding.
- **Budgets:** each video ≤ 3 MB (H.264/WebM, muted, `playsinline`, no autoplay on mobile data), poster image for every video, total Game Mode first-load JS ≤ 350 KB gzip excluding the lazy 3D chunk, 3D chunk ≤ 600 KB gzip, images served through `next/image`.
- **Fallbacks:** every 3D scene has a static poster or 2D CSS version for reduced-motion and failed WebGL.

## 4. Information architecture and routing

Layout direction: **hub + scroll pages with URLs** (chosen over single-screen hub for deep links, SEO, mobile).

```
/                     Boot screen -> Hub (tile grid)
/transfers            Experience (BMW, EY, Cloud Nebula)
/matches              Projects (Match Centre)
/matches/[slug]       Project detail
/trophies             Hackathons (Trophy Room)            [phase 2]
/training             Skills (attribute sheet)            [phase 2]
/squad                About + CV download                 [phase 2]
/media                Photography                         [phase 2]
/contact              Contact form                        [phase 2]
/recruiter            Recruiter view (clean one-page CV)
/play                 Penalty shootout mini-game          [phase 3]
```

Each route is a normal scrollable Next.js App Router page, usable without the hub animation. The hub is the front door, not a gate: direct links render fully.

## 5. Screens

### 5.1 Boot / loading (`/`, first visit per session only)
- Dark splash with owner name and "Career Mode" wordmark (original lettering).
- Loading bar and rotating tips ("TIP: Press R for Recruiter view").
- "Press any key / Tap to start". This gesture also unlocks audio (sound stays off unless the toggle is on).
- Skippable immediately; skipped automatically when `prefers-reduced-motion` or on repeat visits (sessionStorage flag, wrapped in try/catch).

### 5.2 Hub
- 7 tiles (phase 1 renders 3 active + the rest as "Coming soon"/locked-style tiles).
  - **Transfers** (Experience) · **Match Centre** (Projects) · **Recruiter view** (CV) — active in v1
  - **Trophy Room** · **Training Ground** · **Squad** · **Media** · **Contact** — phase 2
- Left panel: player summary (name, position label, overall rating, current "club": Brunel University, BEng Computer Systems Engineering, predicted First).
- Keyboard navigation (arrows, Enter, Esc), mouse hover, touch tap. Focus ring always visible.
- Ticker items (editable in one data file): `BMW 15-MONTH PLACEMENT COMPLETE · ENCODE AI HACKATHON WINNER · LOGISTICS COCKPIT: 27 KPIs · OPEN TO GRADUATE ROLES`.

### 5.3 Transfers (Experience)
Cards styled as club contracts: club name, role, dates, "season stats", highlights.

- **BMW Group — Plant Hams Hall.** Logistics Planning Placement (15 months, Jul 2025 – Sep 2026, completed).
  - Stats: `27` KPIs delivered (was 13) · `5` source systems · `500+` SQL queries · `7` VNA tablets configured · `60+` colleagues at launch presentation.
  - Highlights (paraphrased from the Technical Report and PoE): Logistics Cockpit (Oracle APEX/SQL); VNA semi-automation with GETAC tablets and Acronis recovery; PLC status lamps linked to STR robot ATS (WAGO e!COCKPIT); LION LMG master dataset; HHP–SNP packaging data validation (taxi-part data quality 52% to 61% in a month).
  - Financial figures (£30k RFID recovery, ~£20k/yr VNA saving, ~£450k/yr identified waste) are **hidden by default behind a content flag** until confirmed releasable by BMW (source slides are marked "Strictly Confidential").
- **EY — Data Analyst** (Jul–Sep 2024): 20,000+ entries analysed, 5 dashboards.
- **Cloud Nebula Enterprises — Web Developer** (Jun–Sep 2024): analytics platform, 60,000+ records, 25% faster interpretation.

### 5.4 Match Centre (Projects)
- Projects shown as **fixtures** with a result panel: title, "competition" (hackathon/uni/personal), outcome (e.g. Winner), stack tags, links, one-line description.
- v1 projects: Pegboard (live product — copy to be supplied), HackTheWallet (Encode London, Winner), LuffaBot AI Assistant, StreamFlow (Radix), Go Fish (EasyA x Polkadot), Automated Object Retriever, Employee Attendance System, Weather Monitoring System, ClipForge AI (in progress). Order and final list confirmed in implementation plan.
- Detail page per project (`/matches/[slug]`): problem, what I built, stack, result, links.
- University projects added from the owner's `.md` files when provided.

### 5.5 Recruiter view (`/recruiter`)
- Light-mode, single column, print-friendly. Sections: summary, education (predicted First, rank 1/30), placement highlights, projects, skills, links.
- Buttons: Download CV (PDF, existing `public/Ibad_CV.pdf` to be replaced with the new tailored CVs), LinkedIn, GitHub, email.
- Reachable from: hub tile, persistent top-bar button, `R` key, and direct URL. Back-to-game link on the page.
- No animation required to read any content.

### 5.6 Phase 2 and 3 (out of scope for v1, listed for planning)
- **Trophy Room:** hackathon wins as trophies on shelves (Encode AI London, Brunel Hack, Radix Hack, Royal Hackaway v8, EasyA x Polkadot).
- **Training Ground:** skills as an attribute sheet (renamed stats e.g. PYTHON, SQL, PLC, REACT) with category bars; scores are self-assessed and labelled as such.
- **Squad:** about, photo, CV download. **Media:** existing photography lightbox restyled. **Contact:** existing Resend form restyled.
- **Penalty shootout (`/play`):** canvas or DOM game, aim + power, 5 kicks; name-entry leaderboard in Supabase (table with name, score, created_at; RLS: public insert/select, no update/delete; server-side validation and rate limit on submit). Sound effects (whistle, crowd, menu click) off by default with a visible toggle; assets must be royalty-free.

## 6. Technical notes

- Keep: Next.js 14 App Router, Tailwind, Framer Motion, Resend contact API route, photography assets, Lightbox logic.
- Replace: hero, nav, section components, global styles and fonts. Retire `CustomCursor`, `GhostText`, red `Ticker`, `ScrollProgress` styling from the May design (restyle `Ticker`, reuse `EasterEgg`).
- Content lives in typed data files (`lib/data/*.ts`) so phase 2 tiles and the Recruiter view share one source.
- Global keyboard handler (arrows/Enter/Esc/R) lives in the hub layout and is disabled inside form fields.
- Theme via CSS variables; dark/light toggle persisted in localStorage (try/catch), default follows system, Recruiter view defaults light.
- Audio: lazy-loaded, created only after a user gesture, `muted` state default true.
- Performance: hub background is a single compressed image + CSS blur (no video); heavy images via `next/image`; mini-game code split to `/play` only.
- Accessibility: semantic landmarks, tiles are real links/buttons, AA contrast, visible focus, reduced-motion support, alt text on all images.
- Mobile: tiles become a 2-column grid; button-prompt bar hidden; boot screen tap-to-start; no hover-only information.
- Analytics/telemetry: none in v1.

## 7. Phased delivery

1. **Phase 1 (this spec):** shared content data layer, design tokens, fonts, mode chooser + switch, **Classic Mode core** (hero, experience, projects, skills, contact link, recruiter print view), **Game Mode core** (tunnel boot, 3D hub, Transfers, Match Centre), theme toggle, new CV file wired to the download button.
2. **Phase 2:** Trophy Room (3D shelf), Training Ground, Squad (3D player card), Media, Contact in both modes; Classic Mode polish.
3. **Phase 3:** penalty shootout (3D), leaderboard, sound.

Classic Mode ships in phase 1 alongside Game Mode so the site is never left without a fast, plain path.

## 8. Open items before the implementation plan

- Pegboard: one-line description and stack (repo returned 404; site not reachable from the build environment).
- University project `.md` files for Match Centre.
- BMW sign-off on whether £ figures may be shown publicly.
- Final-year project: topic is not yet confirmed; show as "in progress" only after confirmation.
- Confirm display-font choice after a visual test (Barlow Condensed vs Oswald).
- Which generator the owner will use for images/video (prompt pack to be written), or whether to start with procedural 3D only.
- Default mode for a visitor with no stored choice who arrives on `/` (spec proposes the chooser screen; alternative is Classic by default).
- Sound: royalty-free crowd and whistle sources to be picked and licence noted.
- ~~Public email~~ **Decided 2026-10-03:** `Zuberi.Ibad@gmail.com` everywhere (CVs, both modes, mailto). Contact-form delivery still to resolve at zero cost: Resend's free tier without a verified domain only delivers to the Resend account owner's address (`ibadullahzuberi@gmail.com` today), so either change the Resend account email, use a free form service, or fall back to `mailto:`.
- **Budget constraint:** the owner will not spend money. Everything in v1 must use free tiers or free tools only (see "Zero-cost plan" below).

## 9. Zero-cost plan

- Hosting: existing Vercel Hobby project. Domain: keep the free `*.vercel.app` URL.
- 3D: procedural three.js scenes written in code (no paid assets). Generated images/video are optional and only if a free tool is used; otherwise CSS/3D equivalents.
- Fonts: Google Fonts. Icons: inline SVG.
- Audio: CC0 / royalty-free sources only (e.g. Freesound CC0, Pixabay), licence noted in the repo; off by default.
- Leaderboard (phase 3): Supabase free tier; if limits or pausing become a problem, fall back to a local-only high score.
- Contact form: see the email item above.
