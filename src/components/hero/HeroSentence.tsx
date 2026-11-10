"use client";

import { Fragment, useEffect, useState } from "react";
import type { SiteContent } from "@/content";
import { photos } from "@/content/shared";
import { asset } from "@/lib/site";
import RotatingText from "../reactbits/RotatingText";
import { useUI } from "../UIProvider";
import { HeroLinks, NowList, d } from "./parts";

/** Each word rises out of its own mask, one after another. */
function Words({ text, start, step = 0.045, className = "" }: { text: string; start: number; step?: number; className?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span className={`hero-rise inline-block ${className}`} style={d(start + i * step)}>
              {w}
            </span>
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}

function wordCount(s: string) {
  return s.split(" ").length;
}

function JakartaTime({ timeZone, locale }: { timeZone: string; locale: string }) {
  const [now, setNow] = useState<string>("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", { hour: "2-digit", minute: "2-digit", timeZone });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [timeZone, locale]);
  return <span className="tabular-nums">{now}</span>;
}

/**
 * Hero layout "sentence": one large introduction with live things set inside the sentence —
 * a photo pill that widens on hover, a live clock, and a word that keeps changing.
 */
export function HeroSentence({ content }: { content: SiteContent }) {
  const { owner, hero, locale } = content;
  const { reducedMotion } = useUI();
  const s = hero.sentence;

  // Word timings, so the inline pills land in sequence with the words around them.
  const t0 = 0.05;
  const tPhoto = t0 + wordCount(s.lead) * 0.045;
  const tAfterPhoto = tPhoto + 0.08;
  const tClock = tAfterPhoto + wordCount(s.afterPhoto) * 0.045;
  const tAfterClock = tClock + 0.08;
  const tRotating = tAfterClock + wordCount(s.afterClock) * 0.045;

  return (
    <>
      <div className="flex flex-1 items-center py-14">
        <h1 className="max-w-[18ch] font-display text-[clamp(2.4rem,6.2vw,6.4rem)] font-medium leading-[1.04] tracking-[-0.035em] md:max-w-[19ch]">
          <Words text={s.lead} start={t0} />
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span className="hero-rise group inline-flex align-[-0.06em]" style={d(tPhoto)}>
              <span className="inline-block h-[0.86em] w-[1.6em] overflow-hidden rounded-full bg-surface ring-1 ring-line-strong transition-[width] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-[2.6em]">
                {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
                <img src={asset(photos.face)} alt={owner.name} className="size-full object-cover object-[50%_42%]" />
              </span>
            </span>
          </span>{" "}
          <Words text={s.afterPhoto} start={tAfterPhoto} className="text-muted" />
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span
              className="hero-rise inline-flex items-center gap-[0.5em] rounded-full border border-line-strong bg-surface/70 px-[0.9em] py-[0.45em] align-[0.5em] font-mono text-[0.26em] font-normal tracking-normal text-fg backdrop-blur"
              style={d(tClock)}
            >
              <span aria-hidden className="size-[0.6em] rounded-full bg-accent" />
              <JakartaTime timeZone={owner.timeZone} locale={locale} /> WIB
            </span>
          </span>{" "}
          <Words text={s.afterClock} start={tAfterClock} className="text-muted" />
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span className="hero-rise inline-block text-accent-ink" style={d(tRotating)}>
              {reducedMotion ? (
                s.rotating[0]
              ) : (
                <RotatingText
                  texts={s.rotating}
                  rotationInterval={2600}
                  staggerDuration={0.02}
                  mainClassName="inline-flex overflow-hidden"
                  splitLevelClassName="overflow-hidden pb-[0.08em]"
                />
              )}
            </span>
          </span>
        </h1>
      </div>
      <div className="grid gap-8 border-t border-line pt-5 md:grid-cols-12 md:gap-6">
        <div className="hero-fade md:col-span-6" style={d(0.9)}>
          <NowList content={content} />
        </div>
        <div className="hero-fade md:col-span-3 md:col-start-10" style={d(1)}>
          <HeroLinks content={content} className="md:flex-col md:items-end md:gap-2.5" />
        </div>
      </div>
    </>
  );
}
