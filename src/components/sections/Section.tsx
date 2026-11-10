import type { ReactNode } from "react";
import SplitText from "../reactbits/SplitText";

/** One named, anchorable block of the single page (see GLOSSARY: Section). */
export function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    // Negative scroll margin cancels the section's top padding, so nav/anchor jumps land with the
    // heading right under the navbar: html scroll-padding (96px) − margin + padding ≈ 80–88px.
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative -scroll-mt-28 px-4 py-24 sm:px-8 md:-scroll-mt-34 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 md:mb-16">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <span className="text-accent-ink">{index}</span>
            <span className="h-px w-8 bg-line-strong" />
            {eyebrow}
          </p>
          <h2 id={`${id}-title`} className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
            <SplitText text={title} tag="span" splitType="words" effect="rise" mask duration={1.3} delay={110} textAlign="left" />
          </h2>
          {intro && <p className="mt-5 max-w-xl text-lg text-muted">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
