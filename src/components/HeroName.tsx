"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useFitToWidth } from "@/lib/useFitToWidth";
import VariableProximity from "./reactbits/VariableProximity";

// Bricolage Grotesque axes: letters get heavier and narrower near the cursor.
const FROM = "'wght' 300, 'wdth' 100, 'opsz' 96";
const TO = "'wght' 800, 'wdth' 80, 'opsz' 96";

/**
 * The Owner's name set as a giant type specimen: one line on wide screens, two on narrow ones.
 * Each word rises out of a mask on load (CSS .hero-rise); letters respond to the pointer.
 */
export function HeroName({ first, last, aside }: { first: string; last: string; aside?: ReactNode }) {
  const areaRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  useFitToWidth(h1Ref);

  const common = {
    fromFontVariationSettings: FROM,
    toFontVariationSettings: TO,
    containerRef: areaRef,
    radius: 260,
    falloff: "gaussian" as const,
    smoothing: 0.18,
    toColor: "var(--accent-ink)",
    idleWave: true,
  };

  const word = (text: string, delay: number) => (
    <span className="block overflow-hidden pb-[0.05em]">
      <span className="hero-rise block whitespace-nowrap" style={{ "--d": `${delay}s` } as CSSProperties}>
        <VariableProximity label={text} {...common} />
      </span>
    </span>
  );

  return (
    <div ref={areaRef} className="relative select-none">
      <h1 ref={h1Ref} className="font-display leading-[0.86] tracking-[-0.045em]" style={{ fontSize: "17vw" }}>
        {/* Wide screens: one row. Narrow screens: two rows. */}
        <span data-fit-row className="hidden w-max gap-[0.22em] md:flex">
          {word(first, 0)}
          {word(last, 0.08)}
        </span>
        <span className="md:hidden">
          <span data-fit-row className="block w-max">
            {word(first, 0)}
          </span>
          <span data-fit-row className="block w-max">
            {word(last, 0.08)}
          </span>
        </span>
      </h1>
      {aside}
    </div>
  );
}
