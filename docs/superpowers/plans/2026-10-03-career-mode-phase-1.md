# Career Mode — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Status:** APPROVED 2026-10-03 — owner delegated review and approval to the agent ("review the plan yourself and then approve it"). Self-review log at the bottom of this file.
**Spec:** `docs/superpowers/specs/2026-10-03-career-mode-redesign-design.md`
**Branch:** `claude/nifty-fermi-39tjz7` (do not open a PR unless asked)

**Goal:** Ship Phase 1 of the redesign: a shared content layer, a Game/Classic mode system, a complete Classic Mode core, a Game Mode core with a lazy-loaded 3D tunnel boot and hub, Transfers, Match Centre (with project detail pages) and a printable Recruiter view. Zero ongoing cost.

**Architecture:**
- One site, two presentations. A `mode` cookie (`game` | `classic`) is read on the server in the root layout; a client `ModeProvider` mirrors it and writes it when the visitor switches. Routes are shared (`/transfers`, `/matches`, `/matches/[slug]`, `/recruiter`) and each page renders from the same typed data with a mode-specific presentation component.
- All 3D lives under `components/game/three/` and is loaded with `next/dynamic({ ssr: false })` only in Game Mode, so Classic Mode never downloads three.js.
- Content lives in `lib/data/*.ts`; both modes and the Recruiter view import from it (single source of truth).
- Automatic Classic fallback is a pure function (`lib/mode.ts`) fed by client capability checks, so it is unit-testable.

**Tech Stack:** Next.js 14.2 App Router, React 18, TypeScript, Tailwind 3, Framer Motion 12, `three@^0.160`, `@react-three/fiber@^8`, `@react-three/drei@^9`, Vitest (pure-logic tests only).

> **Version note:** React 18 means react-three-fiber **v8** and drei **v9**. Do not install fiber v9 (requires React 19). Do not upgrade React or Next in this phase.

> **Budgets (from spec):** Game Mode first-load JS ≤ 350 KB gzip excluding the lazy 3D chunk; 3D chunk ≤ 600 KB gzip. `next.config.mjs` has `images.unoptimized = true`, so all images added in this phase must already be compressed (≤ 250 KB each for backgrounds, ≤ 120 KB for thumbnails).

---

## File Map

### Create
- `lib/data/profile.ts`, `experience.ts`, `projects.ts`, `skills.ts`, `hackathons.ts`, `news.ts`, `index.ts`
- `lib/mode.ts` — mode types, cookie helpers, `resolveMode`, `shouldFallbackToClassic`
- `lib/mode.test.ts`, `lib/data/data.test.ts`
- `vitest.config.ts`
- `components/mode/ModeProvider.tsx`, `ModeSwitch.tsx`, `ModeChooser.tsx`
- `components/theme/ThemeProvider.tsx`, `ThemeToggle.tsx`
- `components/classic/ClassicShell.tsx`, `ClassicHome.tsx`, `ExperienceTimeline.tsx`, `ProjectGrid.tsx`, `SkillsBlock.tsx`
- `components/game/GameShell.tsx`, `BootScreen.tsx`, `Hub.tsx`, `Tile.tsx`, `PromptBar.tsx`, `NewsTicker.tsx`, `ProfileChip.tsx`, `TransfersGame.tsx`, `MatchCentreGame.tsx`
- `components/game/three/TunnelScene.tsx`, `HubBackdrop.tsx` (lazy)
- `components/recruiter/RecruiterCV.tsx`
- `app/transfers/page.tsx`, `app/matches/page.tsx`, `app/matches/[slug]/page.tsx`, `app/recruiter/page.tsx`
- `public/game/hub-poster.jpg`, `public/game/tunnel-poster.jpg` (static fallbacks; produced in Task 6)

### Modify
- `app/layout.tsx` — fonts, providers, cookie read, mode shell
- `app/page.tsx` — chooser / Classic home / Game hub
- `app/globals.css` — new tokens (dark + light), print styles, reduced-motion rules
- `tailwind.config.ts` — token colours and font families
- `package.json` — new deps and `test` script
- `components/sections/Contact.tsx`, `Photography.tsx` — restyled lightly and reused in Classic Mode (no logic change to the contact API route)

