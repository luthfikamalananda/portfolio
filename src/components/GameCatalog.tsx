"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useMemo, useRef, useState } from "react";
import type { SiteContent } from "@/content";
import { gaming } from "@/content/shared";
import { asset } from "@/lib/site";
import { useUI } from "./UIProvider";

type Game = (typeof gaming.games)[number];

/** Official poster, or a typographic card when a game has none yet. */
/** Where the franchise divider rests, as % from the left: the right-hand (newer) game shows 70%. */
const SPLIT_DEFAULT = 30;

/**
 * A franchise's two posters, one over the other with a divider. Interactive: drag (or arrow-key)
 * the divider — all the way left and the right poster wins, all the way right and the left one does.
 */
function SplitPoster({ game, posters, interactive, eager, className }: { game: Game; posters: string[]; interactive: boolean; eager: boolean; className: string }) {
  const [pos, setPos] = useState(SPLIT_DEFAULT);
  const [left, right] = posters;
  const img = "absolute inset-0 size-full object-cover";
  return (
    <span className={`relative block overflow-hidden bg-black ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
      <img src={asset(right)} alt="" loading={eager ? "eager" : "lazy"} draggable={false} className={img} />
      {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
      <img src={asset(left)} alt="" loading={eager ? "eager" : "lazy"} draggable={false} className={img} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
      {/* Divider + knob */}
      <span aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/90 shadow-[0_0_8px_rgb(0_0_0/0.6)]" style={{ left: `${pos}%` }}>
        {interactive && (
          <span className="absolute left-1/2 top-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[11px] font-bold text-black shadow-[0_2px_10px_rgb(0_0_0/0.5)]">
            ‹›
          </span>
        )}
      </span>
      {interactive && (
        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={game.title}
          className="absolute inset-0 z-[5] size-full cursor-ew-resize opacity-0"
        />
      )}
    </span>
  );
}

function Poster({ game, className = "", eager = false, interactive = false }: { game: Game; className?: string; eager?: boolean; interactive?: boolean }) {
  if (game.posters && game.posters.length > 1) {
    return <SplitPoster game={game} posters={game.posters} interactive={interactive} eager={eager} className={className} />;
  }
  if (game.poster) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static export
      <img src={asset(game.poster)} alt={game.title} loading={eager ? "eager" : "lazy"} draggable={false} className={`object-cover ${className}`} />
    );
  }
  return (
    <span
      role="img"
      aria-label={game.title}
      className={`flex flex-col justify-end bg-[radial-gradient(120%_80%_at_50%_0%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_70%),linear-gradient(180deg,var(--surface),var(--bg))] p-4 ${className}`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">{game.years ?? game.year}</span>
      <span className="mt-1 font-display text-xl font-semibold leading-tight tracking-tight text-fg">{game.title}</span>
    </span>
  );
}

function Meta({ game, content, className = "" }: { game: Game; content: SiteContent; className?: string }) {
  return (
    <span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${className}`}>
      {game.kind ? `${content.ui.beyond.gameKinds[game.kind]} · ` : ""}
      {game.years ?? game.year}
    </span>
  );
}

/**
 * Accordion gallery: panels side by side (stacked on phones); the open one widens to show poster + note.
 * `fit="fill"` shares the row between all panels; `fit="scroll"` gives each panel a fixed width so any
 * number of games scrolls sideways instead of squeezing.
 */
