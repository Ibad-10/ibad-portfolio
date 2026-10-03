import { news } from "@/lib/data";

export function NewsTicker() {
  const items = [...news, ...news];
  return (
    <div className="ticker overflow-hidden border-y border-line/10 bg-panel/80 py-2 backdrop-blur" role="region" aria-label="Latest news">
      <div className="ticker-track font-mono text-xs uppercase tracking-widest text-muted">
        {items.map((n, i) => (
          <span key={i} className="mx-6" aria-hidden={i >= news.length}>
            <span className="mr-3 text-garnet" aria-hidden="true">●</span>
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}
