"use client";

import { RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/content";
import { getGimmickCopy } from "@/content/gimmicks";
import { photos } from "@/content/shared";
import { asset } from "@/lib/site";
import { SHADOW } from "./shared";

const W = 320;
const H = 430;

/** A scratch card: rub off the silver to reveal the Owner and their availability. */
export function ScratchGimmick({ content }: { content: SiteContent }) {
  const { owner, locale } = content;
  const t = getGimmickCopy(locale).scratch;
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const moves = useRef(0);
  const [cleared, setCleared] = useState(false);

  const paint = useCallback(() => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = W * dpr;
    c.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#b9bab5");
    g.addColorStop(0.45, "#e6e6e1");
    g.addColorStop(0.55, "#a7a8a3");
    g.addColorStop(1, "#d4d5d0");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(20,20,19,0.18)";
    ctx.font = "600 12px ui-monospace, monospace";
    for (let y = 18; y < H; y += 26) for (let x = (y / 26) % 2 ? 0 : 40; x < W; x += 80) ctx.fillText("✦ ✦", x, y);
    ctx.fillStyle = "#141413";
    ctx.font = "800 34px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(t.cover.toUpperCase(), W / 2, H / 2);
    ctx.font = "500 13px ui-monospace, monospace";
    ctx.fillText("↓ ↓ ↓", W / 2, H / 2 + 30);
    moves.current = 0;
    setCleared(false);
  }, [t.cover]);

  useEffect(() => {
    paint();
  }, [paint]);

  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || cleared) return;
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    const r = c.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * W;
    const y = ((e.clientY - r.top) / r.height) * H;
    ctx.globalCompositeOperation = "destination-out";
    // Draw a thick stroke from the previous point so fast movements leave no gaps.
    const from = last.current ?? { x, y };
    ctx.lineWidth = 52;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(x + 0.01, y);
    ctx.stroke();
    last.current = { x, y };
    // Every so often, measure how much is gone; past ~45% reveal everything.
    if (++moves.current % 6 === 0) {
      const data = ctx.getImageData(0, 0, c.width, c.height).data;
      let clear = 0;
      let total = 0;
      for (let i = 3; i < data.length; i += 4 * 40) {
        total++;
        if (data[i] === 0) clear++;
      }
      if (clear / total > 0.45) setCleared(true);
    }
  };

  return (
    <div className="relative">
      <div className={`relative h-[430px] w-[320px] overflow-hidden rounded-[24px] bg-bg-elev ring-1 ring-line-strong max-sm:scale-90 ${SHADOW}`}>
        {/* What's underneath */}
        {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
        <img src={asset(photos.portrait)} alt={owner.name} className="h-[62%] w-full object-cover" />
        <div className="flex h-[38%] flex-col justify-center bg-accent px-6 text-on-accent">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">✦ {owner.name}</p>
          <p className="mt-1 font-display text-3xl font-bold leading-none tracking-tight">{t.title}</p>
          <p className="mt-2 text-sm opacity-80">{t.body}</p>
        </div>

        {/* The silver */}
        <canvas
          ref={canvas}
          aria-label={t.cover}
          role="img"
          onPointerDown={(e) => {
            drawing.current = true;
            last.current = null;
            e.currentTarget.setPointerCapture(e.pointerId);
            scratch(e);
          }}
          onPointerMove={scratch}
          onPointerUp={() => {
            drawing.current = false;
            last.current = null;
          }}
          className={`absolute inset-0 size-full cursor-crosshair touch-none transition-opacity duration-700 ${cleared ? "pointer-events-none opacity-0" : ""}`}
        />
      </div>
      {cleared && (
        <button
          type="button"
          onClick={paint}
          aria-label="Scratch again"
          className="absolute -right-4 -top-4 grid size-10 place-items-center rounded-full border border-line-strong bg-bg-elev text-fg shadow-lg transition-transform hover:rotate-[-30deg]"
        >
          <RotateCcw className="size-4" />
        </button>
      )}
    </div>
  );
}