### Delete (Task 9, after replacements work)
- `components/sections/Hero.tsx`, `About.tsx`, `Skills.tsx`, `Projects.tsx`, `Hackathons.tsx`
- `components/ui/CustomCursor.tsx`, `GhostText.tsx`, `Ticker.tsx`, `ScrollProgress.tsx`, `NavBar.tsx`, `MagneticButton.tsx` (only if unreferenced after the swap)
- Keep: `components/ui/EasterEgg.tsx`, `Lightbox.tsx`, `app/api/contact/route.ts` (unchanged; contact destination stays as is for now)

---

## Task 0: Baseline and dependencies

**Files:** `package.json`, `vitest.config.ts`

- [ ] **Step 1:** `npm install`; run `npm run build` and `npm run lint` on the untouched branch. Record any pre-existing failures in the PR notes so they are not blamed on this work.
- [ ] **Step 2:** `npm i three@^0.160 @react-three/fiber@^8 @react-three/drei@^9` and `npm i -D vitest @types/three`.
- [ ] **Step 3:** Add `"test": "vitest run"` to `package.json`; create `vitest.config.ts` (environment `node`, include `**/*.test.ts`, alias `@` to repo root).
- [ ] **Step 4:** Confirm `npm run build` still passes with new deps unused.
- [ ] **Step 5:** Commit: `chore: add three/r3f and vitest`.

**Done when:** build and lint pass; `npm test` runs (zero tests is acceptable here).

---

## Task 1: Content data layer

**Files:** `lib/data/*.ts`, `lib/data/data.test.ts`

Typed, framework-free data. Content comes from the spec, the two CVs and the placement documents.

- [ ] **Step 1: Types and `profile.ts`.** Name, email `Zuberi.Ibad@gmail.com`, phone, location, LinkedIn, GitHub, site URL, degree line, "predicted First Class, ranked 1st of 30", CV path `/Ibad_CV.pdf`.
- [ ] **Step 2: `experience.ts`.** BMW (Jul 2025 – Sep 2026, 15 months, completed), EY, Cloud Nebula. Each: `club`, `role`, `dates`, `stats[]` (`{label, value}`), `highlights[]` (XYZ-form sentences). BMW figures per the owner's CV wording ("projected", "estimated", £450k/yr, £20k/yr, £30k, 13→27 KPIs, 52%→61%, 300 frames, 7 tablets, 60+ colleagues). Owner has confirmed the £ figures may be public.
- [ ] **Step 3: `projects.ts`.** Fields: `slug`, `title`, `competition`, `outcome`, `year`, `stack[]`, `summary`, `details` (problem / built / result), `links[]`, `status` (`live` | `shipped` | `in-progress`). Include Pegboard (live; **no GitHub link** unless the owner makes the repo public), Hack the Wallet, LuffaBot, StreamFlow, Go Fish, Foodo-Baggins, plus the uni/embedded projects from the owner's CVs (PIC16F18877 interfacing, Digital Systems Design, Weather Monitoring, Automated Object Retriever, Banking/Supermarket Java suite, HyperMint, Employee Attendance). Final-year project entry has `status: "in-progress"` and wording "being confirmed".
- [ ] **Step 4: `skills.ts`, `hackathons.ts`, `news.ts`.** Skills grouped as in the owner's software CV; hackathons: Encode AI London (1st), Brunel Hack (1st), Radix Hack (1st), Royal Hackaway v8 (3rd, Verdn track), EasyA x Polkadot (finalist); news items for the ticker.
- [ ] **Step 5: `index.ts`** re-exports.
- [ ] **Step 6: Tests (`data.test.ts`).** Project slugs unique and URL-safe; every project has ≥ 1 stack tag and a summary; no project links to the Pegboard GitHub URL while its repo is private (guard via a `PEGBOARD_REPO_PUBLIC = false` constant); every link starts with `https://` or `mailto:`; hackathon list is non-empty.
- [ ] **Step 7:** `npm test`, commit: `feat: typed content data layer`.

**Done when:** tests pass and no UI file contains hard-coded portfolio copy that duplicates the data (verified by grep in Task 9).

