import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/data";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  return p ? { title: `${p.title} — Ibad Ullah Zuberi`, description: p.summary } : {};
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <Link href="/matches" className="hover:text-text">Projects</Link> <span aria-hidden="true">/</span> <span className="text-text">{p.title}</span>
      </nav>
      <p className="eyebrow">{p.competition} · {p.year}</p>
      <h1 className="mt-2 font-display text-5xl font-bold uppercase tracking-wide md:text-6xl">{p.title}</h1>
      {p.outcome ? <p className="mt-2 font-display text-2xl font-bold uppercase text-gold">{p.outcome}</p> : null}
      <p className="mt-4 text-lg text-muted">{p.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
        {p.stack.map((s) => <li key={s} className="rounded-md border border-line/15 px-2.5 py-1 font-mono text-sm">{s}</li>)}
      </ul>
      <dl className="mt-10 space-y-8">
        <div><dt className="eyebrow">Problem</dt><dd className="mt-2 leading-relaxed">{p.problem}</dd></div>
        <div><dt className="eyebrow">What I built</dt><dd className="mt-2 leading-relaxed">{p.built}</dd></div>
        <div><dt className="eyebrow">Result</dt><dd className="mt-2 leading-relaxed">{p.result}</dd></div>
      </dl>
      {p.links.length > 0 && (
        <p className="mt-10 flex flex-wrap gap-4">
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="rounded-full bg-blue-strong px-5 py-2 font-semibold text-white hover:opacity-90">
              {l.label} ↗
            </a>
          ))}
        </p>
      )}
    </article>
  );
}
