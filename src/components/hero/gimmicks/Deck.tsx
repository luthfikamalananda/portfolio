"use client";

import { ArrowDown, Play } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import type { SiteContent } from "@/content";
import { getGimmickCopy } from "@/content/gimmicks";
import { gaming, photos } from "@/content/shared";
import { asset } from "@/lib/site";
import { useUI } from "../../UIProvider";
import { INK, PAPER, SHADOW, useIntroBase } from "./shared";

const TILTS = [-3, 4, -6, 7, -9, 5, -4];
const Label = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <p className={`font-mono text-[11px] uppercase tracking-[0.18em] opacity-60 ${className}`}>{children}</p>
);

/**
 * A stack of cards — the "trailer" for the Owner. Swipe the top one away and it slides to the
 * back. The top card nudges itself until the Visitor tries; the last card leads to Beyond Code.
 */
export function DeckGimmick({ content }: { content: SiteContent }) {
  const { owner, hero, beyond, ui, locale } = content;
  const t = getGimmickCopy(locale).deck;
  const { reducedMotion } = useUI();
  const base = useIntroBase();

  const cards: { id: string; node: ReactNode }[] = [
    {
      id: "photo",
      node: (
        <div className="relative size-full overflow-hidden rounded-[22px]">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
          <img src={asset(photos.portrait)} alt={owner.name} draggable={false} className="size-full object-cover" />
          <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-14 font-display text-2xl font-semibold text-white">
            {owner.nickname}, &rsquo;26
          </p>
        </div>
      ),
    },
    {
      id: "building",
      node: (
        <div className="flex size-full flex-col rounded-[22px] p-6" style={{ background: PAPER, color: INK }}>
          <Label>{t.building}</Label>
          <p className="mt-auto font-display text-[2rem] font-semibold leading-[1.02] tracking-tight">{hero.now[0]?.value}</p>
          <p className="mt-3 text-sm opacity-70">{hero.intro}</p>
        </div>
      ),
    },
    {
      id: "tekken",
      node: (
        <div className="flex size-full flex-col overflow-hidden rounded-[22px] bg-bg-elev text-fg ring-1 ring-line-strong">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
          <img src={asset(gaming.tournamentPhotos[0])} alt={beyond.versus.captions[0] ?? ""} draggable={false} className="h-[46%] w-full object-cover" />
          <div className="flex flex-1 flex-col p-5">
            <Label className="text-accent-ink !opacity-100">
              {gaming.game} · {ui.beyond.modes.versus.label}
            </Label>
            <p className="mt-2 font-display text-[1.65rem] font-bold uppercase italic leading-none tracking-tight">{gaming.main}</p>
            <p className="mt-1 text-sm text-muted">{gaming.rank}</p>
            <p className="mt-auto text-sm">
              {gaming.community} — <span className="text-muted">{beyond.versus.roles.join(" · ")}</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "stream",
      node: (
        <div className="flex size-full flex-col rounded-[22px] bg-[#141413] p-6 text-[#f3f2ec]">
          <Label>{t.stream}</Label>
          <span className="mt-auto grid size-16 place-items-center rounded-2xl bg-accent text-on-accent">
            <Play className="size-7 translate-x-0.5" />
          </span>
          <p className="mt-5 font-display text-[1.9rem] font-semibold leading-[1.02] tracking-tight">{t.streamBody}</p>
        </div>
      ),
    },
    {
      id: "story",
      node: (
        <div className="flex size-full flex-col rounded-[22px] p-6" style={{ background: PAPER, color: INK }}>
          <Label>{t.story}</Label>
          <ol className="mt-auto space-y-3">
            {gaming.games.slice(0, 3).map((g, i) => (
              <li key={g.id} className="flex items-baseline gap-3">
                <span className="font-mono text-xs opacity-50">0{i + 1}</span>
                <span className="font-display text-xl font-semibold leading-tight">{g.title}</span>
              </li>
            ))}
          </ol>
        </div>
      ),
    },
    {
      id: "open",
      node: (
        <div className="flex size-full flex-col rounded-[22px] bg-accent p-6 text-on-accent">
          <Label>{t.openTo}</Label>
          <p className="mt-auto font-display text-[2.1rem] font-semibold leading-[1.02] tracking-tight">{hero.now[2]?.value}</p>
          <a href="#contact" className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#141413] px-4 py-2 text-sm font-medium text-[#f3f2ec]">
            {ui.hero.ctaContact} ↗
          </a>
        </div>
      ),
    },
    {
      id: "more",
      node: (
        <a href="#beyond" className="group flex size-full flex-col rounded-[22px] bg-bg-elev p-6 text-fg ring-2 ring-accent">
          <Label className="text-accent-ink !opacity-100">Player 2?</Label>
          <p className="mt-auto font-display text-[2.1rem] font-semibold leading-[1.02] tracking-tight">{ui.beyond.seeMore}</p>
          <span className="mt-5 grid size-12 place-items-center rounded-full bg-accent text-on-accent transition-transform group-hover:translate-y-1">
            <ArrowDown className="size-5" />
          </span>
        </a>
      ),
    },
  ];

  const [order, setOrder] = useState(cards.map((c) => c.id));
  const [touched, setTouched] = useState(false);
  const [nudge, setNudge] = useState(false);
  const sendToBack = () => setOrder((o) => [...o.slice(1), o[0]]);
  const position = cards.findIndex((c) => c.id === order[0]) + 1;

  // Until the Visitor tries, the top card wiggles every few seconds to show it can be swiped.
  useEffect(() => {
    if (touched || reducedMotion) return;
    let count = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (delay: number) =>
      timers.push(
        setTimeout(() => {
          setNudge(true);
          timers.push(setTimeout(() => setNudge(false), 1200));
          if (++count < 3) schedule(6500);
        }, delay),
      );
    schedule(base * 1000 + 2200);
    return () => timers.forEach(clearTimeout);
  }, [touched, reducedMotion, base]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-[400px] w-[290px]">
        {[...order].reverse().map((id) => {
          const depth = order.indexOf(id);
          const card = cards.find((c) => c.id === id)!;
          const top = depth === 0;
          const wiggle = top && nudge;
          return (
            <motion.div
              key={id}
              drag={top ? "x" : false}
              dragSnapToOrigin
              onDragStart={() => setTouched(true)}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 110 || Math.abs(info.velocity.x) > 600) sendToBack();
              }}
              initial={{ opacity: 0, y: 60, rotate: 0 }}
              animate={{
                opacity: 1,
                y: depth * 10,
                x: wiggle ? [0, -38, 28, -12, 0] : 0,
                rotate: wiggle ? [TILTS[0], -9, 7, -4, TILTS[0]] : TILTS[depth % TILTS.length],
                scale: 1 - depth * 0.04,
              }}
              whileDrag={{ scale: 1.04, rotate: 0 }}
              transition={
                wiggle
                  ? { duration: 1.1, ease: "easeInOut" }
                  : { type: "spring", stiffness: 260, damping: 24, delay: touched ? 0 : base + depth * 0.06 }
              }
              style={{ zIndex: cards.length - depth }}
              className={`absolute inset-0 select-none rounded-[22px] ${SHADOW} ${top ? "cursor-grab touch-pan-y active:cursor-grabbing" : "pointer-events-none"}`}
            >
              {card.node}
            </motion.div>
          );
        })}
      </div>

      {/* Always-visible affordance */}
      <p className="flex items-center gap-3 rounded-full border border-line-strong bg-bg-elev/80 px-4 py-2 font-mono text-xs backdrop-blur">
        <span className="text-accent-ink">←</span> {t.swipe} <span className="text-accent-ink">→</span>
        <span className="h-3 w-px bg-line-strong" />
        <span className="tabular-nums text-muted">
          {position} / {cards.length}
        </span>
      </p>
    </div>
  );
}
