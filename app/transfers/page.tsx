import type { Metadata } from "next";
import { Section } from "@/components/classic/Section";
import { ExperienceTimeline } from "@/components/classic/ExperienceTimeline";
import { PageFrame } from "@/components/game/PageFrame";
import { TransfersGame } from "@/components/game/TransfersGame";
import { getServerMode } from "@/lib/mode-server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Experience — Ibad Ullah Zuberi" };

export default function TransfersPage() {
  if (getServerMode() === "game") {
    return (
      <PageFrame eyebrow="Career history" title="Transfers">
        <TransfersGame />
      </PageFrame>
    );
  }
  return (
    <Section asH1 id="experience" eyebrow="Where I have worked" title="Experience">
      <ExperienceTimeline headingLevel={2} />
    </Section>
  );
}
