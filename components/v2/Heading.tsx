import type { CSSProperties, ElementType } from "react";

export type Part = string | { i: string };

/** Big heading whose letters rise in one by one. Letters are real text in the server HTML. */
export function Heading({ parts, className = "", as: Tag = "h2" }: { parts: Part[]; className?: string; as?: ElementType }) {
  const label = parts.map((p) => (typeof p === "string" ? p : p.i)).join("");
  let n = 0;
  const letters = (text: string) =>
    text.split(/(\s+)/).map((chunk, ci) => {
      if (!chunk) return null;
      if (/^\s+$/.test(chunk)) return chunk;
      return (
        <span className="wd" key={ci}>
          {Array.from(chunk).map((ch, k) => (
            <span className="lt" key={k} style={{ ["--i" as string]: n++ } as CSSProperties}>
              {ch}
            </span>
          ))}
        </span>
      );
    });
  return (
    <Tag className={`rv-h disp ${className}`} aria-label={label}>
      <span aria-hidden="true">
        {parts.map((p, i) => (typeof p === "string" ? <span key={i}>{letters(p)}</span> : <span key={i} className="ital">{letters(p.i)}</span>))}
      </span>
    </Tag>
  );
}
