import type { Metadata } from "next";
import Link from "next/link";
import { PenaltyGame } from "@/components/game/PenaltyGame";

export const metadata: Metadata = { title: "Penalty Shootout — Ibad Ullah Zuberi" };

export default function PlayPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-16">
      <Link href="/" className="text-sm text-muted hover:text-text">
        ← Back to portfolio
      </Link>
      <h1 className="mt-6 font-bold tracking-tight text-5xl md:text-6xl" style={{ fontFamily: "var(--font-manrope), sans-serif", letterSpacing: "-0.05em" }}>
        Penalty <span style={{ fontFamily: "var(--font-fraunces), serif", fontStyle: "italic", fontWeight: 300 }}>Shootout</span>
      </h1>
      <p className="mt-3 max-w-xl text-muted">Five kicks. Aim, lock it, then stop the power bar in the sweet spot. Sound is off until you switch it on.</p>
      <div className="mt-8">
        <PenaltyGame />
      </div>
    </main>
  );
}
