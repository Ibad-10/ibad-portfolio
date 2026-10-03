"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { detectWebGL } from "@/lib/webgl";
import {
  FALLBACK_COOKIE,
  FORCE_COOKIE,
  MODE_COOKIE,
  resolveMode,
  type Capabilities,
  type Mode,
} from "@/lib/mode";

type ModeContextValue = {
  mode: Mode;
  /** True once capability detection has finished (heavy Game parts wait for this). */
  ready: boolean;
  fellBack: boolean;
  reasons: string[];
  setMode: (m: Mode) => void;
  forceGame: () => void;
};

const ModeContext = createContext<ModeContextValue>({
  mode: "classic",
  ready: false,
  fellBack: false,
  reasons: [],
  setMode: () => {},
  forceGame: () => {},
});

const YEAR = 60 * 60 * 24 * 365;

function writeCookie(name: string, value: string, maxAge?: number) {
  const age = maxAge === undefined ? "" : `; max-age=${maxAge}`;
  document.cookie = `${name}=${value}; path=/; SameSite=Lax${age}`;
}
function readCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

function detectCapabilities(): Capabilities {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  return {
    webgl: detectWebGL(),
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    saveData: nav.connection?.saveData === true,
    lowMemory: typeof nav.deviceMemory === "number" && nav.deviceMemory < 4,
  };
}

export function ModeProvider({ initialMode, children }: { initialMode: Mode; children: React.ReactNode }) {
  const router = useRouter();
  const [mode, setModeState] = useState<Mode>(initialMode);
  const [ready, setReady] = useState(false);
  const [fellBack, setFellBack] = useState(false);
  const [reasons, setReasons] = useState<string[]>([]);

  useEffect(() => {
    const stored: Mode | null = readCookie(MODE_COOKIE) === "game" ? "game" : readCookie(MODE_COOKIE) === "classic" ? "classic" : null;
    const result = resolveMode(stored, detectCapabilities(), { force: readCookie(FORCE_COOKIE) === "1" });
    if (stored === "game" && result.fellBack) {
      writeCookie(FALLBACK_COOKIE, "1");
      setFellBack(true);
      setReasons(result.reasons);
      setModeState("classic");
      router.refresh();
    }
    setReady(true);
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setMode = useCallback(
    (m: Mode) => {
      writeCookie(MODE_COOKIE, m, YEAR);
      writeCookie(FALLBACK_COOKIE, "0");
      setFellBack(false);
      setModeState(m);
      router.refresh();
    },
    [router],
  );

  const forceGame = useCallback(() => {
    writeCookie(FORCE_COOKIE, "1");
    setMode("game");
  }, [setMode]);

  return (
    <ModeContext.Provider value={{ mode, ready, fellBack, reasons, setMode, forceGame }}>
      {children}
    </ModeContext.Provider>
  );
}

export const useMode = () => useContext(ModeContext);
