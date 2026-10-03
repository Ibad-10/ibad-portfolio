import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { projects, type Project } from "@/lib/data";

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live",
  shipped: "Shipped",
  "in-progress": "In progress",
};

export function ProjectGrid({ all = false, headingLevel = 3 }: { all?: boolean; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const list = all ? projects : projects.filter((p) => p.featured);
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {list.map((p, i) => (
        <li key={p.slug}>
          <Reveal delay={(i % 3) * 0.05} className="h-full">
            <Link
              href={`/matches/${p.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-line/10 bg-panel p-6 transition hover:-translate-y-1 hover:border-blue"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="eyebrow">{p.competition}</span>
                <span className="rounded-full border border-line/15 px-2 py-0.5 text-xs text-muted">{STATUS_LABEL[p.status]}</span>
              </div>
              <H className="mt-3 font-display text-2xl font-bold uppercase tracking-wide group-hover:text-blue">{p.title}</H>
              {p.outcome ? <p className="mt-1 text-sm font-semibold text-gold">{p.outcome}</p> : null}
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
                {p.stack.slice(0, 4).map((s) => (
                  <li key={s} className="rounded-md bg-line/5 px-2 py-1 font-mono text-xs text-text/80">
                    {s}
                  </li>
                ))}
              </ul>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
