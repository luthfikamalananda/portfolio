"use client";

import type { SiteContent } from "@/content";
import { photos } from "@/content/shared";
import { asset } from "@/lib/site";
import { HeroName } from "../HeroName";
import { HeroLinks, NowList, d } from "./parts";

/** Hero layout "specimen": the Owner's name as a giant, cursor-reactive type specimen. */
export function HeroSpecimen({ content }: { content: SiteContent }) {
  const { owner, hero, ui } = content;
  const [first, ...rest] = owner.name.split(" ");

  const photo = (
    <span className="hero-fade absolute right-0 top-[6%] z-10 flex items-end gap-3 md:right-[2%] md:top-0 md:-translate-y-[72%]" style={d(0.5)}>
      <span className="max-w-[16ch] pb-1 text-right font-mono text-[11px] leading-snug tracking-normal text-muted">↙ {hero.photoCaption}</span>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
      <img
        src={asset(photos.portrait)}
        alt={owner.name}
        className="aspect-[4/5] w-[clamp(72px,8.5vw,136px)] -rotate-3 rounded-[14px] object-cover shadow-[0_18px_40px_-18px_rgb(0_0_0/0.6)] transition-transform duration-500 ease-out hover:rotate-2 hover:scale-105"
      />
    </span>
  );

  return (
    <>
      <div className="flex flex-1 flex-col justify-center pb-6 pt-14 md:pt-[clamp(3rem,9vh,6rem)]">
        <HeroName first={first} last={rest.join(" ")} aside={photo} />
        <div className="hero-fade mt-4 flex justify-between gap-4 border-t border-line pt-3 font-mono text-[11px] text-faint" style={d(0.6)}>
          <p>
            <span className="[@media(hover:none)]:hidden">↖ {ui.hero.hint}</span>
            <span className="hidden [@media(hover:none)]:inline">↖ {ui.hero.hintTouch}</span>
          </p>
          <p className="hidden sm:block">Bricolage Grotesque · wght 300→800 · wdth 100→80</p>
        </div>
      </div>
      <div className="grid gap-8 border-t border-line pt-5 md:grid-cols-12 md:gap-6">
        <p className="hero-fade max-w-[46ch] text-lg leading-relaxed text-pretty md:col-span-5 md:text-xl" style={d(0.45)}>
          {hero.intro}
        </p>
        <div className="hero-fade md:col-span-4 md:col-start-7" style={d(0.55)}>
          <NowList content={content} />
        </div>
        <div className="hero-fade md:col-span-2 md:col-start-11" style={d(0.65)}>
          <HeroLinks content={content} className="md:flex-col md:items-end md:gap-2.5" />
        </div>
      </div>
    </>
  );
}
