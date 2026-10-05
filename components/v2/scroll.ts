import type Lenis from "lenis";

export const lenisRef: { current: Lenis | null } = { current: null };

export function scrollToEl(el: HTMLElement, offset = 0, duration = 1.4) {
  if (lenisRef.current) {
    lenisRef.current.scrollTo(el, { offset, duration });
  } else {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
  }
}

export function goTo(id: string) {
  const el = document.getElementById(id);
  if (el) scrollToEl(el, id === "hero" ? 0 : -40);
}
