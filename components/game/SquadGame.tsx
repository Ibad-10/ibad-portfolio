import { PlayerCard } from "./PlayerCard";
import { AboutBlock } from "@/components/classic/blocks";

export function SquadGame() {
  return (
    <div className="grid items-start gap-10 md:grid-cols-[300px_1fr]">
      <PlayerCard />
      <div className="rounded-2xl border border-line/15 bg-panel/90 p-6 backdrop-blur">
        <AboutBlock headingLevel={2} />
      </div>
    </div>
  );
}
