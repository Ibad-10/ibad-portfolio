import type { Metadata } from "next";
import { Section } from "@/components/classic/Section";
import { PageFrame } from "@/components/game/PageFrame";
import { PenaltyGame } from "@/components/game/PenaltyGame";
import { getServerMode } from "@/lib/mode-server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Penalty Shootout — Ibad Ullah Zuberi" };

export default function PlayPage() {
  if (getServerMode() === "game") {
    return (
      <PageFrame eyebrow="Mini-game" title="Penalty Shootout">
        <PenaltyGame />
      </PageFrame>
    );
  }
  return (
    <Section asH1 id="play" eyebrow="Mini-game" title="Penalty Shootout">
      <PenaltyGame />
    </Section>
  );
}
