"use client";

import { Command, FileDown, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { localePath, type SiteContent } from "@/content";
import { curtainClick } from "@/lib/curtain";
import { asset } from "@/lib/site";
import { useUI } from "../UIProvider";

/** Sections that appear in the main navigation, in page order. */
export const NAV_SECTIONS = ["about", "skills", "projects", "journey", "contact"] as const;

/** Every Section, numbered exactly like their "01 — About" labels. Used by the indexed navs. */
export const ALL_SECTIONS = ["about", "skills", "projects", "journey", "beyond", "contact"] as const;
export type NavSection = (typeof ALL_SECTIONS)[number];

/** Tracks which Section is in view. `undefined` while the Hero is on screen. */
export function useActiveSection(ids: readonly NavSection[] = NAV_SECTIONS): NavSection | undefined {
  const [active, setActive] = useState<NavSection | undefined>(undefined);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as NavSection);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const topObserver = new IntersectionObserver(([e]) => e.isIntersecting && setActive(undefined), {
      rootMargin: "0px 0px -60% 0px",
    });
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const top = document.getElementById("top");
    if (top) topObserver.observe(top);
    return () => {
      observer.disconnect();
      topObserver.disconnect();
    };
  }, [ids]);
  return active;
}

export function initialsOf(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

export function otherLocaleHref(content: SiteContent) {
  const other = content.locale === "en" ? "id" : "en";
  return { other, href: asset(localePath(other)) } as const;
}

/** ⌘K, theme and locale buttons. `palette={false}` drops ⌘K (the phone-style pill: no use without a keyboard). */
export function NavControls({ className = "", resume = true, palette = true }: { className?: string; resume?: boolean; palette?: boolean }) {
  const { content, theme, toggleTheme, setPaletteOpen, setResumeOpen } = useUI();
  const { ui } = content;
  const { other, href } = otherLocaleHref(content);
  const control =
    "grid size-10 place-items-center rounded-full border border-line bg-bg/60 text-fg backdrop-blur-xl transition-colors hover:border-line-strong";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Resume is one click away from anywhere on the page. */}
      {resume && (
      <button
        type="button"
        onClick={() => setResumeOpen(true)}
        aria-label={ui.contact.resume}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-accent/70 bg-bg/60 px-3 text-sm font-medium text-fg backdrop-blur-xl transition-colors hover:bg-accent hover:text-on-accent sm:px-4"
      >
        <FileDown className="size-4" />
        <span className="hidden sm:inline">{ui.nav.resume}</span>
      </button>
      )}
      {palette && (
        <button type="button" onClick={() => setPaletteOpen(true)} aria-label="Command palette" className={control}>
          <Command className="size-4" />
        </button>
      )}
      <button type="button" onClick={toggleTheme} aria-label={theme === "dark" ? ui.theme.toLight : ui.theme.toDark} className={control}>
        {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>
      <a href={href} hrefLang={other} onClick={curtainClick(href)} aria-label={ui.locale.switchTo} className={`${control} font-mono text-xs font-semibold uppercase`}>
        {other}
      </a>
    </div>
  );
}
