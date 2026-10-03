import Link from "next/link";

/** Shared page frame for Game Mode routes (title, back control, content). */
export function PageFrame({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-text">Hub</Link> <span aria-hidden="true">/</span> <span className="text-text">{title}</span>
      </nav>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-2 font-display text-5xl font-bold uppercase tracking-wide md:text-6xl">{title}</h1>
      <div className="mt-8">{children}</div>
    </div>
  );
}