---

## Task 2: Design tokens, fonts, theme

**Files:** `app/globals.css`, `tailwind.config.ts`, `app/layout.tsx`, `components/theme/*`

- [ ] **Step 1:** In `globals.css` define CSS variables from spec §3 (`--bg --panel --text --muted --blue --garnet --gold`) for `:root` (dark) and `[data-theme="light"]`. Body uses `background: var(--bg); color: var(--text)`.
- [ ] **Step 2:** `tailwind.config.ts`: map tokens (`bg`, `panel`, `text`, `muted`, `blue`, `garnet`, `gold`) to `var(--…)`; font families `display` (Barlow Condensed), `sans` (Inter), `mono` (JetBrains Mono). Remove the old red/ghost tokens only in Task 9 (old sections still compile until then).
- [ ] **Step 3:** `layout.tsx`: replace Unbounded/IBM Plex/Syne with `Barlow_Condensed`, `Inter`, `JetBrains_Mono` via `next/font/google` (free); keep variables on `<html>`.
- [ ] **Step 4: `ThemeProvider` / `ThemeToggle`.** Default follows `prefers-color-scheme`; override persisted in `localStorage` (try/catch); sets `data-theme` on `<html>`. Add an inline no-flash script in the layout head.
- [ ] **Step 5:** Add global rules: `:focus-visible` outline in `--blue` (≥ 3:1 against both backgrounds), `@media (prefers-reduced-motion: reduce)` that disables transitions/animations, and `@media print` base (white background, black text).
- [ ] **Step 6:** Contrast check: compute ratios for text/background and muted/background in both themes (script or manual tool); adjust `--muted` until ≥ 4.5:1.
- [ ] **Step 7:** `npm run build`; commit: `feat: night-match tokens, fonts and theme toggle`.

**Done when:** both themes render with correct tokens, no layout shift flash, contrast ≥ 4.5:1 for body and muted text.

---

## Task 3: Mode system (pure logic first)

**Files:** `lib/mode.ts`, `lib/mode.test.ts`, `components/mode/*`, `app/layout.tsx`

- [ ] **Step 1: `lib/mode.ts` (TDD).** Export:
  - `type Mode = "game" | "classic"`; `MODE_COOKIE = "mode"`.
  - `parseMode(value: string | undefined): Mode | null`.
  - `shouldFallbackToClassic(caps: { webgl: boolean; reducedMotion: boolean; saveData: boolean; lowMemory: boolean }): { fallback: boolean; reasons: string[] }`.
  - `resolveMode(stored: Mode | null, caps): { mode: Mode; fellBack: boolean; reasons: string[] }` — stored `game` is downgraded when caps require Classic; no stored value on deep links resolves to `classic`.
  - Server/client agreement: the server shell is chosen from the cookie; when the client later detects it must downgrade, `ModeProvider` writes `mode=classic` (session-scoped override, not the long-lived choice) and calls `router.refresh()`. Heavy Game parts (3D, boot animation) render only after capability detection has finished, so a downgrade never flashes a half-started 3D scene.
- [ ] **Step 2: Tests first.** Cover: parse valid/invalid; each capability triggers fallback with a reason; stored `classic` stays `classic`; stored `game` + `reducedMotion` → `classic` with reason; null stored → `classic`; "try anyway" override flag keeps `game` (except when `webgl` is false).
- [ ] **Step 3: `ModeProvider`.** Client context exposing `mode`, `setMode`, `fellBack`, `reasons`, `forceGame()`. Detects capabilities on mount (`WebGLRenderingContext` test canvas, `matchMedia('(prefers-reduced-motion: reduce)')`, `navigator.connection?.saveData`, `navigator.deviceMemory < 4`). Writes the cookie (`path=/; max-age=31536000; SameSite=Lax`) and mirrors to `localStorage` in try/catch.
- [ ] **Step 4: Server read.** In `app/layout.tsx`, read `cookies().get("mode")` and pass as `initialMode` to the provider. (This makes pages dynamic; acceptable for this site.)
- [ ] **Step 5: `ModeSwitch`.** Top-bar control labelled "Game / Classic", real `<button>`s with `aria-pressed`; global `M` shortcut (ignored inside inputs/textareas/contenteditable); switching keeps the same pathname.
- [ ] **Step 6: `ModeChooser`.** An accessible dialog (focus-trapped, Esc = continue in Classic) with two large cards (Game / Classic) and static previews (poster images, no video in Phase 1). Shown over the server-rendered Classic home on `/` when no cookie exists, so crawlers and no-JS visitors still get full content. Choosing writes the cookie; dismissing does not.
- [ ] **Step 7:** Fallback banner component: "Showing Classic Mode because <reason>. Try Game Mode anyway", hidden when `fellBack` is false.
- [ ] **Step 8:** `npm test` (all green), `npm run build`; commit: `feat: game/classic mode system with automatic fallback`.

