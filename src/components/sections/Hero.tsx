"use client";

import type { SiteContent } from "@/content";
import type { HeroKind } from "@/lib/site";
import { HeroBadge } from "../hero/HeroBadge";
import { HeroDesk } from "../hero/HeroDesk";
import { HeroMagazine } from "../hero/HeroMagazine";
import { HeroSentence } from "../hero/HeroSentence";
import { HeroSpecimen } from "../hero/HeroSpecimen";
import { useUI } from "../UIProvider";

const layouts: Record<HeroKind, (props: { content: SiteContent }) => React.ReactNode> = {
  desk: HeroDesk,
  badge: HeroBadge,
  magazine: HeroMagazine,
  sentence: HeroSentence,
  specimen: HeroSpecimen,
};

/** First screen. The layout is chosen in lib/site.ts (`hero`), or with `?hero=` in dev. */
export function Hero({ content }: { content: SiteContent }) {
  const { hero } = useUI();
  const Layout = layouts[hero];
  return (
    <section id="top" aria-label={content.owner.name} className="relative flex min-h-dvh flex-col overflow-x-clip px-4 pb-6 pt-24 sm:px-8">
      <Layout content={content} />
    </section>
  );
}
