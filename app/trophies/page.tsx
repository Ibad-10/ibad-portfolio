import type { Metadata } from "next";
import { Section } from "@/components/classic/Section";
import { HackathonList } from "@/components/classic/blocks";
import { PageFrame } from "@/components/game/PageFrame";
import { TrophyRoomGame } from "@/components/game/TrophyRoomGame";
import { getServerMode } from "@/lib/mode-server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Hackathons — Ibad Ullah Zuberi" };

export default function TrophiesPage() {
  if (getServerMode() === "game") {
    return (
      <PageFrame eyebrow="Hackathon results" title="Trophy Room">
        <TrophyRoomGame />
      </PageFrame>
    );
  }
  return (
    <Section asH1 id="hackathons" eyebrow="Competitions" title="Hackathons">
      <HackathonList />
    </Section>
  );
}
