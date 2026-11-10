import type { CSSProperties } from "react";

/**
 * First-visit intro: three colour panels cover the page, then sweep off one after another
 * (the StaggeredMenu "pre-layer" motion). Pure CSS — shown only when the inline script in
 * RootShell sets html[data-intro="play"] (first visit per session, motion allowed, or ?intro).
 */
export function IntroCurtain({ name }: { name: string }) {
  return (
    <div className="intro-curtain" aria-hidden>
      <div className="intro-layer bg-[color-mix(in_oklab,var(--accent)_30%,var(--bg))]" style={{ "--i": 2 } as CSSProperties} />
      <div className="intro-layer bg-accent" style={{ "--i": 1 } as CSSProperties} />
      <div className="intro-layer grid place-items-center bg-bg-elev" style={{ "--i": 0 } as CSSProperties}>
        <p className="intro-label font-mono text-xs uppercase tracking-[0.3em] text-muted">
          {name} <span className="text-accent-ink">/</span> 2026
        </p>
      </div>
    </div>
  );
}
