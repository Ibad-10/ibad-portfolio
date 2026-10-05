import { useEffect, type RefObject } from "react";

/** Hides images that failed to load, including ones that failed before React attached its handlers. */
export function useBrokenImages(ref: RefObject<HTMLElement>, deps: unknown[]) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cleanups: (() => void)[] = [];
    root.querySelectorAll("img").forEach((img) => {
      const hide = () => img.setAttribute("data-fail", "1");
      if (img.complete && img.naturalWidth === 0 && img.currentSrc) hide();
      else {
        img.addEventListener("error", hide, { once: true });
        cleanups.push(() => img.removeEventListener("error", hide));
      }
    });
    return () => cleanups.forEach((c) => c());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
