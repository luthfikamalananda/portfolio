"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { SiteContent } from "@/content";
import { gaming } from "@/content/shared";
import { asset } from "@/lib/site";
import { BeyondModes, type ModeKey } from "./BeyondModes";
import { PlayerCard } from "./PlayerCard";
import { useUI } from "./UIProvider";

const PAPER = "#f3f2ec";
const INK = "#141413";
const CARD = "relative w-[min(100%,340px)] rounded-[18px] p-4 shadow-[0_30px_60px_-28px_rgb(0_0_0/0.85),0_2px_6px_rgb(0_0_0/0.25)]";

function CardHead({ left, right }: { left: string; right?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-black/15 pb-2.5 font-mono text-[10px] uppercase tracking-[0.2em]">
      <span>{left}</span>
      {right && <span className="opacity-60">{right}</span>}
    </div>
  );
}

/** Content & Gaming: what's on now, a few words about the Owner as a player, and the two channels. */
function ContentCard({ content }: { content: SiteContent }) {
  const { ui, beyond } = content;
  const handle = (url: string) => "@" + url.split("@")[1];
  return (
    <div className={CARD} style={{ background: PAPER, color: INK }}>
      <CardHead left={ui.beyond.modes.play.label} right={`${gaming.games.length} ${ui.beyond.wall.count}`} />

      {/* Now playing */}
      <div className="relative mt-3 overflow-hidden rounded-[10px]">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
        <img src={asset(gaming.nowPlaying.art)} alt={gaming.nowPlaying.title} className="aspect-[460/215] w-full object-cover" />
        <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
        <span className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded bg-black/60 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
          <span className="size-1.5 animate-pulse rounded-full bg-[#ff4d4d]" />
          {ui.beyond.nowPlaying}
        </span>
        <span className="absolute inset-x-3 bottom-2.5 font-display text-lg font-semibold leading-tight text-white">{gaming.nowPlaying.title}</span>
      </div>

      {/* The Owner as a player */}
      <p className="mt-4 text-[13px] leading-relaxed opacity-80">{beyond.play.about}</p>

      {/* Channels — the only place they're linked from this tab. */}
      <ul className="mt-4 space-y-1 border-t border-black/15 pt-3 text-sm">
        {[
          { label: "YouTube", href: gaming.youtube.url },
          { label: "TikTok", href: gaming.tiktok },
        ].map((c) => (
          <li key={c.label}>
            <a href={c.href} target="_blank" rel="noreferrer" className="group -mx-1.5 flex items-baseline justify-between gap-3 rounded px-1.5 py-1 transition-colors hover:bg-black/5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-55">{c.label}</span>
              <span className="font-semibold">
                {handle(c.href)} <span className="inline-block opacity-40 transition-[opacity,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100">↗</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Sports: one photo, and the activities as plain tags. */
function SportsCard({ content }: { content: SiteContent }) {
  const { beyond, ui, owner } = content;
  return (
    <div className={CARD} style={{ background: PAPER, color: INK }}>
      <CardHead left={ui.beyond.modes.training.label} right={owner.nickname} />
      {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
      <img src={asset(gaming.trainingPhotos[0])} alt="" className="mt-3 aspect-[4/3.3] w-full rounded-[10px] object-cover" />
      <p className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight">{ui.beyond.modes.training.sub}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5 border-t border-black/15 pt-3">
        {beyond.training.activities.map((a) => (
          <li key={a.name} className="rounded-md border border-black/25 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]">
            {a.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Beyond Code body: the left card + the Modes. Card style from lib/site.ts (`beyondCard`), or
 * `?beyondCard=` in dev — "player" (always the Player Card), "context" (a card for the open tab:
 * Player Card → Content → Sports), "none" (tabs take the full width).
 */
export function BeyondLayout({ content }: { content: SiteContent }) {
  const { beyondCard, reducedMotion } = useUI();
  const [mode, setMode] = useState<ModeKey>("versus");

  if (beyondCard === "none") return <BeyondModes content={content} mode={mode} onMode={setMode} />;

  const card =
    beyondCard === "player" || mode === "versus" ? (
      <PlayerCard content={content} listen />
    ) : mode === "play" ? (
      <ContentCard content={content} />
    ) : (
      <SportsCard content={content} />
    );
  const cardKey = beyondCard === "player" ? "player" : mode;

  return (
    // minmax(0,…) + min-w-0: the scrolling tab row must not widen the column on phones.
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-14">
      <div className="mx-auto w-full max-w-[340px] [perspective:1400px] lg:sticky lg:top-28">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={cardKey}
            initial={reducedMotion ? false : { rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.19, 1, 0.22, 1] }}
            className="flex justify-center"
          >
            {card}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="min-w-0">
        <BeyondModes content={content} mode={mode} onMode={setMode} />
      </div>
    </div>
  );
}
