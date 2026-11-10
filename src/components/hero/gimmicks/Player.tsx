"use client";

import type { SiteContent } from "@/content";
import { PlayerCard } from "../../PlayerCard";

/** Hero gimmick: the Player Card on its own — try the special move ↓ → P. */
export function PlayerGimmick({ content }: { content: SiteContent }) {
  // Scaled down a touch so the whole card fits beside the name on laptop screens.
  return (
    <div className="origin-center md:scale-[0.82] xl:scale-90">
      <PlayerCard content={content} listen className="-rotate-2" />
    </div>
  );
}
