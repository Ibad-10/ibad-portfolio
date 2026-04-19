// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IBAD | Portfolio",
  description: "CS Student · Builder · 3× Hackathon Winner · Robot Maker",
  openGraph: {
    title: "IBAD | Portfolio",
    description: "CS Student · Builder · 3× Hackathon Winner · Robot Maker",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body className="bg-bg text-text-main antialiased" style={{ height: "100%", overflow: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
