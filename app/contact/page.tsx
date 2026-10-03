import type { Metadata } from "next";
import { Section } from "@/components/classic/Section";
import { ContactBlock } from "@/components/classic/blocks";
import { PageFrame } from "@/components/game/PageFrame";
import { getServerMode } from "@/lib/mode-server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Contact — Ibad Ullah Zuberi" };

export default function ContactPage() {
  if (getServerMode() === "game") {
    return (
      <PageFrame eyebrow="Get in touch" title="Contact">
        <div className="rounded-2xl border border-line/15 bg-panel/90 p-6 backdrop-blur">
          <ContactBlock />
        </div>
      </PageFrame>
    );
  }
  return (
    <Section asH1 id="contact" eyebrow="Get in touch" title="Contact">
      <ContactBlock />
    </Section>
  );
}
