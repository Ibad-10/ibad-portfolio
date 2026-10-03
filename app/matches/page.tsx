import type { Metadata } from "next";
import { Section } from "@/components/classic/Section";
import { ProjectGrid } from "@/components/classic/ProjectGrid";
import { PageFrame } from "@/components/game/PageFrame";
import { MatchCentreGame } from "@/components/game/MatchCentreGame";
import { getServerMode } from "@/lib/mode-server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Projects — Ibad Ullah Zuberi" };

export default function MatchesPage() {
  if (getServerMode() === "game") {
    return (
      <PageFrame eyebrow="Fixtures and results" title="Match Centre">
        <MatchCentreGame />
      </PageFrame>
    );
  }
  return (
    <Section asH1 id="projects" eyebrow="Things I have built" title="All projects">
      <ProjectGrid all headingLevel={2} />
    </Section>
  );
}