**Done when:** unit tests pass; switching modes persists across reloads; deep link `/matches/foo` with no cookie renders Classic.

---

## Task 4: Classic Mode core

**Files:** `components/classic/*`, `app/page.tsx`, reuse `Contact.tsx`, `Photography.tsx`

- [ ] **Step 1: `ClassicShell`.** Sticky top nav (Home, Experience, Projects, Skills, Contact, Recruiter view), theme toggle, mode switch, mobile menu (full-screen overlay, focus-trapped, Esc closes), skip-to-content link.
- [ ] **Step 2: `ClassicHome`.** Sections in order: Hero (name, degree line, one-sentence summary, CTAs "View projects" and "Download CV"), Experience timeline (from `experience.ts`), Projects grid (top 6 by a `featured` flag), Skills, Hackathon strip, Photography (existing gallery, restyled to tokens), Contact (existing form + `mailto:Zuberi.Ibad@gmail.com`). Motion: scroll reveal (Framer `useInView`, once), hover lift, count-up for stats; all disabled under reduced motion.
- [ ] **Step 3:** Plain headings (Experience, Projects, Skills): no football wording in Classic.
- [ ] **Step 4:** Update `app/page.tsx`: no cookie → `ClassicHome` + `ModeChooser` overlay; `classic` → `ClassicHome`; `game` → `GameShell` (Task 6; render a "coming up" placeholder until then).
- [ ] **Step 5:** Verify: keyboard-only tab order, headings hierarchy (single `h1`), alt text on all images, mobile at 375 px has no horizontal scroll.
- [ ] **Step 6:** Commit: `feat: classic mode core`.

**Done when:** `/` in Classic shows every phase-1 section from data with no 3D JS in the network panel.

---

## Task 5: Recruiter view

**Files:** `app/recruiter/page.tsx`, `components/recruiter/RecruiterCV.tsx`

