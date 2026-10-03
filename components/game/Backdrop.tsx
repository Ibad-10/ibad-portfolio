"use client";
import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import { useMode } from "@/components/mode/ModeProvider";

const HubBackdrop = dynamic(() => import("./three/HubBackdrop"), { ssr: false });

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Static gradient always renders; the 3D scene layers on top only once capabilities are known. */
export function Backdrop() {
  const { ready, mode } = useMode();
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-bg">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgb(var(--blue)/0.28),transparent_60%),radial-gradient(ellipse_at_50%_110%,rgb(var(--garnet)/0.18),transparent_55%)]" />
      {ready && mode === "game" && (
        <Boundary>
          <div className="absolute inset-0 opacity-80">
            <HubBackdrop />
          </div>
        </Boundary>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg/80" />
    </div>
  );
}
