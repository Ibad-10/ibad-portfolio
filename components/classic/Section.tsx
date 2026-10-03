import { Reveal } from "@/components/ui/Reveal";

export function Section({
  id,
  eyebrow,
  title,
  asH1 = false,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  asH1?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 border-t border-line/10 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          {asH1 ? (
            <h1 id={`${id}-title`} className="mt-2 font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">
              {title}
            </h1>
          ) : (
            <h2 id={`${id}-title`} className="mt-2 font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">
              {title}
            </h2>
          )}
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
