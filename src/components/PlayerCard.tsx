"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/content";
import { gaming, photos } from "@/content/shared";
import { asset } from "@/lib/site";
import { useUI } from "./UIProvider";

const PAPER = "#f3f2ec";
const INK = "#141413";

/** The special move, one step per entry: any key in a step counts (WASD or arrows). */
const COMBO: { keys: string[]; cap: string; alt: string }[] = [
  { keys: ["s", "arrowdown"], cap: "S", alt: "↓" },
  { keys: ["d", "arrowright"], cap: "D", alt: "→" },
  { keys: ["p"], cap: "P", alt: "" },
];
const COMBO_KEYS = COMBO.flatMap((c) => c.keys);

/**
 * The Player Card (see GLOSSARY): the Owner as a fighting-game character, printed like the other
 * paper objects on the site. Special move "Ship it" fires on S → D → P (or ↓ → P), typed or tapped.
 * With `listen`, it reacts to the keyboard while it is on screen.
 */
export function PlayerCard({ content, listen = false, className = "" }: { content: SiteContent; listen?: boolean; className?: string }) {
  const { owner, beyond, ui } = content;
  const { showToast, reducedMotion } = useUI();
  const card = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [hits, setHits] = useState(0);
  const step = useRef(0);
  const lastKey = useRef(0);
  const visible = useRef(false);
  const [flipped, setFlipped] = useState(false);

  // Only the card currently on screen reacts to the keyboard (one may be in the Hero, one in Beyond Code).
  useEffect(() => {
    const el = card.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const press = useCallback(
    (raw: string) => {
      const key = raw.toLowerCase();
      const now = performance.now();
      if (now - lastKey.current > 1500) step.current = 0;
      lastKey.current = now;
      if (COMBO[step.current].keys.includes(key)) step.current += 1;
      else step.current = COMBO[0].keys.includes(key) ? 1 : 0;

      if (step.current === COMBO.length) {
        step.current = 0;
        setHits((h) => h + 1);
        showToast(ui.beyond.comboHit);
      }
      setProgress(step.current);
    },
    [showToast, ui.beyond.comboHit],
  );

  useEffect(() => {
    if (!listen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (!visible.current || t.closest("input, textarea, select, [contenteditable], dialog")) return;
      if (!COMBO_KEYS.includes(e.key.toLowerCase())) return;
      press(e.key);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [listen, press]);

  return (
    <motion.div
      ref={card}
      animate={hits && !reducedMotion ? { rotate: [0, -1.5, 1.2, -0.6, 0], y: [0, -6, 0] } : undefined}
      transition={{ duration: 0.45 }}
      className={`relative w-[min(100%,340px)] [perspective:1400px] ${className}`}
      data-hits={hits}
    >
      {/* Click the card (not its keycaps) to flip it; both faces share one grid cell, so the front sets the height. */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 18 }}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("button")) return;
          setFlipped((f) => !f);
        }}
        className="grid cursor-pointer [transform-style:preserve-3d]"
      >
      <div
        inert={flipped}
        className="relative rounded-[18px] p-4 shadow-[0_30px_60px_-28px_rgb(0_0_0/0.85),0_2px_6px_rgb(0_0_0/0.25)] [backface-visibility:hidden] [grid-area:1/1]"
        style={{ background: PAPER, color: INK }}
      >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/15 pb-2.5 font-mono text-[10px] uppercase tracking-[0.2em]">
        <span>{ui.beyond.player}</span>
        <span className="flex items-center gap-2">
          <span className="opacity-60">{gaming.game}</span>
          <button type="button" onClick={() => setFlipped(true)} aria-label={ui.beyond.flip} className="rounded px-1 text-sm leading-none opacity-60 transition-opacity hover:opacity-100">
            ↻
          </button>
        </span>
      </div>

      {/* Photo + main label */}
      <div className="relative mt-3">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
        <img src={asset(photos.portrait)} alt={owner.name} draggable={false} className="aspect-[4/3.3] w-full rounded-[10px] object-cover object-top" />
        <span className="absolute -bottom-3 left-3 -rotate-2 bg-accent px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-on-accent shadow">
          {ui.beyond.main} · {gaming.main}
        </span>
      </div>

      {/* Name */}
      <div className="mt-6">
        <p className="font-display text-[2.4rem] font-semibold leading-none tracking-[-0.03em]">{owner.nickname}</p>
        <p className="mt-1 text-xs opacity-60">
          {owner.name} · {ui.beyond.rank}: {gaming.rank}
        </p>
      </div>

      {/* Stats */}
      <dl className="mt-4 space-y-2 border-t border-black/15 pt-3">
        {beyond.playerStats.map((s, i) => (
          <div key={s.label} className="grid grid-cols-[1fr_auto] items-center gap-x-3 text-[11px]">
            <dt className="opacity-70">{s.label}</dt>
            <dd className="font-mono tabular-nums">{s.value}</dd>
            <span className="col-span-2 mt-1 h-[3px] bg-black/10">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: `${s.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: [0.19, 1, 0.22, 1] }}
                className="block h-full"
                style={{ background: INK }}
              />
            </span>
          </div>
        ))}
      </dl>

      {/* Special move — keycaps */}
      <div className="mt-4 border-t border-black/15 pt-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-55">{ui.beyond.special}</p>
            <p className="font-display text-lg font-semibold">{beyond.specialMove}</p>
          </div>
          <span className="flex gap-1.5">
            {COMBO.map((c, i) => {
              const lit = i < progress;
              return (
                <button
                  key={c.cap}
                  type="button"
                  onClick={() => press(c.keys[0])}
                  aria-label={c.cap}
                  className={`relative grid size-9 place-items-center rounded-md border border-black/25 font-mono text-sm font-bold shadow-[0_3px_0_rgb(0_0_0/0.35)] transition-[transform,box-shadow,background-color] active:translate-y-[2px] active:shadow-[0_1px_0_rgb(0_0_0/0.35)] ${
                    lit ? "bg-accent text-on-accent" : "bg-white"
                  }`}
                >
                  {c.cap}
                  {c.alt && <span className="absolute right-0.5 top-0 text-[8px] font-normal opacity-50">{c.alt}</span>}
                </button>
              );
            })}
          </span>
        </div>
        <p className="mt-2 font-mono text-[10px] opacity-55">{ui.beyond.comboHint}</p>
      </div>

      {/* Rubber-stamp hit effect */}
      <AnimatePresence>
        {hits > 0 && (
          <motion.span
            key={hits}
            aria-hidden
            initial={{ scale: 2.4, opacity: 0, rotate: -14 }}
            animate={{ scale: 1, opacity: [0, 1, 1, 0], rotate: -14 }}
            transition={{ duration: 1.6, times: [0, 0.12, 0.8, 1], ease: [0.19, 1, 0.22, 1] }}
            style={{ x: "-50%" }}
            className="pointer-events-none absolute left-1/2 top-[56%] rounded-md border-[3px] border-[#b8321b] px-4 py-1.5 font-display text-4xl font-black uppercase tracking-tight text-[#b8321b] mix-blend-multiply"
          >
            {beyond.specialMove}!
          </motion.span>
        )}
      </AnimatePresence>
      </div>

      {/* Back face — placeholder until its design is decided. */}
      <div
        inert={!flipped}
        className="flex flex-col rounded-[18px] p-4 shadow-[0_30px_60px_-28px_rgb(0_0_0/0.85),0_2px_6px_rgb(0_0_0/0.25)] [backface-visibility:hidden] [grid-area:1/1] [transform:rotateY(180deg)]"
        style={{ background: INK, color: PAPER }}
      >
        <div className="flex items-center justify-between border-b border-white/15 pb-2.5 font-mono text-[10px] uppercase tracking-[0.2em]">
          <span>{ui.beyond.player}</span>
          <button type="button" onClick={() => setFlipped(false)} aria-label={ui.beyond.flip} className="rounded px-1 text-sm leading-none opacity-60 transition-opacity hover:opacity-100">
            ↻
          </button>
        </div>
        <div className="grid flex-1 place-items-center text-center">
          <div>
            <p className="font-display text-[2.4rem] font-semibold leading-none tracking-[-0.03em]">{owner.nickname}</p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">{ui.beyond.cardBack}</p>
          </div>
        </div>
      </div>
      </motion.div>
    </motion.div>
  );
}
