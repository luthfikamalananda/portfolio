"use client";

import type { SiteContent } from "@/content";
import { MagazineGimmick } from "./gimmicks/Magazine";
import { HeroLinks, NowList, d } from "./parts";

/**
 * Hero layout "magazine": the Owner on the cover of a magazine lying next to the intro —
 * nickname masthead, full-bleed photo, tongue-in-cheek cover lines and a spinning sticker.
 * Text inside the cover is sized in container units, so the cover scales as one object.
 */
export function HeroMagazine({ content }: { content: SiteContent }) {
  const { owner, hero, ui } = content;

  return (
    <div className="grid flex-1 items-center gap-12 py-6 md:grid-cols-12 md:gap-6">
      {/* The cover */}
      <div className="flex justify-center md:col-span-6 lg:col-span-5">
        <MagazineGimmick content={content} />
      </div>

      {/* The intro */}
      <div className="md:col-span-6 lg:col-span-6 lg:col-start-7">
        <p className="hero-fade mb-5 font-mono text-xs uppercase tracking-[0.18em] text-muted" style={d(0.3)}>
          {owner.role} — {owner.location}
        </p>
        <h1 className="font-display text-[clamp(3rem,6.6vw,6.6rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="hero-rise block" style={d(0.1)}>
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
        <div className="hero-fade mt-8" style={d(0.65)}>
          <HeroLinks content={content} />
        </div>
        <p className="sr-only">{ui.hero.ctaWork}</p>
      </div>
    </div>
  );
}
