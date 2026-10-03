import { ContactForm } from "./ContactForm";
import { about, hackathons, profile } from "@/lib/data";

export function AboutBlock({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
      <div className="space-y-4 text-lg leading-relaxed text-text/90">
        {about.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div>
        <H className="eyebrow">Interests</H>
        <ul className="mt-3 space-y-2">
          {about.interests.map((i) => (
            <li key={i} className="rounded-lg border border-line/10 bg-panel px-4 py-2 text-sm">
              {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function HackathonList() {
  return (
    <ul className="divide-y divide-line/10 rounded-2xl border border-line/10 bg-panel">
      {hackathons.map((h) => (
        <li key={h.event} className="flex flex-wrap items-baseline justify-between gap-2 px-6 py-4">
          <div>
            <p className="font-semibold">{h.event}</p>
            <p className="text-sm text-muted">
              {h.project} · {h.year}
            </p>
          </div>
          <p className={h.podium ? "font-display text-xl font-bold uppercase text-gold" : "font-display text-xl font-bold uppercase text-muted"}>
            {h.result}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function ContactBlock() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="space-y-3 text-muted">
        <p>Open to graduate engineering roles and interesting projects.</p>
        <p>
          <a className="text-blue underline" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </p>
        <p>
          <a className="text-blue underline" href={profile.linkedin}>LinkedIn</a> ·{" "}
          <a className="text-blue underline" href={profile.github}>GitHub</a>
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
