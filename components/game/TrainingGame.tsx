import { skills } from "@/lib/data";

export function TrainingGame() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {skills.map((g) => (
        <section key={g.name} aria-label={g.name} className="rounded-2xl border border-line/15 bg-panel/90 p-6 backdrop-blur">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide">{g.name}</h2>
            <p className="font-display text-4xl font-bold text-blue">{g.items.length}</p>
          </div>
          <p className="eyebrow">skills in this attribute</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {g.items.map((s) => (
              <li key={s} className="rounded-md border border-line/15 px-2.5 py-1 text-sm">{s}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
