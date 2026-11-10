"use client";

import { useEffect, type ReactNode } from "react";
import { ALL_SECTIONS } from "./shared";

/** Keycap surface + press states, also used on non-interactive spans inside larger links (the rail). */
export function capClass(pressed: boolean, hoverParent = false) {
  const hover = hoverParent
    ? "group-hover:-translate-y-0.5 group-hover:shadow-[0_5px_0_var(--line-strong)] group-active:translate-y-[2px] group-active:shadow-[0_1px_0_var(--line-strong)]"
    : "hover:-translate-y-0.5 hover:shadow-[0_6px_0_var(--line-strong)] active:translate-y-[3px] active:shadow-[0_1px_0_var(--line-strong)]";
  return `transition-[transform,box-shadow,background-color,color,border-color] duration-150 ${
    pressed
      ? "translate-y-[3px] border-[color-mix(in_oklab,var(--accent)_70%,#000)] bg-accent text-on-accent shadow-[0_1px_0_color-mix(in_oklab,var(--accent)_55%,#000)]"
      : `border-line-strong bg-surface text-fg shadow-[0_4px_0_var(--line-strong)] ${hover}`
  }`;
}

/**
 * A physical keycap. `pressed` renders it held down (used for the active Section);
 * hover lifts it a touch, click pushes it in.
 */
export function Keycap({
  children,
  pressed = false,
  className = "",
  href,
  onClick,
  label,
  shortcut,
  hrefLang,
}: {
  children: ReactNode;
  pressed?: boolean;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  label?: string;
  shortcut?: string;
  hrefLang?: string;
}) {
  const cls = `relative inline-flex select-none flex-col justify-between rounded-[9px] border text-left ${capClass(pressed)} ${className}`;
  if (href)
    return (
      <a
        href={href}
        hrefLang={hrefLang}
        onClick={onClick}
        aria-label={label}
        aria-keyshortcuts={shortcut}
        aria-current={pressed && href.startsWith("#") ? "location" : undefined}
        className={cls}
      >
        {children}
      </a>
    );
  return (
    <button type="button" onClick={onClick} aria-label={label} aria-keyshortcuts={shortcut} className={cls}>
      {children}
    </button>
  );
}

/** Every keyboard action the keyboard navbar exposes. Each one is also a keycap you can click. */
export type KeyAction = "top" | "next" | "prev" | "resume" | "theme" | "lang" | "palette" | "help" | NavSectionKey;
type NavSectionKey = `s${1 | 2 | 3 | 4 | 5 | 6}`;

/** Scroll stops for J/K: the Hero, then every Section in page order. */
const STOPS = ["top", ...ALL_SECTIONS] as const;

/**
 * Where J (next) / K (prev) should land. A Section that has just been jumped to sits slightly above
 * the viewport top (its negative scroll-margin), so "current" is anything within a small band there.
 */
// While a smooth scroll is still travelling, positions lag behind: step from where we're heading instead.
let heading: { index: number; at: number } | null = null;
const HEADING_MS = 900;

function stepTarget(dir: 1 | -1): HTMLElement | null {
  const els = STOPS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
  let index = -1;
  if (heading && performance.now() - heading.at < HEADING_MS) {
    index = Math.min(Math.max(heading.index + dir, 0), els.length - 1);
  } else {
    const tops = els.map((el) => el.getBoundingClientRect().top);
    if (dir === 1) index = tops.findIndex((t) => t > 40);
    else for (let i = els.length - 1; i >= 0 && index < 0; i--) if (tops[i] < -80) index = i;
  }
  if (index < 0) return null;
  heading = { index, at: performance.now() };
  return els[index];
}

/** Shortcuts are off while typing, while a dialog (palette, Resume) is open. */
function shortcutsBlocked(e: KeyboardEvent) {
  const t = e.target as HTMLElement;
  if (t.closest?.("input, textarea, select, [contenteditable]")) return true;
  return !!document.querySelector("dialog[open]");
}

/**
 * The whole page from the keyboard:
 * 1–6 Sections · J/K next/prev · Esc top · R Resume · T theme · L language · / palette · ? help.
 * (Space, Shift+Space and the arrow keys keep their native scrolling.)
 * `onPress` fires for every handled key so the matching keycap can flash.
 */
export function useKeyboardNav({
  run,
  onPress,
  helpOpen,
}: {
  run: (action: KeyAction) => void;
  onPress?: (action: KeyAction) => void;
  helpOpen: boolean;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.defaultPrevented) return;
      if (shortcutsBlocked(e)) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      let action: KeyAction | undefined;
      const n = Number(k);
      if (Number.isInteger(n) && n >= 1 && n <= ALL_SECTIONS.length) action = `s${n}` as NavSectionKey;
      else if (k === "j") action = "next";
      else if (k === "k") action = "prev";
      else if (k === "Escape") action = helpOpen ? "help" : "top";
      else if (k === "r") action = "resume";
      else if (k === "t") action = "theme";
      else if (k === "l") action = "lang";
      else if (k === "/") action = "palette";
      else if (k === "?") action = "help";
      if (!action) return;
      // Holding a toggle key down shouldn't strobe the theme or the help panel.
      if (e.repeat && action !== "next" && action !== "prev") return;
      e.preventDefault();
      onPress?.(action);
      run(action);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [run, onPress, helpOpen]);
}

/** Scrolls to a J/K / 1–6 / Esc target. */
export function scrollToStop(action: "top" | "next" | "prev" | NavSectionKey, smooth: boolean) {
  const behavior = smooth ? "smooth" : "auto";
  let el: HTMLElement | null;
  if (action === "top") {
    el = document.getElementById("top");
    heading = { index: 0, at: performance.now() };
  }
  else if (action === "next") el = stepTarget(1);
  else if (action === "prev") el = stepTarget(-1);
  else {
    const n = Number(action.slice(1));
    el = document.getElementById(ALL_SECTIONS[n - 1]);
    heading = { index: n, at: performance.now() };
  }
  el?.scrollIntoView({ behavior });
}
