"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import type { SiteContent } from "@/content";
import { gaming } from "@/content/shared";
import { asset } from "@/lib/site";
import { GameCatalog } from "./GameCatalog";

export type ModeKey = "versus" | "play" | "training";
const ORDER: ModeKey[] = ["versus", "play", "training"];

/** Beyond Code's Modes: Community (default), Content & Gaming, Sports. Arrow keys move between tabs. */
export function BeyondModes({ content, mode: modeProp, onMode }: { content: SiteContent; mode?: ModeKey; onMode?: (m: ModeKey) => void }) {
  const { beyond, ui } = content;
  const [modeSelf, setModeSelf] = useState<ModeKey>("versus");
  // Controlled when the section shows a card that follows the tab.
  const mode = modeProp ?? modeSelf;
  const setMode = (m: ModeKey) => (onMode ? onMode(m) : setModeSelf(m));
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + ORDER.length) % ORDER.length;
    setMode(ORDER[next]);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      {/* Tabs as an editorial index: number, title, sub-line; a sliding accent rule marks the active one. */}
      <div role="tablist" aria-label={ui.beyond.eyebrow} className="-mx-1 flex overflow-x-auto border-b border-line [scrollbar-width:none]">
        {ORDER.map((key, i) => {
          const active = key === mode;
          return (
            <button
              key={key}
              ref={(el) => void (tabs.current[i] = el)}
              id={`mode-tab-${key}`}
              role="tab"
              aria-selected={active}
              aria-controls={`mode-panel-${key}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setMode(key)}
              onKeyDown={(e) => onKey(e, i)}
              className="group relative min-w-[9.5rem] flex-1 px-1 pb-4 pt-1 text-left"
            >
              <span className={`font-mono text-[11px] transition-colors ${active ? "text-accent-ink" : "text-faint group-hover:text-muted"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`mt-1 block font-display text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-none tracking-tight transition-colors ${
                  active ? "text-fg" : "text-muted group-hover:text-fg"
                }`}
              >
                {ui.beyond.modes[key].label}
              </span>
              <span className="mt-1.5 block font-mono text-[11px] text-faint">{ui.beyond.modes[key].sub}</span>
              {active && (
                <motion.span
                  layoutId="mode-rule"
                  className="absolute inset-x-1 -bottom-px h-[3px] bg-accent"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          id={`mode-panel-${mode}`}
          role="tabpanel"
          aria-labelledby={`mode-tab-${mode}`}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="mt-6"
        >
          {mode === "versus" && (
            <div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                  {ui.beyond.community} · {gaming.game} · FGC {gaming.communityCity}
                </p>
                <p className="font-display text-3xl font-semibold tracking-tight">{gaming.community}</p>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <p className="max-w-[60ch] text-muted">{beyond.versus.blurb}</p>
                <ul className="flex flex-wrap gap-2">
                  {beyond.versus.roles.map((r) => (
                    <li key={r} className="rounded-md border border-line-strong px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em]">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Caster shot full width on top, the podium photos side by side under it. */}
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {gaming.tournamentPhotos.map((src, i) => (
                  <li key={src} className={`group overflow-hidden rounded-xl bg-surface ring-1 ring-line ${i === 0 ? "col-span-2" : ""}`}>
                    <figure className="relative h-full">
                      {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
                      <img
                        src={asset(src)}
                        alt={beyond.versus.captions[i] ?? ""}
                        loading="lazy"
                        style={{ objectPosition: gaming.tournamentFocus[i] ?? "50% 50%" }}
                        className={`${i === 0 ? "aspect-[3/1]" : "aspect-[16/9]"} size-full object-cover transition-transform duration-700 group-hover:scale-105`}
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 pt-8 font-mono text-[11px] text-white">
                        {beyond.versus.captions[i]}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {mode === "play" && (
            <div>
              <GameCatalog content={content} />
            </div>
          )}

          {mode === "training" && (
            <div>
              <p className="max-w-[60ch] text-muted">{beyond.training.blurb}</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {beyond.training.activities.map((a, i) => (
                  <li key={a.name} className="group">
                    <div className="overflow-hidden rounded-xl bg-surface ring-1 ring-line">
                      {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
                      <img
                        src={asset(gaming.trainingPhotos[i] ?? gaming.trainingPhotos[0])}
                        alt={a.name}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 flex items-baseline gap-2">
                      <span className="font-mono text-[11px] text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display text-xl font-semibold tracking-tight">{a.name}</span>
                    </p>
                    <p className="text-sm text-muted">{a.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
