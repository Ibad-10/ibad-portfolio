import Link from "next/link";
import { Section } from "./Section";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { ProjectGrid } from "./ProjectGrid";
import { SkillsBlock } from "./SkillsBlock";
import { PhotoGrid } from "./PhotoGrid";
import { ContactForm } from "./ContactForm";
import { hackathons, profile } from "@/lib/data";

const HERO_STATS = [
  { value: "15", label: "months at BMW" },
  { value: "27", label: "KPIs shipped" },
  { value: "4", label: "hackathon podiums" },
  { value: "1st", label: "of 30 in cohort" },
];

export function ClassicHome() {
  return (
    <>
      <section aria-labelledby="hero-title" className="px-4 py-20 md:px-6 md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">{profile.university} · {profile.standing}</p>
          <h1 id="hero-title" className="mt-3 font-display text-6xl font-bold uppercase leading-[0.95] tracking-wide md:text-8xl">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted md:text-xl">{profile.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#projects" className="rounded-full bg-blue-strong px-6 py-3 font-semibold text-white transition hover:opacity-90">
              View projects
            </Link>
            <a href={profile.cv} className="rounded-full border border-line/20 px-6 py-3 font-semibold transition hover:border-blue">
              Download CV
            </a>
            <Link href="/recruiter" className="rounded-full border border-line/20 px-6 py-3 font-semibold transition hover:border-blue">
              Recruiter view
            </Link>
          </div>
          <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-line/10 pt-8 md:grid-cols-4">
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-5xl font-bold">{s.value}</dd>
                <dt className="mt-1 text-sm text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section id="experience" eyebrow="Where I have worked" title="Experience">
        <ExperienceTimeline />
      </Section>

      <Section id="projects" eyebrow="Things I have built" title="Projects">
        <ProjectGrid />
        <p className="mt-8">
          <Link href="/matches" className="text-blue underline underline-offset-4">
            See all projects
          </Link>
        </p>
      </Section>

      <Section id="skills" eyebrow="What I work with" title="Skills">
        <SkillsBlock />
      </Section>

      <Section id="hackathons" eyebrow="Competitions" title="Hackathons">
        <ul className="divide-y divide-line/10 rounded-2xl border border-line/10 bg-panel">
          {hackathons.map((h) => (
            <li key={h.event} className="flex flex-wrap items-baseline justify-between gap-2 px-6 py-4">
              <div>
                <p className="font-semibold">{h.event}</p>
                <p className="text-sm text-muted">{h.project} · {h.year}</p>
              </div>
              <p className={h.podium ? "font-display text-xl font-bold uppercase text-gold" : "font-display text-xl font-bold uppercase text-muted"}>
                {h.result}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="photography" eyebrow="Away from the keyboard" title="Photography">
        <PhotoGrid />
      </Section>

      <Section id="contact" eyebrow="Get in touch" title="Contact">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-3 text-muted">
            <p>Open to graduate engineering roles and interesting projects.</p>
            <p><a className="text-blue underline" href={`mailto:${profile.email}`}>{profile.email}</a></p>
            <p><a className="text-blue underline" href={profile.linkedin}>LinkedIn</a> · <a className="text-blue underline" href={profile.github}>GitHub</a></p>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
