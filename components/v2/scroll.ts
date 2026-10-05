import type Lenis from "lenis";

export const lenisRef: { current: Lenis | null } = { current: null };

export function scrollToEl(el: HTMLElement, offset = 0, duration = 1.4) {
  const y = el.getBoundingClientRect().top + window.scrollY + offset;
  if (lenisRef.current) {
    lenisRef.current.scrollTo(y, { duration, lock: false });
  } else {
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

export function goTo(id: string) {
  const el = document.getElementById(id);
  if (el) scrollToEl(el, id === "hero" ? 0 : -40);
}
