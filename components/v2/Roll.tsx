import type { CSSProperties } from "react";

/** Per-letter rolling label. Put `rollhost` on the parent link or button. */
export function Roll({ text }: { text: string }) {
  return (
    <>
      <span className="roll" aria-hidden="true">
        {Array.from(text).map((ch, i) => (
          <span key={i} style={{ ["--d" as string]: `${i * 18}ms` } as CSSProperties}>
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}
