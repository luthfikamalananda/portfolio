"use client";

import { motion } from "motion/react";
import { useState, type ReactNode } from "react";
import type { SiteContent } from "@/content";
import { photos } from "@/content/shared";
import { asset } from "@/lib/site";
import { skillIcons } from "../../icons";
import { useUI } from "../../UIProvider";
import { SHADOW, useIntroBase } from "./shared";
import { Tape } from "./Tape";

type DeskItemProps = {
  id: string;
  rotate: number;
  delay: number;
  className: string;
  children: ReactNode;
  order: string[];
  onGrab: (id: string) => void;
  bounds: React.RefObject<HTMLDivElement | null>;
};

/** One object on the desk: drops in, can be picked up and thrown, comes to the front when grabbed. */
function DeskItem({ id, rotate, delay, className, children, order, onGrab, bounds }: DeskItemProps) {
  const { reducedMotion } = useUI();
  return (
    <motion.div
      drag
      dragConstraints={bounds}
      dragElastic={0.12}
      dragTransition={{ power: 0.25, timeConstant: 220 }}
      onPointerDown={() => onGrab(id)}
      initial={reducedMotion ? false : { opacity: 0, y: -60, rotate: rotate * 3, scale: 1.08 }}
      animate={{ opacity: 1, y: 0, rotate, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      whileDrag={{ scale: 1.07, rotate: rotate / 3, cursor: "grabbing" }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay }}
      style={{ zIndex: 10 + order.indexOf(id) }}
      className={`absolute cursor-grab touch-none select-none ${className}`}
    >
      {children}
    </motion.div>
  );
}

type Corner = "tl" | "tr" | "bl" | "br";
// The pin's centre sits just inside the card's corner, the same way on every card.
const CORNER: Record<Corner, string> = {
  tl: "left-0 top-0 -translate-x-[38%] -translate-y-[38%]",
  tr: "right-0 top-0 translate-x-[38%] -translate-y-[38%]",
  bl: "bottom-0 left-0 -translate-x-[38%] translate-y-[38%]",
  br: "bottom-0 right-0 translate-x-[38%] translate-y-[38%]",
};

/** A tech badge pinned to a corner of a desk card — it moves with the card. */
function Pin({ icon, corner, tilt = 0 }: { icon: string; corner: Corner; tilt?: number }) {
  const Icon = skillIcons[icon];
  return (
    <span
      className={`pointer-events-none absolute z-20 grid size-[clamp(52px,4.4vw,64px)] place-items-center rounded-full border-[3px] border-[#f3f2ec] bg-bg-elev text-fg ${SHADOW} ${CORNER[corner]}`}
      style={{ rotate: `${tilt}deg` }}
    >
      {Icon && <Icon className="size-[45%]" aria-label={icon} />}
    </span>
  );
}

/** First sentence of a paragraph (highlighted on the notebook page). */
function splitFirstSentence(text: string): [string, string] {
  const i = text.search(/[.!?](\s|$)/);
  return i < 0 ? [text, ""] : [text.slice(0, i + 1), text.slice(i + 1)];
}

/** A page torn out of a spiral notebook: ruled lines, red margin, handwritten intro, highlighter. */
function NotebookPage({ text, children }: { text: string; children?: React.ReactNode }) {
  const [first, rest] = splitFirstSentence(text);
  return (
    // The shadow lives on the wrapper: the torn-edge mask would clip a box-shadow on the page itself.
    <div className="relative [filter:drop-shadow(0_18px_22px_rgb(0_0_0/0.45))_drop-shadow(0_2px_3px_rgb(0_0_0/0.2))]">
      <Tape className="-top-2 left-1/2 -translate-x-1/2" rotate={2} />
      <div
        className="relative w-[clamp(210px,20vw,280px)] pb-5 pl-9 pr-4 pt-9 font-hand text-[clamp(19px,1.55vw,23px)] leading-[26px] text-[#24306e]"
        style={{
          backgroundColor: "#fbfaf3",
          backgroundImage:
            "linear-gradient(90deg, transparent 26px, rgb(214 69 69 / 0.45) 26px 27.5px, transparent 27.5px), repeating-linear-gradient(transparent 0 25px, rgb(84 118 196 / 0.28) 25px 26px)",
          backgroundPosition: "0 0, 0 9px",
          // Ragged top edge where the page was torn off the spiral.
          maskImage: "radial-gradient(circle at 50% 0, transparent 4px, #000 4.5px)",
          maskSize: "16px 100%",
          maskPosition: "8px 0",
        }}
      >
        {/* Spiral holes */}
        <span aria-hidden className="absolute inset-x-3 top-2.5 flex justify-between">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} className="size-2.5 rounded-full bg-black/25 shadow-[inset_0_1px_1px_rgb(0_0_0/0.4)]" />
          ))}
        </span>
        <p>
          <span className="bg-[linear-gradient(transparent_45%,color-mix(in_oklab,var(--accent)_80%,transparent)_45%,color-mix(in_oklab,var(--accent)_80%,transparent)_88%,transparent_88%)] box-decoration-clone">
            {first}
          </span>
          {rest}
        </p>
      </div>
      {children}
    </div>
  );
}

