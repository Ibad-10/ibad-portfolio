import Link from "next/link";
import { education, experience, hackathons, profile, projects, skills } from "@/lib/data";

export function RecruiterCV() {
  const featured = projects.filter((p) => p.featured);
  return (
    <div data-theme="light" className="bg-[#eef1f6] text-[#0b1220] print:bg-white" style={{ ["--bg" as string]: "238 241 246", ["--panel" as string]: "255 255 255", ["--text" as string]: "11 18 32", ["--muted" as string]: "85 96 121", ["--blue" as string]: "30 95 216", ["--garnet" as string]: "176 18 63", ["--gold" as string]: "184 137 42", ["--line" as string]: "11 18 32" }}>
      <article className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <header>
          <h1 className="font-display text-5xl font-bold uppercase tracking-wide">{profile.name}</h1>
          <p className="mt-2 text-[#556079]">{profile.tagline}</p>
          <p className="mt-3 text-sm">
            <a className="text-[#1e5fd8] underline" href={`mailto:${profile.email}`}>{profile.email}</a> · {profile.phone} · {profile.location}
          </p>
          <p className="no-print mt-4 flex flex-wrap gap-3 text-sm">
            <a href={profile.cv} className="rounded-full bg-[#1e5fd8] px-5 py-2 font-semibold text-white">Download CV (PDF)</a>
            <a href={profile.linkedin} className="rounded-full border border-[#0b1220]/25 px-5 py-2 font-semibold">LinkedIn</a>
            <a href={profile.github} className="rounded-full border border-[#0b1220]/25 px-5 py-2 font-semibold">GitHub</a>
            <Link href="/" className="rounded-full border border-[#0b1220]/25 px-5 py-2 font-semibold">Back to site</Link>
          </p>
        </header>

        <section className="mt-8" aria-labelledby="r-edu">
          <h2 id="r-edu" className="border-b border-[#0b1220]/20 pb-1 font-display text-2xl font-bold uppercase tracking-wide">Education</h2>
          <div className="print-entry mt-3">
            <p className="font-semibold">{education.school} <span className="font-normal text-[#556079]">· {education.dates}</span></p>
            <p className="text-sm">{education.degree}</p>
            <ul className="mt-1 list-disc pl-5 text-sm">{education.results.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
        </section>

        <section className="mt-8" aria-labelledby="r-exp">
          <h2 id="r-exp" className="border-b border-[#0b1220]/20 pb-1 font-display text-2xl font-bold uppercase tracking-wide">Experience</h2>
          {experience.map((j) => (
            <div key={j.slug} className="print-entry mt-4">
              <p className="font-semibold">{j.club} <span className="font-normal text-[#556079]">· {j.role} · {j.dates}</span></p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">{j.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            </div>
          ))}
        </section>

        <section className="mt-8" aria-labelledby="r-proj">
          <h2 id="r-proj" className="border-b border-[#0b1220]/20 pb-1 font-display text-2xl font-bold uppercase tracking-wide">Projects</h2>
          {featured.map((p) => (
            <div key={p.slug} className="print-entry mt-3 text-sm">
              <p className="font-semibold">{p.title} <span className="font-normal text-[#556079]">· {p.outcome ?? p.competition} · {p.stack.slice(0, 3).join(", ")}</span></p>
              <p>{p.result}</p>
            </div>
          ))}
        </section>

        <section className="mt-8" aria-labelledby="r-hack">
          <h2 id="r-hack" className="border-b border-[#0b1220]/20 pb-1 font-display text-2xl font-bold uppercase tracking-wide">Hackathons</h2>
          <ul className="mt-3 list-disc pl-5 text-sm">{hackathons.map((h) => <li key={h.event}>{h.result}: {h.event} ({h.year})</li>)}</ul>
        </section>

        <section className="mt-8" aria-labelledby="r-skills">
          <h2 id="r-skills" className="border-b border-[#0b1220]/20 pb-1 font-display text-2xl font-bold uppercase tracking-wide">Skills</h2>
          <dl className="mt-3 space-y-1 text-sm">{skills.map((g) => <div key={g.name}><dt className="inline font-semibold">{g.name}: </dt><dd className="inline">{g.items.join(", ")}</dd></div>)}</dl>
        </section>
      </article>
    </div>
  );
}
