"use client";

import { useRef } from "react";
import type { SiteContent } from "@/content";
import { photos } from "@/content/shared";
import { asset } from "@/lib/site";
import { useFitToWidth } from "@/lib/useFitToWidth";
import CircularText from "../../reactbits/CircularText";
import { useUI } from "../../UIProvider";
import { d } from "../parts";

const INK = "#141413";

/**
 * The Owner on the cover of a magazine: nickname masthead, full-bleed photo, cover lines and a
 * spinning sticker. Text inside is sized in container units, so the cover scales as one object.
 */
export function MagazineGimmick({ content }: { content: SiteContent }) {
  const { owner, hero } = content;
  const mag = hero.magazine;
  const { reducedMotion } = useUI();
  const mastRef = useRef<HTMLParagraphElement>(null);
  useFitToWidth(mastRef);

  return (
    <article
    aria-label={`${mag.headline} — ${owner.name}`}
    className="hero-fade @container relative aspect-[3/4] bg-[#dcd0c0] w-[min(100%,calc(78dvh*0.75),540px)] -rotate-2 overflow-hidden rounded-[3px] shadow-[0_50px_90px_-40px_rgb(0_0_0/0.9),0_2px_8px_rgb(0_0_0/0.35)] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:rotate-0 hover:scale-[1.015]"
    style={{ ...d(0.15), color: INK }}
  >
    {/* Photo sits low so the masthead reads on the wall above the head. */}
    {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
    <img
      src={asset(photos.full)}
      alt={owner.name}
      className="absolute inset-x-0 top-[17%] w-full [mask-image:linear-gradient(to_bottom,transparent,#000_7%)]"
    />
    {/* Light wash behind the cover lines so they read over any photo */}
    <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(243_242_236/0.88)_0%,rgb(243_242_236/0.55)_45%,transparent_70%)] [mask-image:linear-gradient(to_bottom,transparent_30%,#000_55%)]" />
    <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[42%] bg-[linear-gradient(to_bottom,rgb(243_242_236/0.7),transparent)]" />
    {/* Paper sheen */}
    <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.22)_0%,transparent_35%,transparent_70%,rgb(0_0_0/0.18)_100%)]" />

    <div className="relative flex h-full flex-col p-[4.5cqw]">
      <div className="flex justify-between font-mono text-[2.3cqw] font-semibold uppercase tracking-[0.12em]">
        <span>{mag.issue}</span>
        <span>{mag.price}</span>
      </div>
      <p ref={mastRef} aria-hidden className="mt-[1cqw] font-display font-extrabold uppercase leading-[0.8] tracking-[-0.06em]" style={{ fontSize: "20cqw" }}>
        <span data-fit-row className="block w-max">
          {owner.nickname}
        </span>
      </p>

      <p className="mt-[3cqw] max-w-[60%] font-display text-[7.4cqw] font-bold uppercase leading-[0.9] tracking-[-0.03em]">{mag.headline}</p>

      <div className="mt-auto flex max-w-[56%] flex-col gap-[3cqw]">
        {mag.coverLines.map((line, i) => (
          <div key={line.title}>
            <span className="inline-block bg-[#141413] px-[1.4cqw] py-[0.5cqw] font-mono text-[2cqw] font-semibold uppercase tracking-[0.14em] text-[#f3f2ec]">
              {line.kicker}
            </span>
            <p className={`mt-[1cqw] font-display font-semibold leading-[1.02] tracking-tight ${i === 0 ? "text-[4.6cqw]" : "text-[3.4cqw]"}`}>{line.title}</p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-[4.5cqw] right-[4.5cqw] flex flex-col items-end gap-[3cqw]">
        <div className="grid size-[112px] place-items-center rounded-full bg-[#141413] text-[#f3f2ec] shadow-lg">
          <CircularText
            text={mag.sticker.toUpperCase()}
            size={112}
            fontSize={9}
            fontWeight={600}
            letterSpacing={2}
            spinDuration={reducedMotion ? 0 : 18}
            color="#f3f2ec"
            onHover="speedUp"
          >
            <span className="text-2xl text-accent">★</span>
          </CircularText>
        </div>
        <span
          aria-hidden
          className="h-[8cqw] w-[20cqw] bg-white/85"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, ${INK} 0 2px, transparent 2px 4px, ${INK} 4px 5px, transparent 5px 8px, ${INK} 8px 11px, transparent 11px 13px)`,
          }}
        />
      </div>
    </div>
  </article>
  );
}
