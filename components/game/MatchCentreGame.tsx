import Link from "next/link";
import { projects } from "@/lib/data";

export function MatchCentreGame() {
  return (
    <ul className="space-y-3">
      {projects.map((p) => (
        <li key={p.slug}>
          <Link
            href={`/matches/${p.slug}`}
            className="grid items-center gap-3 rounded-xl border border-line/15 bg-panel/90 p-4 backdrop-blur transition hover:border-blue hover:shadow-[0_0_24px_rgb(var(--blue)/0.3)] md:grid-cols-[1fr_auto]"
          >
            <div>
              <p className="eyebrow">{p.competition} · {p.year}</p>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide">{p.title}</h2>
              <p className="mt-1 text-sm text-muted">{p.summary}</p>
              <ul className="mt-2 flex flex-wrap gap-2" aria-label="Stack">
                {p.stack.slice(0, 4).map((s) => <li key={s} className="rounded bg-line/5 px-2 py-0.5 font-mono text-xs">{s}</li>)}
              </ul>
            </div>
            {p.outcome ? (
              <span className="justify-self-start rounded-lg border border-gold/60 px-4 py-2 font-display text-xl font-bold uppercase tracking-wide text-gold md:justify-self-end">
                {p.outcome}
              </span>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
