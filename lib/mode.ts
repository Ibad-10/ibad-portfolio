export type Mode = "game" | "classic";

export const MODE_COOKIE = "mode";
/** Session cookie: this session was downgraded to Classic by capability detection. */
export const FALLBACK_COOKIE = "mode_fb";
/** Session cookie: visitor chose "try Game Mode anyway". */
export const FORCE_COOKIE = "mode_force";

export type Capabilities = {
  webgl: boolean;
  reducedMotion: boolean;
  saveData: boolean;
  lowMemory: boolean;
};

export function parseMode(value: string | undefined | null): Mode | null {
  return value === "game" || value === "classic" ? value : null;
}

export function shouldFallbackToClassic(
  caps: Capabilities,
  opts: { force?: boolean } = {},
): { fallback: boolean; reasons: string[] } {
  const reasons: string[] = [];
  if (!caps.webgl) reasons.push("your browser does not support WebGL");
  if (!opts.force) {
    if (caps.reducedMotion) reasons.push("you prefer reduced motion");
    if (caps.saveData) reasons.push("data saver is on");
    if (caps.lowMemory) reasons.push("this device has limited memory");
  }
  return { fallback: reasons.length > 0, reasons };
}

export function resolveMode(
  stored: Mode | null,
  caps: Capabilities,
  opts: { force?: boolean } = {},
): { mode: Mode; fellBack: boolean; reasons: string[] } {
  if (stored !== "game") return { mode: "classic", fellBack: false, reasons: [] };
  const { fallback, reasons } = shouldFallbackToClassic(caps, opts);
  return fallback
    ? { mode: "classic", fellBack: true, reasons }
    : { mode: "game", fellBack: false, reasons: [] };
}

/** Effective mode on the server, from the three cookies. */
export function effectiveServerMode(cookies: {
  mode?: string;
  fb?: string;
}): Mode {
  const stored = parseMode(cookies.mode);
  if (stored === "game" && cookies.fb !== "1") return "game";
  return "classic";
}
