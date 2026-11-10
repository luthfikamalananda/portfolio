"use client";

import { ArrowDownToLine, X } from "lucide-react";
import { useEffect, useRef, type CSSProperties } from "react";
import { resumeFiles } from "@/content/shared";
import type { Locale } from "@/content/types";
import { asset } from "@/lib/site";
import { useUI } from "./UIProvider";

const v = (name: string, value: number) => ({ [name]: value }) as CSSProperties;
/** Must match the close animation in globals.css: last layer starts at 0.14s and runs 0.55s. */
const CLOSE_MS = 720;

/**
 * Lets the Visitor pick which Locale version of the Resume to download.
 * Opens as a right-hand slide-over: two colour panels sweep in first, then the sheet
 * (the StaggeredMenu opening). Motion lives in globals.css (.slide-over).
 */
export function ResumeDialog() {
  const { content, resumeOpen, setResumeOpen } = useUI();
  const { ui, locale, owner } = content;
  const ref = useRef<HTMLDialogElement>(null);
  const closing = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (resumeOpen) {
      // Re-opened mid-close: cancel the pending close and stay open.
      if (closing.current) {
        clearTimeout(closing.current);
        closing.current = null;
        d.removeAttribute("data-closing");
      }
      if (!d.open) {
        d.showModal();
        // Focus the current-language option without scrolling: it starts off-screen (the sheet slides
        // in from translateX(100%)), and letting the browser scroll it into view cancels the slide.
        d.querySelector<HTMLElement>("[data-current]")?.focus({ preventScroll: true });
      }
    } else if (d.open && !closing.current) {
      // Play the opening in reverse (CSS: .slide-over[data-closing]), then actually close.
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      d.setAttribute("data-closing", "");
      closing.current = setTimeout(
        () => {
          closing.current = null;
          d.removeAttribute("data-closing");
          d.close();
        },
        reduce ? 0 : CLOSE_MS,
      );
    }
  }, [resumeOpen]);

  useEffect(() => () => void (closing.current && clearTimeout(closing.current)), []);

  const options: { locale: Locale; label: string }[] = [
    { locale: "en", label: ui.resume.english },
    { locale: "id", label: ui.resume.indonesian },
  ];
  const slug = owner.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <dialog
      ref={ref}
      aria-labelledby="resume-title"
      onClose={() => setResumeOpen(false)}
      // Esc would close the dialog instantly; route it through the animated close instead.
      onCancel={(e) => {
        e.preventDefault();
        setResumeOpen(false);
      }}
      onClick={(e) => e.target === ref.current && setResumeOpen(false)}
      className="slide-over m-0 h-dvh max-h-none w-full max-w-none overflow-clip border-0 bg-transparent p-0 text-fg"
    >
      <div aria-hidden className="so-layer pointer-events-none absolute inset-y-0 right-0 w-[min(480px,100vw)] bg-[color-mix(in_oklab,var(--accent)_30%,var(--bg))]" style={v("--i", 0)} />
      <div aria-hidden className="so-layer pointer-events-none absolute inset-y-0 right-0 w-[min(480px,100vw)] bg-accent" style={v("--i", 1)} />

      <aside className="so-layer absolute inset-y-0 right-0 flex w-[min(480px,100vw)] flex-col bg-bg-elev px-6 pb-8 pt-6 sm:px-10" style={v("--i", 2)}>
        <div className="so-item flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted" style={v("--j", 0)}>
          <span>{owner.name} — PDF</span>
          <button
            type="button"
            onClick={() => setResumeOpen(false)}
            aria-label={ui.resume.cancel}
            className="grid size-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-line-strong"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-auto">
          <h2 id="resume-title" className="so-item font-display text-4xl font-semibold tracking-tight sm:text-5xl" style={v("--j", 1)}>
            {ui.resume.title}
          </h2>
          <p className="so-item mt-3 text-muted" style={v("--j", 2)}>
            {ui.resume.body}
          </p>

          <ul className="mt-10 border-t border-line">
            {options.map((o, i) => {
              const current = o.locale === locale;
              return (
                <li key={o.locale} className="so-item border-b border-line" style={v("--j", 3 + i)}>
                  <a
                    href={asset(resumeFiles[o.locale])}
                    download={`${slug}-resume-${o.locale}.pdf`}
                    data-current={current ? "" : undefined}
                    onClick={() => setResumeOpen(false)}
                    className="group flex items-baseline gap-4 py-5 outline-offset-[-2px]"
                  >
                    <span className="font-mono text-xs text-accent-ink">0{i + 1}</span>
                    <span className="flex-1">
                      <span className="block font-display text-3xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1.5 sm:text-4xl">
                        {o.label}
                      </span>
                      {current && <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.15em] text-muted">{ui.resume.current}</span>}
                    </span>
                    <ArrowDownToLine className="size-5 self-center text-muted transition-all group-hover:translate-y-0.5 group-hover:text-accent-ink" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </dialog>
  );
}
