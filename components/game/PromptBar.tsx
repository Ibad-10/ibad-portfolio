function Key({ k, label }: { k: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <kbd className="rounded border border-line/25 bg-panel px-2 py-0.5 font-mono text-xs text-text">{k}</kbd>
      <span>{label}</span>
    </span>
  );
}

export function PromptBar({ home }: { home: boolean }) {
  return (
    <div className="no-print hidden items-center justify-center gap-6 border-t border-line/10 bg-bg/80 px-4 py-2 text-xs text-muted backdrop-blur md:flex" aria-hidden="true">
      {home && <Key k="←↑↓→" label="Move" />}
      {home && <Key k="Enter" label="Select" />}
      {!home && <Key k="Esc" label="Back to hub" />}
      <Key k="R" label="Recruiter view" />
      <Key k="M" label="Switch mode" />
    </div>
  );
}
