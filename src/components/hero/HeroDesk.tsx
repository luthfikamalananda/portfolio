"use client";

import { useRef } from "react";
import type { SiteContent } from "@/content";
import { getGimmickCopy } from "@/content/gimmicks";
import { siteConfig, type GimmickKind } from "@/lib/site";
import { useUI } from "../UIProvider";
import { BadgeGimmick } from "./gimmicks/Badge";
import { ChatGimmick } from "./gimmicks/Chat";
import { DeckGimmick } from "./gimmicks/Deck";
import { DeskObjects } from "./gimmicks/Desk";
import { KanbanGimmick } from "./gimmicks/Kanban";
import { MagazineGimmick } from "./gimmicks/Magazine";
import { PlayerGimmick } from "./gimmicks/Player";
import { ScratchGimmick } from "./gimmicks/Scratch";
import { TerminalGimmick } from "./gimmicks/Terminal";
import { TicketGimmick } from "./gimmicks/Ticket";
import { VinylGimmick } from "./gimmicks/Vinyl";
import { HeroLinks, d } from "./parts";

type Gimmick = (props: { content: SiteContent }) => React.ReactNode;

/** Gimmicks that live in the right half. ("desk" is special: its objects roam the whole hero.) */
const RIGHT: Record<Exclude<GimmickKind, "desk">, Gimmick> = {
  deck: DeckGimmick,
  player: PlayerGimmick,
  badge: BadgeGimmick,
  magazine: MagazineGimmick,
  chat: ChatGimmick,
  vinyl: VinylGimmick,
  kanban: KanbanGimmick,
  ticket: TicketGimmick,
  scratch: ScratchGimmick,
  terminal: TerminalGimmick,
};

/**
 * Hero layout "desk": the Owner's name on the left, an interactive gimmick on the right
 * (chosen in lib/site.ts as `gimmick`, or with `?gimmick=` in dev), links along the bottom.
 */
export function HeroDesk({ content }: { content: SiteContent }) {
  const { owner, locale } = content;
  const { gimmick } = useUI();
  const mobile = siteConfig.gimmickMobile;
  const hints = getGimmickCopy(locale).hints;
  const [first, ...rest] = owner.name.split(" ");
  const deskRef = useRef<HTMLDivElement>(null);
  const Right = gimmick === "desk" ? null : RIGHT[gimmick];
  const Mobile = mobile === "desk" ? null : RIGHT[mobile];

  return (
    <>
      <div ref={deskRef} className={`relative flex flex-1 flex-col md:min-h-0 md:justify-center ${mobile === "desk" ? "min-h-[640px]" : ""}`}>
        {/* The name: not draggable, it's the anchor of the composition. */}
        <div className="pointer-events-none relative z-0 pt-4 md:max-w-[52%] md:pt-0">
          <p className="hero-fade mb-4 font-mono text-xs uppercase tracking-[0.18em] text-muted" style={d(0.3)}>
            {owner.role}
          </p>
          <h1 className="font-display text-[clamp(4.2rem,13vw,12.5rem)] font-semibold leading-[0.84] tracking-[-0.045em]">
            {[first, rest.join(" ")].map((w, i) => (
              <span key={w} className="block overflow-hidden pb-[0.04em]">
                <span className="hero-rise block" style={d(0.05 + i * 0.08)}>
                  {w}
                  {i === 1 && <span className="text-accent-ink">.</span>}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* Wide-screen gimmick, ≥1200px (CSS-switched, so smaller screens never flash it). "contents" keeps
            the desk objects positioned against the whole hero. */}
        <div className="hidden min-[1200px]:contents">
          {Right ? (
            <div
              key={gimmick}
              className="hero-fade relative z-10 flex justify-center md:absolute md:inset-y-0 md:right-0 md:w-1/2 md:items-center"
              style={d(0.35)}
            >
              <Right content={content} />
            </div>
          ) : (
            <DeskObjects content={content} bounds={deskRef} />
          )}
        </div>

        {/* Below 1200px: under the name on phones, in the right half on tablets / small laptops */}
        <div className="min-[1200px]:hidden">
          {Mobile ? (
            <div
              className="hero-fade relative z-10 mt-8 flex justify-center md:absolute md:inset-y-0 md:right-0 md:mt-0 md:w-[46%] md:items-center"
              style={d(0.35)}
            >
              {mobile === "chat" ? <ChatGimmick content={content} compact /> : <Mobile content={content} />}
            </div>
          ) : (
            <DeskObjects content={content} bounds={deskRef} />
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-5">
        <p className="hero-fade font-mono text-[11px] text-faint" style={d(0.9)}>
          <span className="min-[1200px]:hidden">↗ {hints[mobile]}</span>
          <span className="hidden min-[1200px]:inline">↗ {hints[gimmick]}</span>
        </p>
        <div className="hero-fade" style={d(1)}>
          <HeroLinks content={content} />
        </div>
      </div>
    </>
  );
}
