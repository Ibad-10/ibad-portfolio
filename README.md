# Ibad Ullah Zuberi

Computer Systems Engineering student at **Brunel University London** (BEng, First Class in both years, ranked 1st of 30), based in London.

I build software and hardware: full-stack and AI projects, blockchain hackathon entries, embedded firmware and PLC logic. I have just finished a 15-month industrial placement at **BMW Group** (Plant Hams Hall), where I worked in logistics planning on controls, automation and data. My final-year project is an AI model for dynamic delivery-route optimisation.

**Live portfolio:** https://ibad-portfolio-three.vercel.app
**LinkedIn:** https://www.linkedin.com/in/ibad-ullah-zuberi/ · **Email:** zuberi.ibad@gmail.com

## About me

**Experience**
- **BMW Group**, Logistics Planning Intern (Controls & Automation), Jul 2025 – Sep 2026. Built an Oracle APEX logistics dashboard that doubled KPI coverage from 13 to 27, raised master-data quality from 52% to 61%, projected a 15% throughput gain on a semi-automated forklift system, and wrote PLC ladder logic.
- **EY**, Data Analyst, summer 2024. SAP Analytics Cloud dashboards and forecasting over 20,000+ entries.
- **Cloud Nebula Enterprises**, Web Developer, summer 2024. A data-analysis web tool handling 60,000+ entries.

**Hackathons:** 1st at Encode AI London (Hack the Wallet), 1st at Brunel University Hack (LuffaBot), 1st at Radix Hack (StreamFlow), 3rd at Royal Hackaway v8 (Foodo-Baggins), finalist at EasyA x Polkadot London (Go Fish).

**Things I have built:** [Pegboard](https://getpegboard.co.uk) (a family chore and pocket-money app, live), plus AI agents, Starknet / Polkadot / Radix dApps, and embedded projects on PIC, Arduino and Raspberry Pi Pico.

**Skills:** Python, TypeScript, Java, C/C++, SQL, Verilog · Next.js, React, Flask, FastAPI · LangGraph, LangChain · PLC (TIA Portal, WAGO e!COCKPIT), PIC firmware, FPGA · Oracle APEX, SAP.

CVs: [Software](public/cv/Ibad_Zuberi_CV_Software.pdf) · [Electronics](public/cv/Ibad_Zuberi_CV_Electronics.pdf)

## About this repository

This repo is the source of my portfolio site: a single-page Next.js app with a black theme and one electric-blue accent.

- **Software / Electronics switch** in the hero re-orders the projects, BMW bullets, skills and CV download to match the two CVs.
- **Interactive pieces:** a falling-sand hero (canvas), shader light lines behind the work grid (WebGL), a raw-WebGL photo gallery that orbits a pole as you scroll, smooth scrolling, magnetic buttons and scroll reveals. Everything switches off under `prefers-reduced-motion`, and the content is fully readable without JavaScript.
- **Contact form** posts to `app/api/contact/route.ts` (Resend; needs `RESEND_API_KEY`).
- **`/play`** is a small 3D penalty-shootout game (best score kept in the browser, sound synthesised in code and off by default).

Built with Next.js 14 (App Router), TypeScript, Tailwind, three.js / react-three-fiber (for the game only), Lenis, and deployed on Vercel.

### Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
npm test         # content, privacy and game-logic unit tests
```

### Where things live

| Path | What |
|---|---|
| `lib/site.ts` | All copy and data: projects, the two modes, hackathons, skills, socials. Edit here. |
| `components/v2/` | The page: `Portfolio.tsx` is the client root, one file per section. |
| `components/v2/fx/` | Framework-free effects: `sand.ts`, `lightLines.ts`, `poleGallery.ts`. |
| `app/v2.css` | Styles for the page. |
| `public/cv/` | The two CV PDFs. `public/Ibad_CV.pdf` is kept so old links still work. |
| `public/lightroom/`, `public/photos/` | Gallery and portrait photos. |

### Notes
- Project screenshots load from GitHub `user-attachments` URLs and tech logos from `cdn.simpleicons.org`. If one fails to load it is hidden and a monogram shows instead.
- Pegboard's source repo is private, so the site links only to the live app.
