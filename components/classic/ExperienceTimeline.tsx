import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/lib/data";

export function ExperienceTimeline({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <ol className="space-y-6">
      {experience.map((job, i) => (
        <li key={job.slug}>
          <Reveal delay={i * 0.05}>
            <article className="print-entry rounded-2xl border border-line/10 bg-panel p-6 md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <H className="font-display text-2xl font-bold uppercase tracking-wide">{job.club}</H>
                <p className="font-mono text-sm text-muted">{job.dates}</p>
              </div>
              <p className="mt-1 text-text/90">
                {job.role}
                {job.location ? <span className="text-muted"> · {job.location}</span> : null}
              </p>
              {job.note ? <p className="mt-1 text-sm text-gold">{job.note}</p> : null}
              {job.stats.length > 0 && (
                <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {job.stats.map((s) => (
                    <div key={s.label}>
                      <dt className="text-xs uppercase tracking-wider text-muted">{s.label}</dt>
                      <dd className="font-display text-3xl font-bold text-text">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-text/90 marker:text-muted">
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
