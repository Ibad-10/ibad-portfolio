import { experience } from "@/lib/data";

export function TransfersGame() {
  return (
    <ol className="space-y-6">
      {experience.map((job, i) => (
        <li key={job.slug}>
          <article className="overflow-hidden rounded-2xl border border-line/15 bg-panel/90 backdrop-blur">
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line/10 bg-blue/10 px-6 py-4">
              <div>
                <p className="eyebrow">{i === 0 ? "Latest spell" : "Previous spell"} · {job.dates}</p>
                <h2 className="font-display text-3xl font-bold uppercase tracking-wide">{job.club}</h2>
                <p className="text-sm text-text/90">{job.role}{job.location ? ` · ${job.location}` : ""}</p>
              </div>
              {job.note ? <span className="rounded-full border border-gold/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">{job.note}</span> : null}
            </header>
            <div className="p-6">
              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {job.stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-line/10 bg-bg/40 p-3 text-center">
                    <dd className="font-display text-4xl font-bold">{s.value}</dd>
                    <dt className="text-xs uppercase tracking-wider text-muted">{s.label}</dt>
                  </div>
                ))}
              </dl>
              <details className="mt-5 group" open={i === 0}>
                <summary className="cursor-pointer text-sm font-semibold text-blue">Season highlights</summary>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-text/90 marker:text-muted">
                  {job.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
              </details>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
