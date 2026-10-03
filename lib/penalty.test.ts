import { describe, expect, it } from "vitest";
import { keeperChoice, powerFromPhase, resolveShot, summarise } from "./penalty";

describe("resolveShot", () => {
  it("scores a well-placed hard shot away from the keeper", () => {
    expect(resolveShot({ aimX: 0.8, aimY: 0.6, power: 0.7, dive: -1 })).toBe("goal");
  });
  it("saves a medium shot straight at the keeper", () => {
    expect(resolveShot({ aimX: 0, aimY: 0.4, power: 0.6, dive: 0 })).toBe("saved");
  });
  it("always saves a weak shot", () => {
    expect(resolveShot({ aimX: 0.9, aimY: 0.5, power: 0.2, dive: -1 })).toBe("saved");
  });
  it("misses when blasted too hard", () => {
    expect(resolveShot({ aimX: 0, aimY: 0.5, power: 0.99, dive: 1 })).toBe("missed");
  });
  it("misses the frame on a hard shot into the extreme corner", () => {
    expect(resolveShot({ aimX: 0.97, aimY: 0.5, power: 0.9, dive: -1 })).toBe("missed");
    expect(resolveShot({ aimX: 0, aimY: 0.95, power: 0.9, dive: -1 })).toBe("missed");
  });
  it("lets a very hard shot beat a keeper who guessed right", () => {
    expect(resolveShot({ aimX: 0, aimY: 0.4, power: 0.9, dive: 0 })).toBe("goal");
  });
  it("lets a shot into the top corner beat the keeper who dived that way", () => {
    expect(resolveShot({ aimX: 0.66, aimY: 0.9, power: 0.7, dive: 1 })).toBe("goal");
  });
});

describe("keeperChoice", () => {
  it("maps rng ranges to dives", () => {
    expect(keeperChoice(() => 0)).toBe(-1);
    expect(keeperChoice(() => 0.5)).toBe(0);
    expect(keeperChoice(() => 0.99)).toBe(1);
  });
});

describe("powerFromPhase", () => {
  it("is a triangle wave in [0, 1]", () => {
    expect(powerFromPhase(0)).toBe(0);
    expect(powerFromPhase(0.5)).toBe(1);
    expect(powerFromPhase(0.25)).toBeCloseTo(0.5);
    expect(powerFromPhase(1.25)).toBeCloseTo(0.5);
  });
});

describe("summarise", () => {
  it("counts goals and labels the result", () => {
    expect(summarise(["goal", "goal", "goal", "goal", "goal"])).toEqual({ goals: 5, label: "Perfect" });
    expect(summarise(["goal", "saved", "goal", "goal", "missed"]).label).toBe("Clinical");
    expect(summarise(["saved", "saved", "goal", "missed", "saved"]).label).toBe("Not bad");
    expect(summarise(["saved", "saved", "missed", "missed", "saved"]).label).toBe("Back to training");
  });
});
