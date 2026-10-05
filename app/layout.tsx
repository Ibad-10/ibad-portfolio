import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "./v2.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", weight: ["500", "600", "700"], display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", style: ["italic"], axes: ["opsz"], display: "swap" });
const geist = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-geist", weight: "100 900", display: "swap" });

export const metadata: Metadata = {
  title: "Ibad Ullah Zuberi — Software and Electronics Engineer",
  description:
    "BEng Computer Systems Engineering at Brunel (First Class, 1st of 30). Completed a 15-month BMW Group placement. Builder of Pegboard and three-time hackathon winner.",
  openGraph: {
    title: "Ibad Ullah Zuberi",
    description: "Software and electronics engineer · BMW Group placement · Hackathon winner",
    type: "website",
  },
};

// Adds the "motion" class before first paint so scroll reveals can start hidden without a flash.
// Visitors without JavaScript, or who prefer reduced motion, always see the content.
const MOTION_SCRIPT = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${fraunces.variable} ${geist.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
