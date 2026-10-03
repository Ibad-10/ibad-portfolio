import { Reveal } from "@/components/ui/Reveal";
import { skills } from "@/lib/data";

export function SkillsBlock({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {skills.map((g, i) => (
        <Reveal key={g.name} delay={(i % 3) * 0.05}>
          <section aria-label={g.name} className="print-entry h-full rounded-2xl border border-line/10 bg-panel p-6">
            <H className="font-display text-xl font-bold uppercase tracking-wide">{g.name}</H>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s} className="rounded-md border border-line/10 px-2.5 py-1 text-sm text-text/90">
                  {s}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      ))}
    </div>
  );
}
