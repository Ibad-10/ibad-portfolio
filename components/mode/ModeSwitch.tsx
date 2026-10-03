"use client";
import { useEffect } from "react";
import { useMode } from "./ModeProvider";

export function ModeSwitch({ className = "" }: { className?: string }) {
  const { mode, setMode } = useMode();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key.toLowerCase() !== "m" || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
      setMode(mode === "game" ? "classic" : "game");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, setMode]);

  const base = "px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-colors";
  const on = "bg-blue-strong text-white";
  const off = "text-muted hover:text-text";
  return (
    <div role="group" aria-label="Site mode (press M to switch)" className={`inline-flex overflow-hidden rounded-full border border-line/15 ${className}`}>
      <button type="button" aria-pressed={mode === "game"} onClick={() => setMode("game")} className={`${base} ${mode === "game" ? on : off}`}>
        Game
      </button>
      <button type="button" aria-pressed={mode === "classic"} onClick={() => setMode("classic")} className={`${base} ${mode === "classic" ? on : off}`}>
        Classic
      </button>
    </div>
  );
}
