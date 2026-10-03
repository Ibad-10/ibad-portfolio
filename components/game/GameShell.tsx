"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ModeSwitch } from "@/components/mode/ModeSwitch";
import { Backdrop } from "./Backdrop";
import { NewsTicker } from "./NewsTicker";
import { PromptBar } from "./PromptBar";
import { profile } from "@/lib/data";

export function GameShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const home = pathname === "/";

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Escape" && !home && !document.querySelector('[role="dialog"]')) router.push("/");
      if (e.key.toLowerCase() === "r" && pathname !== "/recruiter") router.push("/recruiter");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [home, pathname, router]);

  return (
    <div data-theme="dark" className="relative flex min-h-screen flex-col bg-bg text-text">
      <Backdrop />
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="no-print sticky top-0 z-40 border-b border-line/10 bg-bg/70 backdrop-blur">
        <nav aria-label="Game menu" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-strong font-display text-lg font-bold text-white">IZ</span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-lg font-bold uppercase tracking-wider">{profile.shortName}</span>
              <span className="text-xs text-muted">Career Mode</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/recruiter" className="hidden rounded-full border border-line/15 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted hover:border-blue hover:text-text sm:inline-block">
              Recruiter view
            </Link>
            <ModeSwitch />
          </div>
        </nav>
      </header>
      <main id="main" className="flex-1">{children}</main>
      <NewsTicker />
      <PromptBar home={home} />
    </div>
  );
}
