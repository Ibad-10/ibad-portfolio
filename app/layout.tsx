import type { Metadata } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, THEME_SCRIPT } from "@/components/theme/ThemeProvider";
import { ModeProvider } from "@/components/mode/ModeProvider";
import { AppShell } from "@/components/AppShell";
import { EasterEgg } from "@/components/ui/EasterEgg";
import { getServerMode, hasChosenMode } from "@/lib/mode-server";

const display = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ibad Ullah Zuberi — Computer Systems Engineer",
  description:
    "BEng Computer Systems Engineering at Brunel (predicted First). Completed a 15-month BMW Group placement. Builder of Pegboard and multiple hackathon winners.",
  openGraph: {
    title: "Ibad Ullah Zuberi",
    description: "Computer Systems Engineer · BMW placement · Hackathon winner",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const initialMode = getServerMode();
  const needsChoice = !hasChosenMode();
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <ModeProvider initialMode={initialMode}>
            <EasterEgg />
            <AppShell needsChoice={needsChoice}>{children}</AppShell>
          </ModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
