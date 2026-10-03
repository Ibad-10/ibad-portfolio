import { describe, expect, it } from "vitest";
import { effectiveServerMode, parseMode, resolveMode, shouldFallbackToClassic, type Capabilities } from "./mode";

const ok: Capabilities = { webgl: true, reducedMotion: false, saveData: false, lowMemory: false };

describe("parseMode", () => {
  it("accepts valid values only", () => {
    expect(parseMode("game")).toBe("game");
    expect(parseMode("classic")).toBe("classic");
    expect(parseMode("x")).toBeNull();
    expect(parseMode(undefined)).toBeNull();
  });
});

describe("shouldFallbackToClassic", () => {
  it("does not fall back on a capable device", () => {
    expect(shouldFallbackToClassic(ok).fallback).toBe(false);
  });
  it.each([
    ["webgl", { ...ok, webgl: false }],
    ["reducedMotion", { ...ok, reducedMotion: true }],
    ["saveData", { ...ok, saveData: true }],
    ["lowMemory", { ...ok, lowMemory: true }],
  ])("falls back on %s with a reason", (_n, caps) => {
    const r = shouldFallbackToClassic(caps);
    expect(r.fallback).toBe(true);
    expect(r.reasons.length).toBe(1);
  });
  it("force overrides soft reasons but never missing WebGL", () => {
    expect(shouldFallbackToClassic({ ...ok, reducedMotion: true }, { force: true }).fallback).toBe(false);
    expect(shouldFallbackToClassic({ ...ok, webgl: false }, { force: true }).fallback).toBe(true);
  });
});

describe("resolveMode", () => {
  it("defaults to classic with no stored choice", () => {
    expect(resolveMode(null, ok).mode).toBe("classic");
  });
  it("keeps stored classic", () => {
    expect(resolveMode("classic", ok)).toEqual({ mode: "classic", fellBack: false, reasons: [] });
  });
  it("keeps game on a capable device", () => {
    expect(resolveMode("game", ok).mode).toBe("game");
  });
  it("downgrades game with a reason", () => {
    const r = resolveMode("game", { ...ok, reducedMotion: true });
    expect(r.mode).toBe("classic");
    expect(r.fellBack).toBe(true);
    expect(r.reasons).toHaveLength(1);
  });
  it("force keeps game despite soft reasons", () => {
    expect(resolveMode("game", { ...ok, saveData: true }, { force: true }).mode).toBe("game");
  });
});

describe("effectiveServerMode", () => {
  it("is classic without cookies", () => {
    expect(effectiveServerMode({})).toBe("classic");
  });
  it("is game when chosen and not downgraded", () => {
    expect(effectiveServerMode({ mode: "game" })).toBe("game");
  });
  it("is classic when downgraded this session", () => {
    expect(effectiveServerMode({ mode: "game", fb: "1" })).toBe("classic");
  });
});
