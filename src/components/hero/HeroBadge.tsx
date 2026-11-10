"use client";

import type { SiteContent } from "@/content";
import { BadgeGimmick } from "./gimmicks/Badge";
import { HeroLinks, NowList, d } from "./parts";

/**
 * Hero layout "badge": a staff ID card hanging from a lanyard. Visitors can pull it — it swings
 * back like a pendulum — and click it to flip to the back (what the Owner is doing now).
 */
export function HeroBadge({ content }: { content: SiteContent }) {
  const { owner, hero, ui } = content;

  return (
    <div className="grid flex-1 items-center gap-10 py-8 md:grid-cols-12 md:gap-6">
      {/* Copy */}
      <div className="order-2 md:order-1 md:col-span-6">
        <p className="hero-fade mb-5 font-mono text-xs uppercase tracking-[0.18em] text-muted" style={d(0.3)}>
          {owner.role} — {owner.location}
        </p>
        <h1 className="font-display text-[clamp(3rem,7.4vw,7.2rem)] font-semibold leading-[0.9] tracking-[-0.04em]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="hero-rise block" style={d(0.05)}>
              {hero.sentence.lead}
              <span className="text-accent-ink">.</span>
            </span>
          </span>
        </h1>
        <p className="hero-fade mt-6 max-w-[44ch] text-lg leading-relaxed text-muted text-pretty" style={d(0.4)}>
          {hero.intro}
        </p>
        <div className="hero-fade mt-10 border-t border-line pt-5" style={d(0.55)}>
          <NowList content={content} />
        </div>
        <div className="hero-fade mt-8 flex flex-wrap items-center justify-between gap-4" style={d(0.65)}>
          <HeroLinks content={content} />
          <p className="font-mono text-[11px] text-faint">↗ {ui.hero.badgeHint}</p>
        </div>
      </div>

      <div className="order-1 md:order-2 md:col-span-6">
        <BadgeGimmick content={content} />
      </div>
    </div>
  );
}
