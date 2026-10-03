"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useMode } from "./ModeProvider";

const SEEN_KEY = "chooser-dismissed";

export function ModeChooser({ needsChoice }: { needsChoice: boolean }) {
  const pathname = usePathname();
  const { setMode } = useMode();
  const [open, setOpen] = useState(false);
  const firstRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!needsChoice || pathname !== "/") return;
    try {
      if (sessionStorage.getItem(SEEN_KEY) === "1") return;
    } catch {
      /* ignore */
    }
    setOpen(true);
  }, [needsChoice, pathname]);

  useEffect(() => {
    if (open) firstRef.current?.focus();
  }, [open]);

  function dismiss() {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  function choose(m: "game" | "classic") {
    setMode(m);
    dismiss();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") return dismiss();
    if (e.key !== "Tab") return;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onKeyDown={onKeyDown}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="chooser-title" className="w-full max-w-2xl rounded-2xl border border-line/15 bg-panel p-6 md:p-8">
        <p className="eyebrow">Welcome</p>
        <h2 id="chooser-title" className="mt-2 font-display text-4xl font-bold uppercase tracking-wide text-text">
          Choose your experience
        </h2>
        <p className="mt-2 text-muted">You can switch at any time with the toggle in the top bar, or by pressing M.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <button ref={firstRef} type="button" onClick={() => choose("game")} className="rounded-xl border border-line/15 p-5 text-left transition hover:border-blue hover:bg-blue/10">
            <span className="font-display text-2xl font-bold uppercase tracking-wide text-text">Game Mode</span>
            <span className="mt-2 block text-sm text-muted">A football-game career hub with 3D scenes. Best on a desktop or a recent phone.</span>
          </button>
          <button type="button" onClick={() => choose("classic")} className="rounded-xl border border-line/15 p-5 text-left transition hover:border-blue hover:bg-blue/10">
            <span className="font-display text-2xl font-bold uppercase tracking-wide text-text">Classic Mode</span>
            <span className="mt-2 block text-sm text-muted">A clean, fast portfolio: experience, projects and skills, no theme.</span>
          </button>
        </div>
        <button type="button" onClick={dismiss} className="mt-5 text-sm text-muted underline underline-offset-2 hover:text-text">
          Skip for now
        </button>
      </div>
    </div>
  );
}
