# Ibad Ullah Zuberi — Portfolio

Next.js 14 (App Router) portfolio with two presentations of the same content:

- **Game Mode:** a football-game "Career Mode" hub with a lazy-loaded 3D tunnel intro and stadium backdrop (three.js / react-three-fiber). Dark only.
- **Classic Mode:** a plain, fast, animated portfolio. Light and dark themes.

Visitors choose on first visit and can switch any time (top-bar toggle, or press `M`). Devices without WebGL, or that prefer reduced motion / data saving, fall back to Classic automatically. `/recruiter` is a printable one-page CV.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
npm test         # unit tests for content data, mode logic and colour contrast
```

## Where things live

| Path | What |
|---|---|
| `lib/data/*.ts` | All portfolio content (profile, experience, projects, skills, hackathons, ticker news). Edit here; both modes and the Recruiter view update. |
| `lib/mode.ts` | Mode and fallback logic (unit-tested). |
| `app/globals.css` | Design tokens (dark and light). Contrast is enforced by `lib/contrast.test.ts`. |
| `components/classic/` | Classic Mode UI. |
| `components/game/` | Game Mode UI; `components/game/three/` is the lazy 3D code. |
| `app/api/contact/route.ts` | Contact form (Resend). Needs `RESEND_API_KEY`. |

## Notes

- Pegboard's GitHub link is intentionally omitted while that repo is private (`PEGBOARD_REPO_PUBLIC` in `lib/data/projects.ts`).
- Design spec and plan: `docs/superpowers/specs/2026-10-03-career-mode-redesign-design.md` and `docs/superpowers/plans/2026-10-03-career-mode-phase-1.md`.
