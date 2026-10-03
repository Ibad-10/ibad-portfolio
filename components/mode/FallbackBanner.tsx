"use client";
import { useMode } from "./ModeProvider";

export function FallbackBanner() {
  const { fellBack, reasons, forceGame } = useMode();
  if (!fellBack) return null;
  return (
    <div role="status" className="no-print border-b border-line/15 bg-panel px-4 py-2 text-sm text-muted">
      Showing Classic Mode because {reasons.join(" and ")}.{" "}
      <button type="button" onClick={forceGame} className="font-semibold text-blue underline underline-offset-2">
        Try Game Mode anyway
      </button>
    </div>
  );
}
