import { cookies } from "next/headers";
import { FALLBACK_COOKIE, MODE_COOKIE, effectiveServerMode, parseMode, type Mode } from "./mode";

export function getServerMode(): Mode {
  const jar = cookies();
  return effectiveServerMode({
    mode: jar.get(MODE_COOKIE)?.value,
    fb: jar.get(FALLBACK_COOKIE)?.value,
  });
}

/** True when the visitor has made an explicit choice (used to decide whether to show the chooser). */
export function hasChosenMode(): boolean {
  return parseMode(cookies().get(MODE_COOKIE)?.value) !== null;
}
