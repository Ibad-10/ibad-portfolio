import type { Metadata } from "next";
import { Section } from "@/components/classic/Section";
import { AboutBlock } from "@/components/classic/blocks";
import { PageFrame } from "@/components/game/PageFrame";
import { SquadGame } from "@/components/game/SquadGame";
import { getServerMode } from "@/lib/mode-server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "About — Ibad Ullah Zuberi" };

export default function SquadPage() {
  if (getServerMode() === "game") {
    return (
      <PageFrame eyebrow="Player profile" title="Squad">
        <SquadGame />
      </PageFrame>
    );
  }
  return (
    <Section asH1 id="about" eyebrow="Who I am" title="About">
      <AboutBlock headingLevel={2} />
    </Section>
  );
}
