"use client";

import { AnimatePresence, motion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { useUI } from "../UIProvider";
import { PillBarMobile } from "./PillNavBar";
import { Keycap, type KeyAction } from "./keycaps";
import { ControlCluster, Legend, useKeyboardControls } from "./keyboardKit";
import { ALL_SECTIONS, initialsOf, useActiveSection } from "./shared";

/**
 * After load, the Hero key row "types" 1→6 once, naming each Section as it goes, inside a soft
 * spotlight. It waits for the Hero entrance (longer when the intro curtain plays) so it isn't lost
 * among the desk objects dropping in, and each key holds long enough to be read.
 */
const DEMO_AT = 1900;
const DEMO_AT_INTRO = 3300;
const DEMO_STEP = 720;
const DEMO_HOLD = 1500;

const SPRING = { type: "spring", stiffness: 380, damping: 34 } as const;

/** The small keycap the whole nav is built from. `lit` = held down in the accent colour. */
function miniKey(lit: boolean, extra = "") {
  return `${extra} grid size-7 flex-none place-items-center rounded-[7px] border font-mono text-[11px] font-semibold leading-none transition-[transform,box-shadow,background-color,color,border-color] duration-150 ${
    lit
      ? "translate-y-[2px] border-accent bg-accent text-on-accent shadow-none"
      : "border-line-strong bg-surface text-muted shadow-[0_2px_0_var(--line-strong)] group-hover:-translate-y-px group-hover:text-fg group-hover:shadow-[0_3px_0_var(--line-strong)] group-active:translate-y-[2px] group-active:shadow-none"
  }`;
}

/**
 * The rail, made for the keyboard.
 * Over the Hero: a compact row of keycaps 1–6 beside esc, with a caption that names the key you
 * hover (and, once after load, a short 1→6 demo) — the Hero itself stays full width.
 * Past the Hero: the keys fly down into a vertical rail on the left, with K ↑ / J ↓ keys that
 * step Section by Section and a scroll-progress line along its left edge.
 * 1–6, J/K, Esc, R, T, L, / and ? all work. Below 1440px it is the collapsed pill bar.
 */
export function KeyRailNav() {
  const { content, reducedMotion } = useUI();
  const { ui, owner } = content;
  const active = useActiveSection(ALL_SECTIONS);
  const { scrollYProgress } = useScroll();
  const kb = useKeyboardControls();
  const { down, onPress, run } = kb;
  const docked = !!active;
  const [hovered, setHovered] = useState<number | null>(null);
  const [demo, setDemo] = useState<number | null>(null);
  const [spotlight, setSpotlight] = useState(false);
  const cap = "h-10 w-10 px-1.5 py-1 [--cap-w:2.5rem]";

  useEffect(() => {
    if (reducedMotion) return;
    const start = document.documentElement.getAttribute("data-intro") === "play" ? DEMO_AT_INTRO : DEMO_AT;
    const end = start + (ALL_SECTIONS.length - 1) * DEMO_STEP + DEMO_HOLD;
    const timers = [
      setTimeout(() => setSpotlight(true), start - 400),
      ...ALL_SECTIONS.map((_, i) => setTimeout(() => setDemo(i), start + i * DEMO_STEP)),
      setTimeout(() => setDemo(null), end),
      setTimeout(() => setSpotlight(false), end + 300),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reducedMotion]);

  const named = hovered ?? (docked ? null : demo);
  const step = (dir: "prev" | "next") => {
    onPress(dir);
    run(dir);
  };

  const keys = ALL_SECTIONS.map((id, i) => {
    const action = `s${i + 1}` as KeyAction;
    const on = active === id;
    return (
      <motion.li key={id} layoutId={`keyrail-${id}`} layout="position" transition={reducedMotion ? { duration: 0 } : { ...SPRING, delay: i * 0.035 }}>
        <a
          href={`#${id}`}
          onClick={() => onPress(action)}
          onPointerEnter={() => setHovered(i)}
          onPointerLeave={() => setHovered(null)}
          onFocus={() => setHovered(i)}
          onBlur={() => setHovered(null)}
          aria-label={ui.nav[id]}
          aria-keyshortcuts={String(i + 1)}
          aria-current={on ? "location" : undefined}
          className="group flex items-center gap-3"
        >
          <span aria-hidden className={miniKey(on || down(action) || (!docked && demo === i), !docked && demo === i ? "ring-4 ring-accent/25" : "")}>
            {i + 1}
          </span>
          {docked && (
            <span
              aria-hidden
              className={`whitespace-nowrap text-xs leading-none transition-[opacity,translate,color] duration-300 ${
                on
                  ? "translate-x-0 font-medium text-fg opacity-100"
                  : "-translate-x-1 text-muted opacity-0 group-hover:translate-x-0 group-hover:text-fg group-hover/rail:translate-x-0 group-hover/rail:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
              }`}
            >
              {ui.nav[id]}
            </span>
          )}
        </a>
      </motion.li>
    );
  });

  /** K ↑ / J ↓ — step one Section up or down. */
  const stepKey = (dir: "prev" | "next") => (
    <motion.button
      type="button"
      initial={reducedMotion ? false : { opacity: 0, y: dir === "prev" ? 6 : -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.25 }}
      onClick={() => step(dir)}
      aria-label={ui.keys.nextPrev}
      aria-keyshortcuts={dir === "prev" ? "K" : "J"}
      className="group flex items-center gap-3"
    >
      <span aria-hidden className={miniKey(down(dir))}>
        {dir === "prev" ? "K" : "J"}
      </span>
      <span aria-hidden className="font-mono text-xs leading-none text-muted transition-colors group-hover:text-fg">
        {dir === "prev" ? "↑" : "↓"}
      </span>
    </motion.button>
  );

  return (
    <>
      {/* Below 1440px the collapsed pill bar takes over, phones and laptops alike; the keyrail needs
          the wide left gutter of big screens. */}
      <PillBarMobile className="min-[1440px]:hidden" />
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden items-start justify-between px-6 pt-4 min-[1440px]:flex [&>*]:pointer-events-auto">
        <div className="flex h-10 items-center gap-4">
          <Keycap href="#top" pressed={!docked || down("top")} shortcut="Escape" label={`${owner.name} — ${ui.keys.top}`} className={`${cap} !w-[46px]`}>
            <Legend accent={!docked}>esc</Legend>
            <span className="font-display text-[12px] font-bold leading-none">{initialsOf(owner.name)}</span>
          </Keycap>

          {/* Over the Hero: a compact key row, plus a caption naming the key in play. */}
          {!docked && (
            <div
              className={`-mx-2 flex items-center gap-4 rounded-xl px-2 py-1.5 transition-[background-color,box-shadow] duration-500 ${
                spotlight
                  ? "bg-bg-elev/85 shadow-[0_0_0_1px_color-mix(in_oklab,var(--accent)_40%,transparent),0_14px_40px_-14px_color-mix(in_oklab,var(--accent)_50%,transparent)] backdrop-blur-xl"
                  : ""
              }`}
            >
              <nav aria-label="Main">
                <ul className="flex items-center gap-1.5">{keys}</ul>
              </nav>
              <span className="relative h-5 min-w-44 overflow-hidden text-sm leading-5">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={named ?? "hint"}
                    initial={reducedMotion ? false : { y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reducedMotion ? { opacity: 0 } : { y: -12, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.19, 1, 0.22, 1] }}
                    className="absolute inset-0 whitespace-nowrap"
                  >
                    {named === null ? (
                      <span className="font-mono text-[11px] text-faint">{ui.keys.sections}</span>
                    ) : (
                      <span className="font-medium text-fg">
                        <span className="mr-1.5 text-accent-ink">→</span>
                        {ui.nav[ALL_SECTIONS[named]]}
                      </span>
                    )}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          )}
        </div>

        <ControlCluster kb={kb} cap={cap} />
      </header>

      {/* Past the Hero: the same keys, docked as a rail with step keys and a progress line. */}
      {docked && (
        <nav aria-label="Main" className="group/rail fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 min-[1440px]:block">
          {/* On hover every label shows; a soft panel keeps them readable over content. */}
          <div className="relative -m-2.5 flex flex-col gap-4 rounded-2xl py-2.5 pl-7 pr-5 transition-[background-color,box-shadow] duration-300 group-hover/rail:bg-bg-elev/85 group-hover/rail:shadow-[0_20px_40px_-24px_rgb(0_0_0/0.6)] group-hover/rail:backdrop-blur-xl">
            {/* Scroll progress, along the rail's left edge. */}
            <span aria-hidden className="absolute inset-y-3 left-2.5 w-px bg-line" />
            <motion.span aria-hidden style={{ scaleY: scrollYProgress }} className="absolute inset-y-3 left-2.5 w-px origin-top bg-accent" />
            {stepKey("prev")}
            <ul className="flex flex-col gap-2.5">{keys}</ul>
            {stepKey("next")}
          </div>
        </nav>
      )}
    </>
  );
}