/**
 * The desk (≥1200px): a polaroid, a notebook page and a "now serving" receipt, each taped to the
 * wall with tech badges pinned to its corners. Every card can be picked up and thrown within `bounds`.
 */
export function DeskObjects({ content, bounds }: { content: SiteContent; bounds: React.RefObject<HTMLDivElement | null> }) {
  const { owner, hero, ui } = content;
  const [order, setOrder] = useState(["polaroid", "receipt", "note"]);
  const base = useIntroBase(0.25);
  const grab = (id: string) => setOrder((o) => [...o.filter((x) => x !== id), id]);
  const item = { order, onGrab: grab, bounds };

  return (
    <>
      <DeskItem id="polaroid" rotate={-5} delay={base + 0.1} className="right-[33%] top-[6%]" {...item}>
        <figure className={`relative w-[clamp(150px,15vw,220px)] bg-[#f3f2ec] p-2.5 pb-3 text-[#141413] ${SHADOW}`}>
          <Tape className="-top-3 left-1/2 -translate-x-1/2" rotate={-3} />
          {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
          <img src={asset(photos.portrait)} alt={owner.name} draggable={false} className="aspect-[4/5] w-full object-cover" />
          <figcaption className="mt-2 text-center font-mono text-[11px]">
            {owner.nickname}, &rsquo;26
          </figcaption>
          <Pin icon="typescript" corner="bl" tilt={-8} />
        </figure>
      </DeskItem>

      <DeskItem id="note" rotate={4} delay={base + 0.2} className="right-[1%] top-[2%]" {...item}>
        <NotebookPage text={hero.intro}>
          <Pin icon="react" corner="bl" tilt={6} />
          <Pin icon="nextjs" corner="tr" tilt={-6} />
        </NotebookPage>
      </DeskItem>

      <DeskItem id="receipt" rotate={-2} delay={base + 0.3} className="right-[7%] top-[63%]" {...item}>
        <div className="relative">
          <Tape className="-left-4 -top-1" rotate={-38} />
          <Tape className="-right-4 -top-1" rotate={38} />
          <div
            className={`w-[clamp(200px,18vw,250px)] bg-[#f3f2ec] px-4 pb-6 pt-4 font-mono text-[11px] text-[#141413] ${SHADOW} [mask:conic-gradient(from_-45deg_at_bottom,#0000,#000_1deg_89deg,#0000_90deg)_50%/12px_100%]`}
          >
            <p className="border-b border-dashed border-[#141413]/40 pb-2 text-center text-xs font-bold uppercase tracking-[0.2em]">{ui.hero.receiptTitle}</p>
            <dl className="mt-2 space-y-1.5">
              {hero.now.map((n) => (
                <div key={n.label}>
                  <dt className="uppercase opacity-60">{n.label}</dt>
                  <dd className="font-semibold">{n.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 border-t border-dashed border-[#141413]/40 pt-2 text-center opacity-70">** {ui.hero.receiptFooter} **</p>
          </div>
          {/* Pins sit outside the masked paper so the zig-zag edge doesn't cut them. */}
          <Pin icon="git" corner="bl" tilt={-10} />
          <Pin icon="docker" corner="br" tilt={8} />
        </div>
      </DeskItem>
    </>
  );
}
