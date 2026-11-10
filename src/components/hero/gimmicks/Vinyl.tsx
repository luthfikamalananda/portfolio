"use client";

import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { Pause, Play } from "lucide-react";
import { useState } from "react";
import type { SiteContent } from "@/content";
import { getGimmickCopy } from "@/content/gimmicks";
import { photos } from "@/content/shared";
import { asset } from "@/lib/site";
import { useUI } from "../../UIProvider";
import { SHADOW } from "./shared";

/** Fake but stable track length from a title, e.g. "3:14". */
const duration = (s: string) => {
  const secs = 150 + ((s.length * 37) % 110);
  return `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;
};

/** A record sleeve with the vinyl sliding out. Press play to spin it; drag the disc to scratch. */
export function VinylGimmick({ content }: { content: SiteContent }) {
  const { owner, projects, locale } = content;
  const t = getGimmickCopy(locale).vinyl;
  const { reducedMotion } = useUI();
  const [playing, setPlaying] = useState(!reducedMotion);
  const rotation = useMotionValue(0);
  const tracks = projects.slice(0, 5);
  const [track, setTrack] = useState(0);

  // 33⅓ rpm ≈ 200°/s. Also advance the "now playing" track every 8 seconds.
  useAnimationFrame((time, delta) => {
    if (!playing) return;
    rotation.set(rotation.get() + delta * 0.2);
    const next = Math.floor(time / 8000) % tracks.length;
    if (next !== track) setTrack(next);
  });

  return (
    <div className="flex w-[min(100%,480px)] flex-col gap-6">
      <div className="relative h-[clamp(220px,26vw,300px)]">
        {/* The record */}
        <motion.div
          onPan={(_, info) => rotation.set(rotation.get() + info.delta.x * 1.4)}
          style={{ rotate: rotation }}
          initial={{ x: 0 }}
          animate={{ x: "56%" }}
          transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.6 }}
          className="absolute left-[4%] top-[4%] aspect-square h-[92%] cursor-grab touch-none rounded-full active:cursor-grabbing"
        >
          <div
            className={`size-full rounded-full ${SHADOW}`}
            style={{
              background:
                "radial-gradient(circle, transparent 0 33%, transparent 33%), repeating-radial-gradient(circle, #121212 0 2px, #1d1d1d 2px 3px), #111",
            }}
          />
          <span aria-hidden className="absolute inset-0 rounded-full bg-[conic-gradient(from_30deg,transparent_0_10%,rgb(255_255_255/0.08)_15%,transparent_25%_60%,rgb(255_255_255/0.06)_65%,transparent_75%)]" />
          <span className="absolute inset-[33%] grid place-items-center rounded-full bg-accent text-center text-on-accent">
            <span className="font-display text-[clamp(10px,1.1vw,13px)] font-bold leading-tight">
              {owner.nickname}
              <br />
              <span className="font-mono text-[0.75em] font-normal">{t.album}</span>
            </span>
          </span>
          <span className="absolute inset-[48.5%] rounded-full bg-bg" />
        </motion.div>

        {/* The sleeve */}
        <div className={`absolute left-0 top-0 aspect-square h-full overflow-hidden rounded-[4px] ${SHADOW}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
          <img src={asset(photos.face)} alt={owner.name} className="size-full object-cover grayscale-[35%]" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          <p className="absolute left-4 top-3 font-display text-2xl font-extrabold uppercase leading-none tracking-tight text-white">{owner.nickname}</p>
          <p className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
            <span className="font-display text-xl font-semibold italic leading-none">{t.album}</span>
            <span className="font-mono text-[10px] uppercase opacity-80">{t.side}</span>
          </p>
        </div>
      </div>

      {/* Tracklist */}
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? t.pause : t.play}
          className="grid size-12 flex-none place-items-center rounded-full bg-accent text-on-accent transition-transform hover:scale-105 active:scale-95"
        >
          {playing ? <Pause className="size-5" /> : <Play className="size-5 translate-x-px" />}
        </button>
        <ol className="flex-1 divide-y divide-line border-y border-line text-sm">
          {tracks.map((p, i) => (
            <li key={p.slug} className={`flex items-center gap-3 py-1.5 ${i === track && playing ? "text-accent-ink" : "text-muted"}`}>
              <span className="w-5 font-mono text-[11px]">{i === track && playing ? "▶" : String(i + 1).padStart(2, "0")}</span>
              <span className={`flex-1 ${i === track && playing ? "font-medium" : ""}`}>{p.title}</span>
              <span className="font-mono text-[11px] tabular-nums">{duration(p.title)}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
