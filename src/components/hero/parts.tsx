"use client";

import { ArrowDown, ArrowUpRight, FileDown } from "lucide-react";
import type { CSSProperties } from "react";
import type { SiteContent } from "@/content";
import { useUI } from "../UIProvider";

/** Entrance delay for .hero-rise / .hero-fade (CSS adds the intro-curtain offset). */
export const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/** "Now" list: what the Owner is doing right now. */
export function NowList({ content, className = "" }: { content: SiteContent; className?: string }) {
  const { hero, status } = content;
  return (
    <dl className={`grid content-start gap-2.5 text-sm ${className}`}>
      {hero.now.map((item, i) => (
        <div key={item.label} className="grid grid-cols-[7.5rem_1fr] gap-3">
          <dt className="font-mono text-xs uppercase tracking-[0.12em] text-faint">{item.label}</dt>
          <dd className="flex items-center gap-2 text-fg">
            {i === hero.now.length - 1 && status.available && <span aria-hidden className="size-1.5 bg-accent" />}
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Two text links instead of the usual filled + ghost button pair. */
export function HeroLinks({ content, className = "" }: { content: SiteContent; className?: string }) {
  const { ui } = content;
  const { setResumeOpen } = useUI();
  return (
    <nav aria-label={ui.hero.ctaWork} className={`flex flex-wrap gap-x-6 gap-y-2 whitespace-nowrap text-sm ${className}`}>
      <a href="#projects" className="group inline-flex items-center gap-1.5 font-medium text-fg">
        <span className="bg-[linear-gradient(var(--accent),var(--accent))] bg-[length:100%_1px] bg-bottom bg-no-repeat pb-0.5 transition-[background-size,color] duration-300 group-hover:bg-[length:100%_100%] group-hover:text-on-accent">
          {ui.hero.ctaWork}
        </span>
        <ArrowDown className="size-3.5 transition-transform group-hover:translate-y-0.5" />
      </a>
      <a href="#contact" className="group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg">
        {ui.hero.ctaContact}
        <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
      <button type="button" onClick={() => setResumeOpen(true)} className="group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg">
        {ui.contact.resume}
        <FileDown className="size-3.5 transition-transform group-hover:translate-y-0.5" />
      </button>
    </nav>
  );
}