- [ ] **Step 1:** Single-column, light-themed page (force `data-theme="light"` on this route's wrapper), print-friendly: summary, education, BMW placement highlights, other experience, projects (compact), skills, links.
- [ ] **Step 2:** Buttons: Download CV (`/Ibad_CV.pdf`), LinkedIn, GitHub, `mailto:`; "Back to site" link that respects the current mode.
- [ ] **Step 3:** `@media print`: hide nav/buttons, set margins, avoid page breaks inside entries (`break-inside: avoid`), A4.
- [ ] **Step 4:** Reachable from Classic nav, a persistent link in Game top bar, and the `R` shortcut in Game Mode.
- [ ] **Step 5:** Commit: `feat: recruiter view`.

**Owner input needed:** replace `public/Ibad_CV.pdf` with the compiled new CV (compile the LaTeX in Overleaf's free tier). Until then the old PDF is served and the task notes it.

**Done when:** page prints to one or two clean A4 pages and works with JS disabled (server-rendered).

---

## Task 6: Game Mode shell, hub and 3D

**Files:** `components/game/*`, `components/game/three/*`, `public/game/*`

- [ ] **Step 1: Static first.** Build `GameShell`, `Hub`, `Tile`, `PromptBar`, `NewsTicker`, `ProfileChip` with a CSS/gradient stadium background and the static poster. Everything works without WebGL.
- [ ] **Step 2: Tiles.** Phase 1: Transfers, Match Centre, Recruiter view active; Trophy Room, Training Ground, Squad, Media, Contact shown as locked ("Coming soon") with `aria-disabled`. Tiles are real links (`next/link`) so they work without JS.
- [ ] **Step 3: Keyboard model.** Arrow keys move selection in a 2-D grid, Enter activates, Esc goes back, `R` Recruiter, `M` mode switch. Handler is attached in the Game layout only and ignores form fields. Selected tile: scale 1.04, border + glow (not colour alone), `aria-current`.
- [ ] **Step 4: Prompt bar** (desktop only): `Enter Select · Esc Back · R Recruiter view · M Classic`.
- [ ] **Step 5: News ticker** from `news.ts`; paused on hover/focus; static single line under reduced motion.
- [ ] **Step 6: Boot screen.** Session-once (sessionStorage flag, try/catch). Contents: wordmark (original lettering), loading bar with rotating tips, "Press any key / Tap to start", visible Skip button. Skipped automatically under reduced motion or on repeat visits.
- [ ] **Step 7: 3D (lazy).**
  - `TunnelScene.tsx`: R3F canvas, camera dolly down a dark tunnel (instanced boxes for walls/lights, emissive light strips, a bright opening that blooms), ~5 s, ends by revealing the hub. Dynamic-imported, `ssr: false`, `dpr` capped at 1.5, `frameloop="demand"` once finished.
  - `HubBackdrop.tsx`: slow floodlight beams and pointer parallax (very low poly), pauses when the tab is hidden.
  - Both show the poster image while loading and as the fallback if the canvas errors (error boundary).
  - Capture `public/game/tunnel-poster.jpg` and `hub-poster.jpg` from the scenes via Playwright's bundled Chromium; compress to budget.
- [ ] **Step 8:** Measure: `npm run build` size report, then confirm the 3D chunk and first-load numbers against the budgets; if over, remove postprocessing and reduce geometry before shipping.
- [ ] **Step 9:** Commit: `feat: game mode hub and 3D boot`.

**Done when:** Game Mode loads with poster then 3D, works with keyboard, touch and mouse, and degrades to the static hub with WebGL disabled.

---

## Task 7: Transfers and Match Centre routes

**Files:** `app/transfers/page.tsx`, `app/matches/page.tsx`, `app/matches/[slug]/page.tsx`, `components/game/TransfersGame.tsx`, `MatchCentreGame.tsx`, `components/classic/ExperienceTimeline.tsx`, `ProjectGrid.tsx`

- [ ] **Step 1:** Each route is a server component that reads the mode cookie and renders either the Game presentation (contract-style cards, fixture panels) or the Classic presentation (timeline / grid) from the same data. Both include `<h1>`, breadcrumbs and a visible back control.
- [ ] **Step 2: Transfers (Game).** Club "contract" cards with stat chips (e.g. `27 KPIs`, `5 source systems`, `7 tablets`, `60+ colleagues`) and expandable highlights; BMW card first, labelled "15-month placement, completed".
- [ ] **Step 3: Match Centre (Game).** Fixture rows (title, competition, outcome, stack tags); selecting opens `/matches/[slug]`. Filters by outcome/stack are optional and deferred if they threaten the schedule.
- [ ] **Step 4: Detail page.** `generateStaticParams` from `projects.ts`; sections Problem, What I built, Stack, Result, Links; `generateMetadata` per project; `notFound()` for unknown slugs.
- [ ] **Step 5:** Ensure every route is usable with JS disabled (server-rendered text) and in both themes.
- [ ] **Step 6:** Commit: `feat: transfers and match centre pages`.

**Done when:** every slug in `projects.ts` builds a page; Classic and Game views show identical facts.

---

## Task 8: Fallbacks, accessibility and performance pass

- [ ] **Step 1:** Manual matrix: (a) WebGL disabled, (b) `prefers-reduced-motion`, (c) Save-Data on, (d) JS disabled, (e) mobile 375×812, (f) tablet, (g) light and dark. Expected: banner + Classic for a–c; readable content for d; no horizontal scroll for e–f.
- [ ] **Step 2:** Keyboard-only walkthrough of both modes (tab order, focus visible, no traps, Esc behaviour).
- [ ] **Step 3:** Run an automated accessibility check (axe-core via Playwright's bundled Chromium, ad-hoc script not committed) on `/`, `/transfers`, `/matches`, one detail page, `/recruiter`; fix serious/critical issues.
- [ ] **Step 4:** Lighthouse (local, Chromium) on Classic `/` and Game `/`; targets: Classic performance ≥ 90, accessibility ≥ 95; Game accessibility ≥ 95 (performance reported, not gated).
- [ ] **Step 5:** Commit fixes: `fix: accessibility and fallback issues`.

---

## Task 9: Cleanup and documentation

- [ ] **Step 1:** Grep for imports of the old sections/UI listed under "Delete"; delete files only when unreferenced; remove old tokens from `tailwind.config.ts` and old keyframes from `globals.css`.
- [ ] **Step 2:** Grep for hard-coded copy that duplicates `lib/data` (names, figures) and replace with data imports.
- [ ] **Step 3:** Update `metadata` (title/description/OpenGraph) in `layout.tsx`: BEng Computer Systems Engineering, 15-month BMW placement, hackathon wins. Add a per-route `metadata` where missing.
- [ ] **Step 4:** Replace the boilerplate `README.md` with a short project README: purpose, modes, structure, run/build/test commands, how to edit content in `lib/data`.
- [ ] **Step 5:** `npm run lint`, `npm run build`, `npm test` all green; commit: `chore: remove retired components, update docs`.

---

## Task 10: Final verification

- [ ] **Step 0 (tooling note):** screenshots and axe/Lighthouse use `playwright-core` with `executablePath: '/opt/pw-browsers/chromium'` (never run `playwright install`); launch with `--use-gl=swiftshader --enable-unsafe-swiftshader` so WebGL works headless. These scripts live in the scratchpad and are not committed.
- [ ] **Step 1:** Run the dev server and exercise: first visit → chooser → Game boot → hub → Transfers → Match Centre → detail → Recruiter → switch to Classic (stays on same page) → reload (mode remembered).
- [ ] **Step 2:** Capture desktop and mobile screenshots of: chooser, Game hub, Transfers, Match Centre, Classic home, Recruiter. Attach to the review notes.
- [ ] **Step 3:** Report honestly: anything not verified (for example behaviour on real mobile GPUs, real Safari), budget numbers measured, any deviations from the spec.
- [ ] **Step 4:** Push to `claude/nifty-fermi-39tjz7`. **Do not open a PR unless the owner asks.** Vercel will build a preview automatically for the branch if the project is connected.

---

## Design quality gates (UI/UX)

Applied to Tasks 2, 4, 6, 7 and 8. If the owner enables design skills/plugins (see notes in chat: `frontend-design`, `Design` with `design-critique` and `accessibility-review`), run them at these points; otherwise perform the same checks by hand.

- [ ] After Task 2: critique the token set and type scale (hierarchy, spacing rhythm, contrast in both themes).
- [ ] After Tasks 4 and 6: design critique of Classic home and Game hub at 375 px and 1440 px (visual hierarchy, tap targets ≥ 44 px, consistent spacing, no decorative motion that competes with content).
- [ ] After Task 7: accessibility review of detail pages (landmarks, heading order, link purpose, focus order).
- [ ] Before Task 10: a final critique pass on screenshots; fix issues rated high before push.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| 3D hurts load or mobile battery | Lazy chunk, capped DPR, demand frameloop after boot, poster fallback, automatic Classic fallback |
| Cookie-based mode makes pages dynamic | Acceptable for a small site; content pages are still server-rendered |
| `images.unoptimized = true` inflates bytes | Compress assets before commit; enforce per-asset limits above |
| React 18 / R3F version mismatch | Pin fiber v8 / drei v9 (see version note) |
| Old CV PDF still served | Owner supplies the compiled new PDF; task 5 notes it |
| Pegboard repo is private | No GitHub link rendered; guarded by a data test |
| Pegboard live URL differs between sources (CV: `getpegboard.co.uk`, README: `pegboard-eta.vercel.app`) | Data file uses `getpegboard.co.uk` per the owner's CV; owner to confirm it resolves (not checkable from the build environment) |
| Contact form destination unchanged | Deliberately out of scope this phase (owner decision) |

## Out of scope for Phase 1

Trophy Room, Training Ground, Squad (3D player card), Media/Contact game tiles, penalty shootout, leaderboard, sound, generated video, changing the contact-form email routing.


---

## Self-review log (2026-10-03)

Reviewed against the spec, the repo (`app/layout.tsx`, `app/page.tsx`, `tailwind.config.ts`, `next.config.mjs`, existing sections) and the owner's constraints (free only, no site code until approved, contact form unchanged).

Issues found and fixed in this plan:
1. **Chooser hid all content from crawlers/no-JS** → chooser is now an overlay on the server-rendered Classic home (Task 3 step 6, Task 4 step 4).
2. **Server shell vs client capability downgrade could disagree** → session-scoped classic override + `router.refresh()`; heavy Game parts wait for capability detection (Task 3).
3. **Headless WebGL for poster capture/screenshots** not addressed → swiftshader flags and `playwright-core` note (Task 10).
4. **Pegboard URL ambiguity** → logged as a risk with an owner confirmation.

Checked and left as is: React 18 ↔ fiber v8/drei v9 pin; `images.unoptimized` budgets; old components deleted only after replacements (Task 9); contact route untouched; no new paid services; no secrets needed.

Verdict: **approved** to start at Task 0. Commits stay local until the owner says to push.


---

## Implementation status (2026-10-03)

Done and verified locally (production build, headless Chromium with software WebGL):
- Tasks 0-5, 7, 9 complete; Task 6 complete except generated poster images (the CSS gradient is the static fallback).
- `npm run lint`, `tsc --noEmit`, `npm test` (34 tests) and `npm run build` pass.
- First Load JS for `/` is 152 kB (budget 350 kB); three.js is in lazy chunks only.
- axe-core (WCAG 2 A/AA + best practice): 0 issues on `/`, `/transfers`, `/matches`, `/matches/pegboard`, `/recruiter` in classic and game, dark and light.
- Verified: first-visit chooser overlay over server-rendered Classic content, Game boot and tunnel, hub keyboard navigation, mode switch via `M` preserving the page, reduced-motion fallback banner, no horizontal scroll at 375 px, content present with JavaScript disabled.

Deviations from the plan/spec:
- Game Mode is dark only (the 3D scenes are dark); the theme toggle is hidden there. Classic and Recruiter keep light and dark.
- Mode choice is stored in cookies only (no localStorage mirror).
- Photography is a lazy thumbnail grid with lightbox (no autoplay carousel), for accessibility.
- Project detail pages share one presentation across both modes.
- Not done: Lighthouse scores, real-device and real-Safari testing, generated poster images, replacing `public/Ibad_CV.pdf` with the new CV (owner to supply).


### Phase 2 status (2026-10-03)
Built: `/trophies` (3D trophy shelf, lazy, desktop only, with a full text list below), `/training`, `/squad` (CSS-3D tilting player card), `/media`, `/contact`, a new About section in Classic Mode, all hub tiles now active, and the new CV PDF installed at `public/Ibad_CV.pdf`. Lint, typecheck, 36 tests, build and axe (0 issues across 10 routes, both modes, both themes) pass.
Still open: Phase 3 (penalty shootout, leaderboard, sound), a software-flavoured CV alongside the electronics one, Lighthouse and real-device testing.


### Phase 3 status (2026-10-03)
Built: `/play` penalty shootout (3D goal, keeper, ball, aim reticle, power meter, 5 kicks, local best score, keyboard/mouse/touch controls) with unit-tested shot logic (`lib/penalty.ts`) and synthesised WebAudio sound effects (`lib/sound.ts`, off by default, no audio files). Both CVs are now downloadable (Software and Electronics). Lint, typecheck, 47 tests, build and axe (0 issues across 11 routes, both modes, both themes) pass; a full 5-kick game was played in headless Chromium without console errors.
Deliberately not built: an online leaderboard. It needs a database and keys; the best score is stored in the visitor's browser only. Add Supabase later if wanted.
