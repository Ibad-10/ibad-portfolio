"use client";
import dynamic from "next/dynamic";
import { Component, useState, type ReactNode } from "react";
import { useMode } from "@/components/mode/ModeProvider";
import { hackathons, trophyTier } from "@/lib/data";

const TrophyShelf = dynamic(() => import("./three/TrophyShelf"), { ssr: false });

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function TrophyRoomGame() {
  const { ready } = useMode();
  const [active, setActive] = useState(0);
  const tiers = hackathons.map((h) => trophyTier(h.result));
  const current = hackathons[active];

  return (
    <div className="space-y-8">
      {ready && (
        <div className="hidden overflow-hidden rounded-2xl border border-line/15 bg-panel/70 backdrop-blur sm:block">
          <div className="h-[380px]">
            <Boundary>
              <TrophyShelf tiers={tiers} active={active} onActive={setActive} />
            </Boundary>
          </div>
          <p className="border-t border-line/10 px-6 py-3 text-sm text-muted" aria-live="polite">
            <span className="font-semibold text-text">{current.event}</span> · {current.result} · {current.project}
          </p>
        </div>
      )}
      <ul className="grid gap-4 md:grid-cols-2">
        {hackathons.map((h, i) => {
          const tier = trophyTier(h.result);
          const tone = tier === "gold" ? "text-gold" : tier === "bronze" ? "text-gold" : "text-muted";
          return (
            <li key={h.event}>
              <button
                type="button"
                onFocus={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className="w-full rounded-xl border border-line/15 bg-panel/90 p-5 text-left backdrop-blur transition hover:border-blue focus-visible:border-blue"
                aria-label={`${h.event}: ${h.result} with ${h.project}`}
              >
                <p className="eyebrow">{h.year}</p>
                <p className={`font-display text-3xl font-bold uppercase tracking-wide ${tone}`}>{h.result}</p>
                <p className="mt-1 font-semibold">{h.event}</p>
                <p className="text-sm text-muted">{h.project}</p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
