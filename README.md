# Ibad Ullah Zuberi — Portfolio

Next.js 14 (App Router) single-page portfolio. Black theme, white ink, one electric-blue accent.

- **Software / Electronics switch** in the hero re-orders the projects, BMW bullets, skills and CV download from the two CVs.
- **Interactive pieces:** a falling-sand hero (canvas), a shader light-line background behind the work grid (WebGL), a raw-WebGL "pole gallery" for photography, Lenis smooth scroll, magnetic buttons, letter-roll hovers and scroll reveals. All of it switches off under `prefers-reduced-motion`.
- **Contact form** posts to `app/api/contact/route.ts` (Resend, needs `RESEND_API_KEY`).
- **`/play`** is a 3D penalty-shootout mini-game (best score kept in the browser; sound is synthesised in code and off by default).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
npm test         # content + game-logic unit tests
```

## Where things live

| Path | What |
|---|---|
| `lib/site.ts` | All copy and data: projects, modes (Software / Electronics), hackathons, skills, socials. Edit here. |
| `components/v2/` | The page: `Portfolio.tsx` is the client root; one file per section. |
| `components/v2/fx/` | Framework-free effects: `sand.ts`, `lightLines.ts`, `poleGallery.ts`. |
| `app/v2.css` | Styles for the page (design tokens are in the README of the design handoff). |
| `public/cv/` | The two CV PDFs linked from the hero and footer. `public/Ibad_CV.pdf` is kept so old links still work. |
| `public/lightroom/`, `public/photos/` | Gallery and portrait photos. |

## Notes

- Project screenshots load from GitHub `user-attachments` URLs and tech logos from `cdn.simpleicons.org`; if one fails to load it is hidden and a monogram shows instead.
- Pegboard's GitHub link is intentionally omitted while that repo is private.
- Earlier "Career Mode" redesign notes are kept in `docs/superpowers/` for history; that UI was replaced by this design.
