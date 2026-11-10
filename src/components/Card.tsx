"use client";

import type { CSSProperties, ReactNode } from "react";
import SpotlightCard from "./reactbits/SpotlightCard";
import { useUI } from "./UIProvider";

/** SpotlightCard wired to the site theme and accent. */
export function Card({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const { theme } = useUI();
  return (
    <SpotlightCard
      theme={theme}
      spotlightColor="var(--accent)"
      intensity={theme === "dark" ? 0.35 : 0.9}
      borderGlow={0.8}
      className={`p-0! ${className}`}
      style={
        {
          "--spotlight-card-surface": "var(--surface)",
          "--spotlight-card-border": "var(--line)",
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </SpotlightCard>
  );
}
