import type { Metadata } from "next";
import { Section } from "@/components/classic/Section";
import { PhotoGrid } from "@/components/classic/PhotoGrid";
import { PageFrame } from "@/components/game/PageFrame";
import { getServerMode } from "@/lib/mode-server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Photography — Ibad Ullah Zuberi" };

export default function MediaPage() {
  if (getServerMode() === "game") {
    return (
      <PageFrame eyebrow="Street and architecture" title="Media">
        <PhotoGrid />
      </PageFrame>
    );
  }
  return (
    <Section asH1 id="photography" eyebrow="Away from the keyboard" title="Photography">
      <PhotoGrid />
    </Section>
  );
}
