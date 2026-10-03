"use client";
import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useState, type ReactNode } from "react";
import { useMode } from "@/components/mode/ModeProvider";
import { profile } from "@/lib/data";

const TunnelScene = dynamic(() => import("./three/TunnelScene"), { ssr: false });
const SEEN = "boot-seen";
const TIPS = [
  "TIP: Press R any time for the Recruiter view.",
  "TIP: Press M to switch between Game and Classic.",
  "TIP: Use the arrow keys to move around the hub.",
];

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function BootScreen({ onDone }: { onDone: () => void }) {
  const { ready } = useMode();
  const [phase, setPhase] = useState<"splash" | "tunnel">("splash");
  const [progress, setProgress] = useState(0);
  const [tip] = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)]);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SEEN, "1");
    } catch {
      /* ignore */
    }
    onDone();
  }, [onDone]);

  useEffect(() => {
    if (phase !== "splash") return;
    const id = setInterval(() => setProgress((p) => Math.min(p + 8, 100)), 90);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "tunnel") return;
    const id = setTimeout(finish, 4600);
    return () => clearTimeout(id);
  }, [phase, finish]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") return finish();
      if (phase === "splash" && progress >= 100) setPhase("tunnel");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, progress, finish]);

  return (
    <div role="dialog" aria-modal="true" aria-label="Game intro" className="fixed inset-0 z-[80] bg-bg">
      {phase === "tunnel" && ready && (
        <Boundary>
          <div className="absolute inset-0">
            <TunnelScene />
          </div>
        </Boundary>
      )}
      {phase === "splash" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="eyebrow">Career Mode</p>
          <h1 className="font-display text-6xl font-bold uppercase tracking-wide md:text-8xl">{profile.name}</h1>
          <div className="h-1 w-64 overflow-hidden rounded-full bg-line/15" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Loading">
            <div className="h-full bg-blue transition-[width] duration-100" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm text-muted">{tip}</p>
          <button
            type="button"
            disabled={progress < 100}
            onClick={() => setPhase("tunnel")}
            className="rounded-full bg-blue-strong px-8 py-3 font-display text-xl font-bold uppercase tracking-widest text-white transition disabled:opacity-40"
          >
            {progress < 100 ? "Loading…" : "Press any key to start"}
          </button>
        </div>
      )}
      <button type="button" onClick={finish} className="absolute right-4 top-4 rounded-full border border-line/25 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-text hover:border-blue">
        Skip intro
      </button>
    </div>
  );
}

export function bootAlreadySeen(): boolean {
  try {
    return sessionStorage.getItem(SEEN) === "1";
  } catch {
    return false;
  }
}
