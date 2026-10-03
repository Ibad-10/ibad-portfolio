export type Outcome = "goal" | "saved" | "missed";
export type Dive = -1 | 0 | 1;

export const KICKS = 5;

/** aimX in [-1, 1] across the goal, aimY in [0, 1] from ground to bar, power in [0, 1]. */
export type Shot = { aimX: number; aimY: number; power: number; dive: Dive };

export function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

export function keeperChoice(rng: () => number): Dive {
  const r = rng();
  return r < 0.34 ? -1 : r < 0.67 ? 0 : 1;
}

/** Where the keeper ends up horizontally, in the same units as aimX. */
export function keeperX(dive: Dive): number {
  return dive * 0.66;
}

export function resolveShot({ aimX, aimY, power, dive }: Shot): Outcome {
  // Blasted over the bar, or caught the frame on a hard strike.
  if (power > 0.95) return "missed";
  if (power > 0.8 && (Math.abs(aimX) > 0.92 || aimY > 0.92)) return "missed";
  // A weak shot is always an easy save.
  if (power < 0.3) return "saved";
  const covered = Math.abs(aimX - keeperX(dive)) <= 0.42 && aimY <= 0.88;
  // Hard, well-placed shots can beat the keeper even when he guesses right.
  if (covered && power < 0.85) return "saved";
  return "goal";
}

export function powerFromPhase(t: number): number {
  // Triangle wave 0 -> 1 -> 0 over one second.
  const x = t % 1;
  return x < 0.5 ? x * 2 : (1 - x) * 2;
}

export function summarise(outcomes: Outcome[]): { goals: number; label: string } {
  const goals = outcomes.filter((o) => o === "goal").length;
  const label =
    goals === outcomes.length ? "Perfect" : goals >= Math.ceil(outcomes.length * 0.6) ? "Clinical" : goals > 0 ? "Not bad" : "Back to training";
  return { goals, label };
}
