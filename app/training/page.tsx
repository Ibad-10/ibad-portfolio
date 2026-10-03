import type { Metadata } from "next";
import { Section } from "@/components/classic/Section";
import { SkillsBlock } from "@/components/classic/SkillsBlock";
import { PageFrame } from "@/components/game/PageFrame";
import { TrainingGame } from "@/components/game/TrainingGame";
import { getServerMode } from "@/lib/mode-server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Skills — Ibad Ullah Zuberi" };

export default function TrainingPage() {
  if (getServerMode() === "game") {
    return (
      <PageFrame eyebrow="Attributes" title="Training Ground">
        <TrainingGame />
      </PageFrame>
    );
  }
  return (
    <Section asH1 id="skills" eyebrow="What I work with" title="Skills">
      <SkillsBlock headingLevel={2} />
    </Section>
  );
}
