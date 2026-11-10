"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { SiteContent } from "@/content";
import { getGimmickCopy } from "@/content/gimmicks";
import { INK, PAPER, SHADOW, barcode } from "./shared";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] opacity-55">{label}</p>
      <p className="font-display text-sm font-semibold leading-tight">{value}</p>
    </div>
  );
}

/** A boarding pass "Jakarta → your team". Drag the stub off to tear it. */
export function TicketGimmick({ content }: { content: SiteContent }) {
  const { owner, locale, ui } = content;
  const t = getGimmickCopy(locale).ticket;
  const [torn, setTorn] = useState(false);

  return (
    <div className="origin-center -rotate-3 max-sm:scale-[0.78]">
      <div className="relative flex h-[250px] w-[520px]" style={{ color: INK }}>
        {/* Main part */}
        <div className={`relative flex flex-1 flex-col rounded-l-[18px] p-5 ${SHADOW}`} style={{ background: PAPER }}>
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">{t.title}</p>
            <p className="rounded-full bg-accent px-2.5 py-0.5 font-display text-xs font-bold text-on-accent">{owner.nickname} Air ✈</p>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] opacity-55">{t.from}</p>
              <p className="font-display text-5xl font-extrabold leading-none tracking-tight">CGK</p>
              <p className="text-xs opacity-70">{t.fromCity}</p>
            </div>
            <div className="mb-5 flex flex-1 items-center gap-1 px-4 opacity-50">
              <span className="h-px flex-1 border-t border-dashed border-current" />✈<span className="h-px flex-1 border-t border-dashed border-current" />
            </div>
            <div className="text-right">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] opacity-55">{t.to}</p>
              <p className="font-display text-5xl font-extrabold leading-none tracking-tight">YOU</p>
              <p className="text-xs opacity-70">{t.toCity}</p>
            </div>
          </div>
          <div className="mt-auto grid grid-cols-4 gap-3 border-t border-dashed border-black/25 pt-3">
            <Field label={t.passenger} value={owner.name.toUpperCase()} />
            <Field label={t.flight} value="FE-2027" />
            <Field label={t.boarding} value={t.boardingValue} />
            <Field label={t.seat} value={t.seatValue} />
          </div>
        </div>

        {/* Perforation */}
        <span aria-hidden className="absolute bottom-3 right-[150px] top-3 z-10 border-l-2 border-dotted border-black/25" />
        <span aria-hidden className="absolute -top-3 right-[138px] z-10 size-6 rounded-full bg-bg" />
        <span aria-hidden className="absolute -bottom-3 right-[138px] z-10 size-6 rounded-full bg-bg" />

        {/* What's left after tearing */}
        <div className="relative w-[150px]">
          <AnimatePresence>
            {torn && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full flex-col justify-center gap-3 pl-6">
                <p className="font-display text-lg font-semibold leading-tight text-fg">{t.stubAfter}</p>
                <a href="#contact" className="w-fit rounded-full bg-accent px-4 py-2 text-sm font-medium text-on-accent">
                  {t.stubCta} ↗
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* The stub */}
          <AnimatePresence>
            {!torn && (
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 140 }}
                dragElastic={0.15}
                dragSnapToOrigin
                onDragEnd={(_, info) => info.offset.x > 80 && setTorn(true)}
                exit={{ x: 180, y: 260, rotate: 38, opacity: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.6, 1] } }}
                className={`absolute inset-0 flex cursor-grab touch-none select-none flex-col rounded-r-[18px] p-4 active:cursor-grabbing ${SHADOW}`}
                style={{ background: PAPER }}
                aria-label={ui.hero.ctaContact}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] opacity-55">CGK → YOU</p>
                <div className="mt-3 space-y-2">
                  <Field label={t.gate} value={t.gateValue} />
                  <Field label={t.seat} value={t.seatValue} />
                </div>
                <span aria-hidden className="mt-auto h-12 w-full opacity-90" style={{ background: barcode(INK) }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
