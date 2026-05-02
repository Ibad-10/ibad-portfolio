import type { Metadata } from "next";
import { Unbounded, IBM_Plex_Mono, Syne } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/ui/NavBar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { EasterEgg } from "@/components/ui/EasterEgg";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["200", "400", "700", "900"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ibad Ullah Zuberi — Portfolio",
  description:
    "BEng Computer Systems Engineering @ Brunel. BMW Logistics Intern. AI, Blockchain, Robotics builder. 3× Hackathon Winner.",
  openGraph: {
    title: "Ibad Ullah Zuberi",
    description: "CS Engineer · BMW Intern · AI + Robotics Builder",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${unbounded.variable} ${ibmPlexMono.variable} ${syne.variable}`}>
      <body className="bg-[#050505] text-white antialiased">
        <CustomCursor />
        <ScrollProgress />
        <NavBar />
        <EasterEgg />
        {children}
      </body>
    </html>
  );
}
