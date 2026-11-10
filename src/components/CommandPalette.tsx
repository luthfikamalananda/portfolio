"use client";

import {
  ArrowRight,
  Copy,
  CornerDownLeft,
  FileDown,
  Languages,
  PartyPopper,
  Search,
  SunMoon,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { localePath } from "@/content";
import { navigateWithCurtain } from "@/lib/curtain";
import { asset } from "@/lib/site";
import { socialIcons } from "./icons";
import { useUI } from "./UIProvider";

interface PaletteItem {
  id: string;
  group: "navigate" | "actions" | "links";
  label: string;
  keywords?: string;
  icon: LucideIcon | IconType;
  run: () => void;
}

/** ⌘K command palette — navigation, actions, links, and one easter egg ("party"). */
export function CommandPalette() {
  const ui = useUI();
  const { content, paletteOpen, setPaletteOpen } = ui;
  const { ui: copy, owner, locale } = content;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (paletteOpen && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!paletteOpen && dialog.open) {
      dialog.close();
    }
  }, [paletteOpen]);

  const items = useMemo<PaletteItem[]>(() => {
    const close = () => setPaletteOpen(false);
    const go = (hash: string) => () => {
      close();
      document.querySelector(hash)?.scrollIntoView({ behavior: ui.reducedMotion ? "auto" : "smooth" });
    };
    const other = locale === "en" ? "id" : "en";
    const sections = ["about", "skills", "projects", "journey", "beyond", "contact"] as const;

    return [
      ...sections.map<PaletteItem>((id) => ({
        id: `go-${id}`,
        group: "navigate",
        label: copy.nav[id],
        keywords: id,
        icon: ArrowRight,
        run: go(`#${id}`),
      })),
      { id: "theme", group: "actions", label: copy.palette.toggleTheme, keywords: "dark light mode tema", icon: SunMoon, run: () => ui.toggleTheme() },
      {
        id: "locale",
        group: "actions",
        label: copy.palette.switchLocale,
        keywords: "language bahasa english indonesia",
        icon: Languages,
        run: () => {
          setPaletteOpen(false);
          navigateWithCurtain(asset(localePath(other)));
        },
      },
      { id: "email", group: "actions", label: copy.palette.copyEmail, keywords: "mail contact kontak", icon: Copy, run: () => { close(); void ui.copyEmail(); } },
      {
        id: "resume",
        group: "actions",
        label: copy.palette.downloadResume,
        keywords: "cv resume pdf",
        icon: FileDown,
        run: () => {
          close();
          ui.setResumeOpen(true);
        },
      },
      { id: "party", group: "actions", label: copy.palette.party, keywords: "party confetti fun pesta", icon: PartyPopper, run: () => { close(); ui.toggleParty(); } },
      ...owner.socials.map<PaletteItem>((s) => ({
        id: `link-${s.kind}`,
        group: "links",
        label: s.label,
        keywords: s.kind,
        icon: socialIcons[s.kind],
        run: () => {
          close();
          window.open(s.href, "_blank", "noopener,noreferrer");
        },
      })),
    ];
  }, [copy, owner.socials, locale, setPaletteOpen, ui]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.keywords ?? ""}`.toLowerCase().includes(q));
  }, [items, query]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[cursor]?.run();
    }
  };

  const groups = (["navigate", "actions", "links"] as const)
    .map((g) => ({ g, rows: filtered.filter((i) => i.group === g) }))
    .filter((x) => x.rows.length);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command palette"
      onClose={() => {
        setPaletteOpen(false);
        setQuery("");
        setCursor(0);
      }}
      onClick={(e) => e.target === dialogRef.current && setPaletteOpen(false)}
      className="m-auto mt-[12vh] w-[min(560px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line-strong bg-bg-elev p-0 text-fg shadow-2xl backdrop:bg-black/50"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search className="size-4 text-muted" aria-hidden />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCursor(0);
          }}
          onKeyDown={onKeyDown}
          placeholder={copy.palette.placeholder}
          aria-label={copy.palette.placeholder}
          aria-activedescendant={filtered[cursor] ? `pal-${filtered[cursor].id}` : undefined}
          aria-controls="palette-list"
          role="combobox"
          aria-expanded
          className="h-14 flex-1 bg-transparent text-base outline-none focus-visible:outline-none placeholder:text-faint"
        />
        <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
      </div>
      <div id="palette-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
        {filtered.length === 0 && <p className="px-3 py-8 text-center text-sm text-muted">{copy.palette.empty}</p>}
        {groups.map(({ g, rows }) => (
          <div key={g} className="mb-1">
            <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">{copy.palette.groups[g]}</p>
            {rows.map((item) => {
              const index = filtered.indexOf(item);
              const selected = index === cursor;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`pal-${item.id}`}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onMouseMove={() => setCursor(index)}
                  onClick={item.run}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    selected ? "bg-accent text-on-accent" : "text-fg"
                  }`}
                >
                  <Icon className="size-4 flex-none" aria-hidden />
                  <span className="flex-1">{item.label}</span>
                  {selected && <CornerDownLeft className="size-3.5" aria-hidden />}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <p className="flex items-center gap-2 border-t border-line px-4 py-2.5 font-mono text-[10px] text-faint">
        <kbd className="rounded border border-line px-1">↑</kbd>
        <kbd className="rounded border border-line px-1">↓</kbd> {copy.palette.hint}
      </p>
    </dialog>
  );
}
