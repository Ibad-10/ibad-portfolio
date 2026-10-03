"use client";
import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { KICKS, clamp, keeperChoice, powerFromPhase, resolveShot, summarise, type Outcome } from "@/lib/penalty";
import { detectWebGL } from "@/lib/webgl";
import { loadSoundPref, play, setSoundEnabled } from "@/lib/sound";
import type { ShotState } from "./three/PenaltyScene";

const PenaltyScene = dynamic(() => import("./three/PenaltyScene"), { ssr: false });
const BEST_KEY = "penalty-best";

class Boundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

type Phase = "aim" | "power" | "shot" | "done";
const RESULT_TEXT: Record<Outcome, string> = { goal: "GOAL!", saved: "Saved!", missed: "Missed!" };

export function PenaltyGame() {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [phase, setPhase] = useState<Phase>("aim");
  const [kick, setKick] = useState(0);
  const [aim, setAim] = useState({ x: 0, y: 0.5 });
  const [shot, setShot] = useState<ShotState | null>(null);
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);
  const [message, setMessage] = useState("Aim with the mouse, touch or arrow keys, then lock your aim.");
  const [best, setBest] = useState<number | null>(null);
  const [sound, setSound] = useState(false);

  const powerRef = useRef(0);
  const barRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const idRef = useRef(0);

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    setWebgl(detectWebGL());
    setSound(loadSoundPref());
    try {
      const b = localStorage.getItem(BEST_KEY);
      if (b !== null) setBest(Number(b));
    } catch {
      /* ignore */
    }
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  // Power meter animation (updates the DOM directly to avoid re-rendering every frame).
  useEffect(() => {
    if (phase !== "power") return;
    const start = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      powerRef.current = powerFromPhase(((now - start) / 1000) * 0.85);
      if (barRef.current) barRef.current.style.width = `${powerRef.current * 100}%`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const lockAim = useCallback(() => {
    play("click");
    setPhase("power");
    setMessage("Press Space, Enter or Shoot when the bar is in the sweet spot (not empty, not full).");
  }, []);

  const shoot = useCallback(() => {
    const power = powerRef.current;
    const dive = keeperChoice(Math.random);
    const outcome = resolveShot({ aimX: aim.x, aimY: aim.y, power, dive });
    idRef.current += 1;
    setShot({ id: idRef.current, aimX: aim.x, aimY: aim.y, power, dive, outcome });
    setPhase("shot");
    setMessage("…");
    play("kick");
    later(() => {
      play(outcome === "goal" ? "goal" : outcome === "saved" ? "save" : "miss");
      setMessage(RESULT_TEXT[outcome]);
      const next = [...outcomesRef.current, outcome];
      outcomesRef.current = next;
      setOutcomes(next);
    }, 650);
    later(() => {
      if (outcomesRef.current.length >= KICKS) {
        const goals = outcomesRef.current.filter((o) => o === "goal").length;
        setPhase("done");
        setBest((prev) => {
          const nb = prev === null ? goals : Math.max(prev, goals);
          try {
            localStorage.setItem(BEST_KEY, String(nb));
          } catch {
            /* ignore */
          }
          return nb;
        });
        play("whistle");
      } else {
        setKick((k) => k + 1);
        setShot(null);
        setPhase("aim");
        setMessage("Next kick: aim, then lock your aim.");
      }
    }, 2400);
  }, [aim, later]);

  const outcomesRef = useRef<Outcome[]>([]);
  useEffect(() => {
    outcomesRef.current = outcomes;
  }, [outcomes]);

  const restart = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    outcomesRef.current = [];
    setOutcomes([]);
    setKick(0);
    setShot(null);
    setAim({ x: 0, y: 0.5 });
    setPhase("aim");
    setMessage("Aim with the mouse, touch or arrow keys, then lock your aim.");
    play("whistle");
  }, []);

  // Keyboard controls.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "BUTTON")) {
        if (!(e.key.startsWith("Arrow"))) return;
      }
      if (phase === "aim") {
        const step = 0.08;
        if (e.key === "ArrowLeft") { setAim((a) => ({ ...a, x: clamp(a.x - step, -1, 1) })); e.preventDefault(); }
        if (e.key === "ArrowRight") { setAim((a) => ({ ...a, x: clamp(a.x + step, -1, 1) })); e.preventDefault(); }
        if (e.key === "ArrowUp") { setAim((a) => ({ ...a, y: clamp(a.y + step, 0, 1) })); e.preventDefault(); }
        if (e.key === "ArrowDown") { setAim((a) => ({ ...a, y: clamp(a.y - step, 0, 1) })); e.preventDefault(); }
        if (e.key === " " || e.key === "Enter") { e.preventDefault(); lockAim(); }
      } else if (phase === "power") {
        if (e.key === " " || e.key === "Enter") { e.preventDefault(); shoot(); }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, lockAim, shoot]);

  function onPointer(e: React.PointerEvent) {
    if (phase !== "aim") return;
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setAim({ x: clamp((px - 0.5) * 2.4, -1, 1), y: clamp(1 - (py - 0.2) / 0.5, 0, 1) });
  }

  function toggleSound() {
    const next = !sound;
    setSound(next);
    setSoundEnabled(next);
    if (next) play("whistle");
  }

  if (webgl === false) {
    return (
      <p role="status" className="rounded-xl border border-line/15 bg-panel p-6 text-muted">
        The penalty shootout needs WebGL, which this browser does not support. Try another browser or device.
      </p>
    );
  }

  const { goals, label } = summarise(outcomes);
  const showReticle = phase === "aim" || phase === "power";
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted" aria-live="polite">
          Kick {Math.min(kick + 1, KICKS)} of {KICKS} · Goals {goals}
          {best !== null ? ` · Best ${best}` : ""}
        </p>
        <button type="button" onClick={toggleSound} aria-pressed={sound} className="rounded-full border border-line/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest hover:border-blue">
          Sound {sound ? "on" : "off"}
        </button>
      </div>

      <div
        ref={stageRef}
        onPointerMove={onPointer}
        onPointerDown={onPointer}
        onPointerUp={(e) => {
          if (e.pointerType === "mouse" && phase === "aim") lockAim();
        }}
        className="relative h-[380px] touch-none overflow-hidden rounded-2xl border border-line/15 bg-panel md:h-[440px]"
      >
        {webgl && (
          <Boundary fallback={<p className="p-6 text-muted">The 3D scene could not start on this device.</p>}>
            <PenaltyScene aim={aim} showReticle={showReticle} shot={shot} />
          </Boundary>
        )}
        <p className="pointer-events-none absolute left-0 right-0 top-4 text-center font-display text-4xl font-bold uppercase tracking-wide text-white drop-shadow md:text-6xl" aria-hidden="true">
          {phase === "shot" || phase === "done" ? message : ""}
        </p>
        {phase === "done" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/65 p-6 text-center text-white" role="dialog" aria-label="Final score">
            <p className="eyebrow !text-white/70">Full time</p>
            <p className="font-display text-7xl font-bold">{goals} / {KICKS}</p>
            <p className="font-display text-3xl font-bold uppercase text-[#E6B84C]">{label}</p>
            {best !== null && <p className="text-sm text-white/80">Your best: {best} / {KICKS}</p>}
            <button type="button" onClick={restart} className="mt-2 rounded-full bg-blue-strong px-8 py-3 font-display text-xl font-bold uppercase tracking-widest text-white">
              Play again
            </button>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="h-3 overflow-hidden rounded-full bg-line/15" aria-hidden="true">
          <div ref={barRef} className="h-full rounded-full bg-gradient-to-r from-blue-strong to-garnet" style={{ width: phase === "power" ? undefined : "0%" }} />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {phase === "aim" && (
            <button type="button" onClick={lockAim} className="rounded-full bg-blue-strong px-8 py-3 font-display text-xl font-bold uppercase tracking-widest text-white">
              Lock aim
            </button>
          )}
          {phase === "power" && (
            <button type="button" onClick={shoot} className="rounded-full bg-garnet px-8 py-3 font-display text-xl font-bold uppercase tracking-widest text-white">
              Shoot
            </button>
          )}
          <p role="status" aria-live="polite" className="text-sm text-muted">{message}</p>
        </div>
        <ul className="flex gap-2" aria-label="Kick results">
          {Array.from({ length: KICKS }, (_, i) => {
            const o = outcomes[i];
            return (
              <li key={i} className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold ${o === "goal" ? "border-gold bg-gold/20 text-gold" : o ? "border-line/30 text-muted" : "border-line/15 text-muted"}`} aria-label={`Kick ${i + 1}: ${o ?? "not taken"}`}>
                {o === "goal" ? "⚽" : o === "saved" ? "✕" : o === "missed" ? "–" : i + 1}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
