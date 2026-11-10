"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState } from "react";
import type { SiteContent } from "@/content";
import { photos } from "@/content/shared";
import { asset } from "@/lib/site";
import { LocalClock } from "../../LocalClock";
import { useUI } from "../../UIProvider";

/** Length of the lanyard from its (off-screen) anchor to the badge's clip, in px. */
const STRAP = 360;
const PAPER = "#f3f2ec";
const INK = "#141413";

/** A staff ID card on a lanyard: pull it and it swings back like a pendulum; click to flip. */
export function BadgeGimmick({ content }: { content: SiteContent }) {
  const { owner, hero, ui, locale } = content;
  const { reducedMotion } = useUI();
  const [flipped, setFlipped] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // The card tilts so its clip points back at the anchor; the spring adds the swing.
  const lean = useTransform(() => (-Math.atan2(x.get(), STRAP + y.get()) * 180) / Math.PI);
  const rotate = useSpring(lean, { stiffness: 140, damping: 7, mass: 0.8 });
  const strap = useTransform(() => `M 0 ${-STRAP} L ${x.get()} ${y.get()}`);

  return (
      <div className="relative flex justify-center pt-28 md:pt-32">
        <div className="relative">
          <svg aria-hidden className="pointer-events-none absolute left-1/2 top-0 overflow-visible" width="1" height="1">
            <motion.path d={strap} stroke="var(--accent)" strokeWidth={14} strokeLinecap="round" fill="none" />
            <motion.path d={strap} stroke="var(--on-accent)" strokeOpacity={0.35} strokeWidth={1.5} strokeDasharray="5 6" fill="none" />
          </svg>

          <motion.div
            drag
            dragSnapToOrigin
            dragConstraints={{ left: -200, right: 200, top: -60, bottom: 160 }}
            dragElastic={0.35}
            dragTransition={{ bounceStiffness: 260, bounceDamping: 16 }}
            onTap={() => setFlipped((f) => !f)}
            style={{ x, y, rotate, transformOrigin: "50% 0%" }}
            className="relative cursor-grab touch-none select-none [perspective:1200px] active:cursor-grabbing"
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
            aria-label={`${owner.name} — ${ui.hero.badgeBack}`}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setFlipped((f) => !f))}
          >
            {/* Metal clip */}
            <span aria-hidden className="absolute -top-5 left-1/2 z-10 h-7 w-9 -translate-x-1/2 rounded-md border border-black/20 bg-gradient-to-b from-[#d9d9d4] to-[#8d8d88] shadow" />

            <motion.div
              initial={reducedMotion ? false : { rotate: -14, y: -260, opacity: 0 }}
              animate={{ rotate: 0, y: 0, opacity: 1, rotateY: flipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 11, delay: 0.25, rotateY: { type: "spring", stiffness: 90, damping: 14, delay: 0 } }}
              className="relative h-[clamp(400px,58vh,470px)] w-[clamp(260px,22vw,310px)] [transform-style:preserve-3d]"
            >
              {/* Front */}
              <div
                className="absolute inset-0 flex flex-col overflow-hidden rounded-[22px] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.85),0_2px_8px_rgb(0_0_0/0.3)] [backface-visibility:hidden]"
                style={{ background: PAPER, color: INK }}
              >
                <div className="flex items-center justify-between bg-accent px-5 pb-3 pt-5 text-on-accent">
                  <span className="font-display text-lg font-bold">{owner.nickname}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em]">{ui.hero.badgeAccess}</span>
                </div>
                <span aria-hidden className="mx-auto mt-3 h-2.5 w-14 rounded-full bg-black/15" />
                <div className="mx-5 mt-3 overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
                  <img src={asset(photos.landscape)} alt="" draggable={false} className="aspect-[5/4] w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col px-5 pt-4">
                  <p className="font-display text-[1.7rem] font-semibold leading-none tracking-tight">{owner.name}</p>
                  <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] opacity-60">{owner.role}</p>
                  <div className="mt-auto flex items-end justify-between pb-5">
                    <div className="font-mono text-[10px] leading-relaxed opacity-60">
                      <p>{owner.location}</p>
                      <p>{ui.hero.badgeSince}</p>
                    </div>
                    <span
                      aria-hidden
                      className="h-9 w-20"
                      style={{ background: `repeating-linear-gradient(90deg, ${INK} 0 2px, transparent 2px 4px, ${INK} 4px 5px, transparent 5px 8px)` }}
                    />
                  </div>
                </div>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 flex flex-col rounded-[22px] bg-bg-elev p-6 text-fg shadow-[0_40px_80px_-30px_rgb(0_0_0/0.85)] ring-1 ring-line-strong [backface-visibility:hidden] [transform:rotateY(180deg)]"
              >
                <span aria-hidden className="mx-auto h-2.5 w-14 rounded-full bg-white/15" />
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-ink">{ui.hero.badgeBack}</p>
                <dl className="mt-4 space-y-4">
                  {hero.now.map((n) => (
                    <div key={n.label}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-faint">{n.label}</dt>
                      <dd className="mt-1 font-display text-lg font-semibold leading-tight">{n.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-auto font-mono text-[11px] text-muted">
                  <LocalClock timeZone={owner.timeZone} locale={locale} /> · {owner.location.split(",")[0]}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
  );
}
