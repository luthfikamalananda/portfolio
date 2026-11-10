"use client";

import { Command, FileDown, Languages, Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { curtainClick, navigateWithCurtain } from "@/lib/curtain";
import { useUI } from "../UIProvider";
import { Keycap, scrollToStop, useKeyboardNav, type KeyAction } from "./keycaps";
import { otherLocaleHref } from "./shared";

const FLASH_MS = 170;
const USED_KEY = "keys-used";

/** A key legend as printed in the cheat sheet and in hints. */
export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-grid h-6 min-w-6 place-items-center rounded-[5px] border border-line-strong bg-surface px-1.5 font-mono text-[11px] font-semibold text-fg shadow-[0_2px_0_var(--line-strong)]">
      {children}
    </kbd>
  );
}

/** The legend in a keycap's top-left corner. */
export function Legend({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return <span className={`font-mono text-[10px] font-bold uppercase leading-none ${accent ? "" : "opacity-55"}`}>{children}</span>;
}

/**
 * Wires the page to the keyboard (see useKeyboardNav) and keeps the state the keyboard navbars
 * share: which keycap is flashing, whether the cheat sheet is open, whether the ? key should glow.
 */
export function useKeyboardControls() {
  const { content, toggleTheme, setPaletteOpen, setResumeOpen, reducedMotion } = useUI();
  const { href } = otherLocaleHref(content);
  const [flash, setFlash] = useState<KeyAction | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  // Until the Visitor uses a shortcut once this session, the ? key glows softly.
  const [discovered, setDiscovered] = useState(true);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      // sessionStorage is client-only; read it once after mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDiscovered(sessionStorage.getItem(USED_KEY) === "1");
    } catch {
      /* storage blocked — leave the glow off */
    }
  }, []);

  const onPress = useCallback((action: KeyAction) => {
    if (flashTimer.current) clearTimeout(flashTimer.current);
    setFlash(action);
    flashTimer.current = setTimeout(() => setFlash(null), FLASH_MS);
    setDiscovered(true);
    try {
      sessionStorage.setItem(USED_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const run = useCallback(
    (action: KeyAction) => {
      switch (action) {
        case "resume":
          return setResumeOpen(true);
        case "theme":
          return toggleTheme();
        case "lang":
          return navigateWithCurtain(href);
        case "palette":
          return setPaletteOpen(true);
        case "help":
          return setHelpOpen((o) => !o);
        default:
          setHelpOpen(false);
          return scrollToStop(action, !reducedMotion);
      }
    },
    [href, reducedMotion, setPaletteOpen, setResumeOpen, toggleTheme],
  );

  useKeyboardNav({ run, onPress, helpOpen });

  useEffect(() => () => void (flashTimer.current && clearTimeout(flashTimer.current)), []);

  return { down: (a: KeyAction) => flash === a, onPress, run, helpOpen, setHelpOpen, discovered };
}

export type KeyboardControls = ReturnType<typeof useKeyboardControls>;

/**
 * R Resume · T theme · L language · / palette · ? help — every control is a key.
 * `cap` sizes the small keys; Resume shows its label from xl up.
 */
export function ControlKeys({ kb, cap, className = "" }: { kb: KeyboardControls; cap: string; className?: string }) {
  const { content, theme, toggleTheme, setPaletteOpen, setResumeOpen } = useUI();
  const { ui } = content;
  const { other, href } = otherLocaleHref(content);
  const { down, helpOpen, setHelpOpen, discovered } = kb;

  return (
    <div className={`flex gap-2 ${className}`}>
      <Keycap
        onClick={() => setResumeOpen(true)}
        pressed={down("resume")}
        shortcut="R"
        label={ui.contact.resume}
        className={`${cap} !w-auto min-w-[var(--cap-w)] !border-accent xl:min-w-[6.2rem]`}
      >
        <Legend accent>R</Legend>
        <span className="flex items-center gap-1.5 text-[12.5px] font-medium leading-none">
          <FileDown className="size-3.5 text-accent-ink" />
          <span className="hidden xl:inline">{ui.nav.resume}</span>
        </span>
      </Keycap>
      <Keycap onClick={toggleTheme} pressed={down("theme")} shortcut="T" label={theme === "dark" ? ui.theme.toLight : ui.theme.toDark} className={cap}>
        <Legend>T</Legend>
        {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </Keycap>
      <Keycap href={href} hrefLang={other} onClick={curtainClick(href)} pressed={down("lang")} shortcut="L" label={ui.locale.switchTo} className={cap}>
        <Legend>L</Legend>
        <span className="flex items-center gap-1 font-mono text-[11px] font-bold uppercase leading-none">
          <Languages className="size-3.5" />
          {other}
        </span>
      </Keycap>
      <Keycap onClick={() => setPaletteOpen(true)} pressed={down("palette")} shortcut="/" label={ui.keys.palette} className={cap}>
        <Legend>/</Legend>
        <Command className="size-4" />
      </Keycap>
      <Keycap
        onClick={() => setHelpOpen((o) => !o)}
        pressed={helpOpen || down("help")}
        shortcut="?"
        label={ui.keys.title}
        className={`${cap} ${discovered ? "" : "kbd-glow"}`}
      >
        <Legend accent={helpOpen}>?</Legend>
        <span className="font-mono text-[11px] font-bold leading-none">help</span>
      </Keycap>
    </div>
  );
}

/** The control keys with the "?" cheat sheet anchored under them; clicking outside closes it. */
export function ControlCluster({ kb, cap, className = "" }: { kb: KeyboardControls; cap: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { helpOpen, setHelpOpen } = kb;
  useEffect(() => {
    if (!helpOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setHelpOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [helpOpen, setHelpOpen]);

  return (
    <div ref={ref} className="relative">
      <ControlKeys kb={kb} cap={cap} className={className} />
      <ShortcutSheet open={helpOpen} />
    </div>
  );
}

/** The "?" cheat sheet, anchored under the control keys. */
function ShortcutSheet({ open }: { open: boolean }) {
  const { content, reducedMotion } = useUI();
  const keys = content.ui.keys;
  const shortcuts: { keys: ReactNode; label: string }[] = [
    { keys: <><Kbd>1</Kbd><span className="opacity-50">–</span><Kbd>6</Kbd></>, label: keys.sections },
    { keys: <><Kbd>J</Kbd><Kbd>K</Kbd></>, label: keys.nextPrev },
    { keys: <><Kbd>↑</Kbd><Kbd>↓</Kbd><Kbd>space</Kbd></>, label: keys.scroll },
    { keys: <Kbd>esc</Kbd>, label: keys.top },
    { keys: <Kbd>R</Kbd>, label: keys.resume },
    { keys: <Kbd>T</Kbd>, label: keys.theme },
    { keys: <Kbd>L</Kbd>, label: keys.language },
    { keys: <><Kbd>/</Kbd><span className="opacity-50">·</span><Kbd>⌘K</Kbd></>, label: keys.palette },
    { keys: <Kbd>?</Kbd>, label: keys.help },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label={keys.title}
          initial={reducedMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.19, 1, 0.22, 1] }}
          className="absolute right-0 top-[calc(100%+10px)] w-[340px] origin-top-right rounded-2xl border border-line bg-bg-elev p-5 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.7)]"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{keys.hint}</p>
          <p className="mt-1 font-display text-xl font-semibold tracking-tight">{keys.title}</p>
          <dl className="mt-4 space-y-2.5">
            {shortcuts.map((s) => (
              <div key={s.label} className="flex items-center justify-between gap-4 text-sm">
                <dt className="text-muted">{s.label}</dt>
                <dd className="flex flex-none items-center gap-1">{s.keys}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
