"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { accentHex, accentKinds, beyondCardKinds, gamesKinds, gimmickKinds, pickerKinds, heroKinds, navKinds, textureKinds } from "@/lib/site";
import { useUI } from "./UIProvider";

/**
 * Development-only panel to compare hero layouts, textures, navigation styles and accent colours.
 * Never rendered in production builds. Pick a winner, then set it in src/lib/site.ts.
 */
export function DevSwitcher() {
  const { accent, setAccent, nav, setNav, hero, setHero, texture, setTexture, gimmick, setGimmick, games, setGames, picker, setPicker, beyondCard, setBeyondCard } = useUI();
  const [open, setOpenState] = useState(true);
  const setOpen = (next: boolean) => {
    setOpenState(next);
    try {
      localStorage.setItem("dev-switcher-open", next ? "1" : "0");
    } catch {
      /* ignore */
    }
  };

  // Remember folded/unfolded between reloads; start folded on phones.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("dev-switcher-open");
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only storage/viewport check, once
    if (saved === "0" || (saved === null && window.innerWidth < 768)) setOpenState(false);
  }, []);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open dev switcher"
        className="fixed bottom-4 right-4 z-[80] grid size-10 place-items-center rounded-full border border-line-strong bg-bg-elev text-fg shadow-xl"
      >
        <SlidersHorizontal className="size-4" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-[80] max-h-[calc(100dvh-2rem)] w-72 overflow-y-auto rounded-2xl border border-line-strong bg-bg-elev/95 p-4 font-mono text-xs text-fg shadow-2xl backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between">
        <span className="uppercase tracking-[0.2em] text-muted">Dev switcher</span>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close dev switcher" className="text-muted hover:text-fg">
          <X className="size-4" />
        </button>
      </div>
      <p className="mb-2 text-muted">?hero=</p>
      <div className="mb-4 grid grid-cols-3 gap-1.5">
        {heroKinds.map((h) => (
          <button key={h} type="button" onClick={() => setHero(h)} className={`rounded-lg border px-2 py-1.5 text-left ${hero === h ? "border-accent bg-accent text-on-accent" : "border-line hover:border-line-strong"}`}>
            {h}
          </button>
        ))}
      </div>
      {hero === "desk" && (
        <>
          <p className="mb-2 text-muted">?gimmick=</p>
          <div className="mb-4 grid grid-cols-3 gap-1.5">
            {gimmickKinds.map((g) => (
              <button key={g} type="button" onClick={() => setGimmick(g)} className={`rounded-lg border px-2 py-1.5 text-left ${gimmick === g ? "border-accent bg-accent text-on-accent" : "border-line hover:border-line-strong"}`}>
                {g}
              </button>
            ))}
          </div>
        </>
      )}
      <p className="mb-2 text-muted">?beyondCard=</p>
      <div className="mb-4 grid grid-cols-3 gap-1.5">
        {beyondCardKinds.map((k) => (
          <button key={k} type="button" onClick={() => setBeyondCard(k)} className={`rounded-lg border px-2 py-1.5 text-left ${beyondCard === k ? "border-accent bg-accent text-on-accent" : "border-line hover:border-line-strong"}`}>
            {k}
          </button>
        ))}
      </div>
      <p className="mb-2 text-muted">?games=</p>
      <div className="mb-4 grid grid-cols-2 gap-1.5">
        {gamesKinds.map((g) => (
          <button key={g} type="button" onClick={() => setGames(g)} className={`rounded-lg border px-2 py-1.5 text-left ${games === g ? "border-accent bg-accent text-on-accent" : "border-line hover:border-line-strong"}`}>
            {g}
          </button>
        ))}
      </div>
      {games === "spotlight" && (
        <>
          <p className="mb-2 text-muted">?picker=</p>
          <div className="mb-4 grid grid-cols-3 gap-1.5">
            {pickerKinds.map((k) => (
              <button key={k} type="button" onClick={() => setPicker(k)} className={`rounded-lg border px-2 py-1.5 text-left ${picker === k ? "border-accent bg-accent text-on-accent" : "border-line hover:border-line-strong"}`}>
                {k}
              </button>
            ))}
          </div>
        </>
      )}
      <p className="mb-2 text-muted">?texture=</p>
      <div className="mb-4 grid grid-cols-3 gap-1.5">
        {textureKinds.map((t) => (
          <button key={t} type="button" onClick={() => setTexture(t)} className={`rounded-lg border px-2 py-1.5 text-left ${texture === t ? "border-accent bg-accent text-on-accent" : "border-line hover:border-line-strong"}`}>
            {t}
          </button>
        ))}
      </div>
      <p className="mb-2 text-muted">?nav=</p>
      <div className="mb-4 grid grid-cols-3 gap-1.5">
        {navKinds.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setNav(n)}
            className={`rounded-lg border px-2 py-1.5 text-left ${nav === n ? "border-accent bg-accent text-on-accent" : "border-line hover:border-line-strong"}`}
          >
            {n}
          </button>
        ))}
      </div>
      <p className="mb-2 text-muted">?accent=</p>
      <div className="flex gap-2">
        {accentKinds.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setAccent(a)}
            aria-label={a}
            title={a}
            className={`size-8 rounded-full border-2 ${accent === a ? "border-fg" : "border-transparent"}`}
            style={{ background: accentHex[a].dark }}
          />
        ))}
      </div>
    </div>
  );
}