function AccordionStrip({
  content,
  games,
  fit = "fill",
  open: openProp,
  onOpen,
  titleOnly = false,
  height = "",
}: {
  content: SiteContent;
  games: Game[];
  fit?: "fill" | "scroll";
  /** Controlled mode: the parent owns which panel is open (e.g. to show its review beside it). */
  open?: number;
  onOpen?: (i: number) => void;
  /** Only meta + title on the open panel; the note lives elsewhere. */
  titleOnly?: boolean;
  /** Overrides the strip height classes. */
  height?: string;
}) {
  const [openSelf, setOpenSelf] = useState(0);
  const open = openProp ?? openSelf;
  const setOpen = (i: number) => (onOpen ? onOpen(i) : setOpenSelf(i));
  const notes = content.beyond.play.notes;
  const scroll = fit === "scroll";
  return (
    <ul
      className={
        scroll
          ? `-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:thin] ${height || "h-[440px]"}`
          : `flex flex-col gap-2 md:flex-row ${height || "h-[560px] md:h-[420px]"}`
      }
    >
      {games.map((g, i) => {
        const on = i === open;
        return (
          <li
            key={g.id}
            onPointerEnter={() => setOpen(i)}
            className={`group relative min-h-0 min-w-0 overflow-hidden rounded-2xl ring-1 ring-line ease-[cubic-bezier(0.19,1,0.22,1)] ${
              scroll
                ? `flex-none snap-start transition-[width] duration-500 ${on ? "w-[min(78vw,340px)]" : "w-16 sm:w-20"}`
                : `basis-0 transition-[flex-grow] duration-500 ${on ? "grow-[6]" : "grow"}`
            }`}
          >
            <button type="button" onClick={() => setOpen(i)} onFocus={() => setOpen(i)} aria-expanded={on} className="absolute inset-0 text-left">
              <Poster game={g} className={`absolute inset-0 size-full transition-[filter,transform] duration-700 ${on ? "" : "scale-110 grayscale-[0.6] brightness-[0.55]"}`} />
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              {/* Collapsed: the title runs vertically (across on phones in "fill"). */}
              <span
                className={`absolute truncate font-display text-sm font-semibold text-white transition-opacity duration-300 ${
                  scroll
                    ? "bottom-4 left-1/2 max-h-[85%] -translate-x-1/2 rotate-180 [writing-mode:vertical-rl]"
                    : "bottom-3 left-3 right-3 md:bottom-4 md:left-1/2 md:right-auto md:max-h-[85%] md:-translate-x-1/2 md:rotate-180 md:[writing-mode:vertical-rl]"
                } ${on ? "opacity-0" : "opacity-90"}`}
              >
                {g.title}
              </span>
              <span className={`absolute inset-x-0 bottom-0 p-5 transition-[opacity,translate] duration-500 ${on ? "translate-y-0 opacity-100 delay-150" : "pointer-events-none translate-y-3 opacity-0"}`}>
                <Meta game={g} content={content} className="text-white/70" />
                <span className="mt-1 block font-display text-2xl font-semibold leading-tight tracking-tight text-white">{g.title}</span>
                {!titleOnly && <span className="mt-1.5 block max-w-[40ch] text-sm text-white/80">{notes[g.id]}</span>}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

const pill = (on: boolean) =>
  `rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
    on ? "border-accent bg-accent text-on-accent" : "border-line-strong text-muted hover:border-fg hover:text-fg"
  }`;

/** Accordion, paged: at most `PAGE` panels at once, with arrows and a page counter. */
const PAGE = 5;
function AccordionPaged({ content }: { content: SiteContent }) {
  const [page, setPage] = useState(0);
  const pages = Math.ceil(gaming.games.length / PAGE);
  const go = (d: number) => setPage((p) => (p + d + pages) % pages);
  return (
    <div>
      <AccordionStrip key={page} content={content} games={gaming.games.slice(page * PAGE, page * PAGE + PAGE)} />
      {pages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-[11px] tabular-nums text-faint">
            {String(page + 1).padStart(2, "0")} / {String(pages).padStart(2, "0")}
          </span>
          <span className="flex gap-2">
            <button type="button" onClick={() => go(-1)} aria-label="Previous" className={pill(false)}>←</button>
            <button type="button" onClick={() => go(1)} aria-label="Next" className={pill(false)}>→</button>
          </span>
        </div>
      )}
    </div>
  );
}

/** Accordion, filtered: Story / Gameplay chips split the list, so each view stays short. */
function AccordionFilter({ content }: { content: SiteContent }) {
  const [kind, setKind] = useState<NonNullable<Game["kind"]>>("favorite");
  const labels = content.ui.beyond.gameKinds;
  const list = gaming.games.filter((g) => g.kind === kind);
  return (
    <div>
      <div className="mb-4 flex gap-2">
        {(["favorite", "recommended"] as const).map((k) => (
          <button key={k} type="button" onClick={() => setKind(k)} aria-pressed={kind === k} className={pill(kind === k)}>
            {labels[k]} <span className="opacity-60">{gaming.games.filter((g) => g.kind === k).length}</span>
          </button>
        ))}
      </div>
      <AccordionStrip key={kind} content={content} games={list} />
    </div>
  );
}

/** Filter chips shared by the combo layouts: All / Story / Gameplay, with counts. */
function KindFilter({ content, kind, onKind }: { content: SiteContent; kind: Game["kind"] | "all"; onKind: (k: Game["kind"] | "all") => void }) {
  const labels = { all: content.ui.beyond.gameAll, ...content.ui.beyond.gameKinds };
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {/* "All" comes last, after the categories. */}
      {(["favorite", "recommended", "all"] as const).map((k) => (
        <button key={k} type="button" onClick={() => onKind(k)} aria-pressed={kind === k} className={pill(kind === k)}>
          {labels[k]} <span className="opacity-60">{k === "all" ? gaming.games.length : gaming.games.filter((g) => g.kind === k).length}</span>
        </button>
      ))}
    </div>
  );
}

/** The review panel: title, one-liner, and the Owner's longer take on the game. */
function Review({ content, game, index, total, className = "" }: { content: SiteContent; game: Game; index: number; total: number; className?: string }) {
  const { reducedMotion } = useUI();
  const { notes, reviews } = content.beyond.play;
  return (
    <div aria-live="polite" className={`relative min-h-[220px] overflow-hidden ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={game.id}
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="flex items-baseline justify-between gap-4">
            <Meta game={game} content={content} className="text-faint" />
            <span className="font-mono text-[11px] tabular-nums text-faint">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-2 font-display text-3xl font-semibold leading-[1.05] tracking-tight">{game.title}</p>
          <p className="mt-2 text-accent-ink">{notes[game.id]}</p>
          <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">{reviews[game.id]}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function useFiltered() {
  const [kind, setKindState] = useState<Game["kind"] | "all">("favorite");
  const [open, setOpen] = useState(0);
  const list = kind === "all" ? gaming.games : gaming.games.filter((g) => g.kind === kind);
  const setKind = (k: Game["kind"] | "all") => {
    setKindState(k);
    setOpen(0);
  };
  return { kind, setKind, list, open: Math.min(open, list.length - 1), setOpen };
}

/**
 * Library wall (filter "All"): every game as a dense poster grid, with search and sort.
 * Clicking a poster opens it in the Spotlight.
 */
function LibraryWall({ content, onOpen }: { content: SiteContent; onOpen: (id: string) => void }) {
  const t = content.ui.beyond.wall;
  const { reducedMotion } = useUI();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"year" | "az">("year");
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = gaming.games.filter((g) => !q || g.title.toLowerCase().includes(q));
    return [...list].sort((a, b) => (sort === "az" ? a.title.localeCompare(b.title) : b.year - a.year || a.title.localeCompare(b.title)));
  }, [query, sort]);
  return (
    <div>
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        className="mb-5 flex flex-wrap items-center gap-3"
      >
        <p className="font-display text-2xl font-semibold tracking-tight">
          {gaming.games.length} <span className="text-muted">{t.count}</span>
        </p>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search}
            aria-label={t.search}
            className="h-9 w-44 rounded-full border border-line-strong bg-transparent px-4 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent"
          />
          {(["year", "az"] as const).map((k) => (
            <button key={k} type="button" onClick={() => setSort(k)} aria-pressed={sort === k} className={pill(sort === k)}>
              {k === "year" ? t.sortYear : t.sortAZ}
            </button>
          ))}
        </div>
      </motion.div>
      {shown.length === 0 ? (
        <p className="py-16 text-center text-muted">{t.empty}</p>
      ) : (
        <motion.ul layout className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          <AnimatePresence>
            {shown.map((g, i) => (
              <motion.li
                key={g.id}
                layout
                initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                // Entrance cascades row by row; later changes (search, sort) settle together.
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1], delay: Math.min(i * 0.025, 0.45) }}
              >
                <button type="button" onClick={() => onOpen(g.id)} aria-label={g.title} className="group block w-full text-left transition-transform duration-300 hover:-translate-y-1">
                  {/* Shares a layoutId with the Spotlight poster: picking a game flies it into place. */}
                  <motion.span
                    layoutId={`wall-${g.id}`}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    className="block overflow-hidden rounded-lg shadow-[0_12px_24px_-16px_rgb(0_0_0/0.9)] ring-1 ring-line transition-[box-shadow] duration-300 group-hover:ring-accent"
                  >
                    <Poster game={g} className="aspect-[2/3] w-full [&>span:last-child]:text-sm" />
                  </motion.span>
                  <span className="mt-1.5 block truncate text-xs text-muted transition-colors group-hover:text-fg">{g.title}</span>
                  <span className="block font-mono text-[10px] text-faint">{g.years ?? g.year}</span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}

/** Combo, side by side: filter → accordion on the left, the review on the right (below on phones). */
function ComboSide({ content }: { content: SiteContent }) {
  const { kind, setKind, list, open, setOpen } = useFiltered();
  return (
    // A floor for the height: switching between the wall and the spotlight would otherwise grow and
    // shrink the section, and the sticky Player Card beside it gets shoved around.
    <div className="md:min-h-[640px]">
      <KindFilter content={content} kind={kind} onKind={setKind} />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-center">
        <AccordionStrip key={kind} content={content} games={list} fit="scroll" open={open} onOpen={setOpen} titleOnly height="h-[400px] lg:h-[460px]" />
        <Review content={content} game={list[open]} index={open} total={list.length} />
      </div>
    </div>
  );
}

/** Combo, stage: filter → a full-width accordion → the review underneath, with ← → to step. */
function ComboStage({ content }: { content: SiteContent }) {
  const { kind, setKind, list, open, setOpen } = useFiltered();
  const step = (d: number) => setOpen((open + d + list.length) % list.length);
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <KindFilter content={content} kind={kind} onKind={setKind} />
        <span className="flex gap-2">
          <button type="button" onClick={() => step(-1)} aria-label="Previous" className={pill(false)}>←</button>
          <button type="button" onClick={() => step(1)} aria-label="Next" className={pill(false)}>→</button>
        </span>
      </div>
      <AccordionStrip key={kind} content={content} games={list} fit="scroll" open={open} onOpen={setOpen} titleOnly height="h-[360px]" />
      <Review content={content} game={list[open]} index={open} total={list.length} className="mt-6 border-t border-line pt-6" />
    </div>
  );
}

type PickerProps = { list: Game[]; open: number; onPick: (i: number) => void };

/** Picker "thumbs": a plain row of small posters. */
function PickThumbs({ list, open, onPick }: PickerProps) {
  return (
    <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 pt-1 [scrollbar-width:thin] md:flex-wrap md:overflow-visible">
      {list.map((game, i) => (
        <li key={game.id} className="flex-none">
          <button
            type="button"
            onClick={() => onPick(i)}
            aria-pressed={i === open}
            aria-label={game.title}
            className={`block w-14 overflow-hidden rounded-lg ring-offset-2 ring-offset-bg transition-[transform,opacity] hover:-translate-y-0.5 sm:w-16 ${
              i === open ? "ring-2 ring-accent" : "opacity-60 ring-1 ring-line hover:opacity-100"
            }`}
          >
            <Poster game={game} className="aspect-[2/3] w-full [&>span:last-child]:text-[9px]" />
          </button>
        </li>
      ))}
    </ul>
  );
}

/** Picker "slivers": a mini accordion — thin poster slices that open up on hover, the picked one stays open. */
function PickSlivers({ list, open, onPick }: PickerProps) {
  const [hover, setHover] = useState<number | null>(null);
  const wide = hover ?? open;
  return (
    <ul className="flex h-24 gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]" onPointerLeave={() => setHover(null)}>
      {list.map((game, i) => (
        <li
          key={game.id}
          onPointerEnter={() => setHover(i)}
          className={`relative flex-none overflow-hidden rounded-lg transition-[width] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${wide === i ? "w-16" : "w-6"}`}
        >
          <button type="button" onClick={() => onPick(i)} aria-pressed={i === open} aria-label={game.title} className="absolute inset-0">
            <Poster
              game={game}
              className={`absolute inset-y-0 left-1/2 h-full w-16 max-w-none -translate-x-1/2 transition-[filter] duration-500 [&>span]:hidden ${
                i === open ? "" : "brightness-[0.6] grayscale-[0.7]"
              }`}
            />
            {i === open && <span className="absolute inset-x-1.5 bottom-1.5 h-[3px] rounded-full bg-accent" />}
          </button>
        </li>
      ))}
    </ul>
  );
}

/** One icon of the dock; grows with the pointer's closeness. */
function DockItem({ game, on, mouseX, onPick }: { game: Game; on: boolean; mouseX: MotionValue<number>; onPick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const dist = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect();
    return r ? x - (r.left + r.width / 2) : Infinity;
  });
  const width = useSpring(useTransform(dist, [-140, 0, 140], [48, 88, 48], { clamp: true }), { stiffness: 320, damping: 24, mass: 0.2 });
  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onPick}
      aria-pressed={on}
      aria-label={game.title}
      style={{ width }}
      className={`relative block flex-none overflow-hidden rounded-lg ${on ? "ring-2 ring-accent ring-offset-2 ring-offset-bg" : "ring-1 ring-line"}`}
    >
      <Poster game={game} className="aspect-[2/3] w-full [&>span:last-child]:text-[8px]" />
    </motion.button>
  );
}

/**
 * Picker "dock": macOS-dock magnification — posters swell as the pointer passes over them.
 * Shows the whole (filtered) list; long lists live in the library wall instead. The row isn't
 * clipped, so the magnified posters spill into the free space on the right rather than hiding one.
 */
function PickDock({ list, open, onPick }: PickerProps) {
  const mouseX = useMotionValue(Infinity);
  return (
    <div onPointerMove={(e) => mouseX.set(e.clientX)} onPointerLeave={() => mouseX.set(Infinity)} className="flex h-[140px] items-end gap-2 px-1 pb-1">
      {list.map((game, i) => (
        <DockItem key={game.id} game={game} on={i === open} mouseX={mouseX} onPick={() => onPick(i)} />
      ))}
    </div>
  );
}

/** Picker "fan": a hand of cards; hovering spreads the hand, the picked card is lifted. */
function PickFan({ list, open, onPick }: PickerProps) {
  const mid = (list.length - 1) / 2;
  return (
    <ul className="group/fan flex h-[132px] items-end pl-2 pt-4">
      {list.map((game, i) => {
        const on = i === open;
        const off = i - mid;
        return (
          <li
            key={game.id}
            style={{ "--r": `${off * 5}deg`, "--y": `${Math.abs(off) * 3}px`, zIndex: on ? 40 : 10 + i } as React.CSSProperties}
            className="-ml-7 flex-none origin-bottom transition-[margin,transform] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] first:ml-0 [transform:rotate(var(--r))_translateY(var(--y))] group-hover/fan:-ml-1 hover:!-translate-y-3 hover:![transform:rotate(0)_translateY(-10px)]"
          >
            <button
              type="button"
              onClick={() => onPick(i)}
              aria-pressed={on}
              aria-label={game.title}
              className={`block w-16 overflow-hidden rounded-lg shadow-[0_10px_20px_-8px_rgb(0_0_0/0.7)] transition-transform duration-300 ${
                on ? "-translate-y-4 ring-2 ring-accent" : "ring-1 ring-line"
              }`}
            >
              <Poster game={game} className="aspect-[2/3] w-full [&>span:last-child]:text-[8px]" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** Picker "coverflow": a 3D carousel — the picked poster faces you, the rest turn away; arrows step. */
function PickCoverflow({ list, open, onPick }: PickerProps) {
  const { reducedMotion } = useUI();
  const step = (d: number) => onPick((open + d + list.length) % list.length);
  return (
    <div className="flex items-center gap-3">
      <button type="button" onClick={() => step(-1)} aria-label="Previous" className={pill(false)}>←</button>
      <ul className="relative h-[120px] w-[260px] [perspective:600px]">
        {list.map((game, i) => {
          const d = i - open;
          const far = Math.abs(d) > 3;
          return (
            <motion.li
              key={game.id}
              className="absolute left-1/2 top-0 w-20"
              style={{ zIndex: 50 - Math.abs(d), pointerEvents: far ? "none" : "auto" }}
              animate={{
                x: `calc(-50% + ${d === 0 ? 0 : Math.sign(d) * (34 + Math.abs(d) * 26)}px)`,
                rotateY: d === 0 ? 0 : -Math.sign(d) * 55,
                scale: d === 0 ? 1 : 0.82,
                opacity: far ? 0 : 1 - Math.abs(d) * 0.15,
              }}
              transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 26 }}
            >
              <button
                type="button"
                onClick={() => onPick(i)}
                aria-pressed={d === 0}
                aria-label={game.title}
                tabIndex={far ? -1 : 0}
                className={`block w-full overflow-hidden rounded-lg shadow-[0_14px_24px_-12px_rgb(0_0_0/0.8)] ${d === 0 ? "ring-2 ring-accent" : "ring-1 ring-line"}`}
              >
                <Poster game={game} className="aspect-[2/3] w-full [&>span:last-child]:text-[8px]" />
              </button>
            </motion.li>
          );
        })}
      </ul>
      <button type="button" onClick={() => step(1)} aria-label="Next" className={pill(false)}>→</button>
    </div>
  );
}

/** The Spotlight's game picker. Style from lib/site.ts (`picker`), or `?picker=` in dev. */
function Picker(props: PickerProps) {
  const { picker } = useUI();
  const P = { slivers: PickSlivers, dock: PickDock, fan: PickFan, coverflow: PickCoverflow, thumbs: PickThumbs }[picker];
  return (
    <div className="mt-6">
      <P {...props} />
    </div>
  );
}

/**
 * Spotlight: filter chips, one big poster, and beside it a tall text column (one-liner + the Owner's
 * review) with the thumbnails to pick from pinned to its bottom-left corner.
 */
function Spotlight({ content }: { content: SiteContent }) {
  const { reducedMotion } = useUI();
  const filtered = useFiltered();
  const { kind } = filtered;
  // "All": the library wall first; picking a poster opens it here, stepping through every game.
  const [pick, setPick] = useState<string | null>(null);
  const inAll = kind === "all";
  const list = inAll ? gaming.games : filtered.list;
  const open = inAll ? Math.max(0, list.findIndex((x) => x.id === pick)) : filtered.open;
  const setOpen = inAll ? (i: number) => setPick(list[i].id) : filtered.setOpen;
  const setKind = (k: Game["kind"] | "all") => {
    setPick(null);
    filtered.setKind(k);
  };
  const g = list[open];
  const step = (d: number) => setOpen((open + d + list.length) % list.length);
  const arrow =
    // Always visible: a narrow dark edge (keeps the artwork clean) and a bold, shadowed chevron.
    "absolute inset-y-0 z-10 flex w-10 items-center text-white transition-transform before:absolute before:inset-0 before:-z-10 before:opacity-70 before:transition-opacity hover:before:opacity-100 [&>svg]:size-6 [&>svg]:drop-shadow-[0_1px_3px_rgb(0_0_0/0.9)] [&>svg]:transition-transform";
  return (
    // A floor for the height: switching between the wall and the spotlight would otherwise grow and
    // shrink the section, and the sticky Player Card beside it gets shoved around.
    <div className="md:min-h-[640px]">
      <KindFilter content={content} kind={kind} onKind={setKind} />
      {inAll && !pick ? (
        <LibraryWall content={content} onOpen={setPick} />
      ) : (
      <motion.div
        key={inAll ? "all" : kind}
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        className="grid gap-6 md:grid-cols-[minmax(0,300px)_1fr] md:gap-10"
      >
        <motion.div
          layoutId={inAll ? `wall-${g.id}` : undefined}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="group/poster relative mx-auto w-full max-w-[300px] self-start overflow-hidden rounded-2xl shadow-[0_30px_50px_-30px_rgb(0_0_0/0.9)] ring-1 ring-line"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={g.id}
              initial={reducedMotion ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Poster game={g} eager interactive className="aspect-[2/3] w-full" />
            </motion.div>
          </AnimatePresence>
          {list.length > 1 && (
            <>
              <button type="button" onClick={() => step(-1)} aria-label="Previous game" className={`${arrow} left-0 justify-start pl-1 before:bg-gradient-to-r before:from-black/45 before:to-transparent hover:[&>svg]:-translate-x-0.5`}>
                <ChevronLeft strokeWidth={2.75} />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next game" className={`${arrow} right-0 justify-end pr-1 before:bg-gradient-to-l before:from-black/45 before:to-transparent hover:[&>svg]:translate-x-0.5`}>
                <ChevronRight strokeWidth={2.75} />
              </button>
              {/* Where you are: dots for short lists, a counter once dots would crowd the poster. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-black/45 to-transparent pb-2.5 pt-6"
              >
                {list.length <= 10 ? (
                  <span className="flex items-center gap-1.5">
                    {list.map((game, i) => (
                      <span
                        key={game.id}
                        className={`h-1.5 rounded-full shadow-[0_0_4px_rgb(0_0_0/0.6)] transition-[width,background-color] duration-300 ${i === open ? "w-4 bg-white" : "w-1.5 bg-white/50"}`}
                      />
                    ))}
                  </span>
                ) : (
                  <span className="font-mono text-[11px] tabular-nums text-white [text-shadow:0_1px_4px_rgb(0_0_0/0.9)]">
                    {String(open + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
                  </span>
                )}
              </span>
            </>
          )}
        </motion.div>
        {/* Text grows to fill the poster's height; the picker sits at the bottom left. */}
        <div className="flex min-w-0 flex-col md:min-h-[450px]">
          <Review content={content} game={g} index={open} total={list.length} className="flex-1" />
          {inAll ? (
            <button type="button" onClick={() => setPick(null)} className={`${pill(false)} mt-6 self-start`}>
              ← {content.ui.beyond.wall.back}
            </button>
          ) : (
            <Picker key={kind} list={list} open={open} onPick={setOpen} />
          )}
        </div>
      </motion.div>
      )}
    </div>
  );
}

/** Shelf: a scroll-snapped row of posters, note under each. */
function Shelf({ content }: { content: SiteContent }) {
  const notes = content.beyond.play.notes;
  return (
    <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin]">
      {gaming.games.map((g) => (
        <li key={g.id} className="group w-[min(46vw,190px)] flex-none snap-start">
          <div className="overflow-hidden rounded-xl shadow-[0_18px_30px_-20px_rgb(0_0_0/0.8)] ring-1 ring-line transition-transform duration-300 group-hover:-translate-y-1.5">
            <Poster game={g} className="aspect-[2/3] w-full" />
          </div>
          <Meta game={g} content={content} className="mt-3 block text-faint" />
          <p className="mt-1 font-display text-base font-semibold leading-tight tracking-tight">{g.title}</p>
          <p className="mt-1 text-sm text-muted">{notes[g.id]}</p>
        </li>
      ))}
    </ul>
  );
}

/** Fan: posters fanned like a hand of cards; the picked one rises and its note shows below. */
function Fan({ content }: { content: SiteContent }) {
  const { reducedMotion } = useUI();
  const [pick, setPick] = useState(0);
  const n = gaming.games.length;
  const g = gaming.games[pick];
  return (
    <div>
      <ul className="relative mx-auto h-[300px] max-w-[720px] sm:h-[340px]">
        {gaming.games.map((game, i) => {
          const off = i - (n - 1) / 2;
          const on = i === pick;
          return (
            <motion.li
              key={game.id}
              className="absolute bottom-0 left-1/2 w-[clamp(110px,22vw,170px)] origin-bottom"
              style={{ zIndex: on ? 50 : 10 + i }}
              animate={{ x: `calc(-50% + ${off * 13}vw)`, rotate: on ? 0 : off * 6, y: on ? -28 : Math.abs(off) * 8 }}
              transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 28 }}
            >
              <button
                type="button"
                onClick={() => setPick(i)}
                onPointerEnter={() => setPick(i)}
                onFocus={() => setPick(i)}
                aria-pressed={on}
                className={`block w-full overflow-hidden rounded-xl shadow-[0_24px_40px_-20px_rgb(0_0_0/0.9)] ring-1 transition-[box-shadow] ${on ? "ring-2 ring-accent" : "ring-line"}`}
              >
                <Poster game={game} className="aspect-[2/3] w-full" />
              </button>
            </motion.li>
          );
        })}
      </ul>
      <div aria-live="polite" className="mx-auto mt-6 max-w-[48ch] text-center">
        <Meta game={g} content={content} className="text-faint" />
        <p className="mt-1 font-display text-2xl font-semibold tracking-tight">{g.title}</p>
        <p className="mt-1 text-muted">{content.beyond.play.notes[g.id]}</p>
      </div>
    </div>
  );
}

/** Grid: posters in a grid; hover (or tap) flips to a dark overlay with the note. */
function Grid({ content }: { content: SiteContent }) {
  const [tapped, setTapped] = useState<string | null>(null);
  const notes = content.beyond.play.notes;
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {gaming.games.map((g) => {
        const on = tapped === g.id;
        return (
          <li key={g.id} className="group relative overflow-hidden rounded-xl ring-1 ring-line">
            <button type="button" onClick={() => setTapped(on ? null : g.id)} aria-expanded={on} className="block w-full text-left">
              <Poster game={g} className="aspect-[2/3] w-full transition-transform duration-700 group-hover:scale-105" />
              <span
                className={`absolute inset-0 flex flex-col justify-end bg-black/75 p-4 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 ${on ? "opacity-100" : "opacity-0"}`}
              >
                <Meta game={g} content={content} className="text-white/60" />
                <span className="mt-1 font-display text-lg font-semibold leading-tight text-white">{g.title}</span>
                <span className="mt-1.5 text-sm text-white/80">{notes[g.id]}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** The game catalog under Story & Stream. Layout from lib/site.ts (`games`), or `?games=` in dev. */
export function GameCatalog({ content }: { content: SiteContent }) {
  const { games } = useUI();
  return (
    <div>
      {games === "combo" ? (
        <ComboSide content={content} />
      ) : games === "combo-stage" ? (
        <ComboStage content={content} />
      ) : games === "accordion-scroll" ? (
        <AccordionStrip content={content} games={gaming.games} fit="scroll" />
      ) : games === "accordion-paged" ? (
        <AccordionPaged content={content} />
      ) : games === "accordion-filter" ? (
        <AccordionFilter content={content} />
      ) : games === "spotlight" ? (
        <Spotlight content={content} />
      ) : games === "shelf" ? (
        <Shelf content={content} />
      ) : games === "fan" ? (
        <Fan content={content} />
      ) : games === "grid" ? (
        <Grid content={content} />
      ) : (
        <AccordionStrip content={content} games={gaming.games} />
      )}
    </div>
  );
}
