"use client";
import { useMode } from "@/components/mode/ModeProvider";
import { FallbackBanner } from "@/components/mode/FallbackBanner";
import { ModeChooser } from "@/components/mode/ModeChooser";
import { ClassicShell } from "@/components/classic/ClassicShell";
import { GameShell } from "@/components/game/GameShell";

export function AppShell({ needsChoice, children }: { needsChoice: boolean; children: React.ReactNode }) {
  const { mode } = useMode();
  return (
    <>
      <FallbackBanner />
      {mode === "game" ? <GameShell>{children}</GameShell> : <ClassicShell>{children}</ClassicShell>}
      <ModeChooser needsChoice={needsChoice} />
    </>
  );
}
