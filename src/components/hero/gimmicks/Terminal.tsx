"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/content";
import { getGimmickCopy } from "@/content/gimmicks";
import { useUI } from "../../UIProvider";
import { useIntroBase } from "./shared";

type Line = { kind: "in" | "out"; text: string };
const PROMPT = "lompii@jkt ~ %";

/** A small terminal Visitors can type into. It introduces itself by running `whoami`. */
export function TerminalGimmick({ content }: { content: SiteContent }) {
  const t = getGimmickCopy(content.locale).terminal;
  const { reducedMotion } = useUI();
  const base = useIntroBase(0.6);
  const [lines, setLines] = useState<Line[]>([{ kind: "out", text: t.welcome }]);
  const [value, setValue] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const body = useRef<HTMLDivElement>(null);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const out = t.commands[cmd] ?? `${t.notFound} ${cmd}`;
    setLines((l) => [...l, { kind: "in", text: cmd }, { kind: "out", text: out }]);
  };

  // Self-introduction: type "whoami" one character at a time.
  useEffect(() => {
    if (reducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reduced motion: show the result at once
      setLines([{ kind: "out", text: t.welcome }, { kind: "in", text: "whoami" }, { kind: "out", text: t.commands.whoami }]);
      return;
    }
    const word = "whoami";
    const timers: ReturnType<typeof setTimeout>[] = [];
    [...word].forEach((_, i) => timers.push(setTimeout(() => setValue(word.slice(0, i + 1)), base * 1000 + 400 + i * 110)));
    timers.push(
      setTimeout(() => {
        setValue("");
        setLines([{ kind: "out", text: t.welcome }, { kind: "in", text: word }, { kind: "out", text: t.commands.whoami }]);
      }, base * 1000 + 400 + word.length * 110 + 350),
    );
    return () => timers.forEach(clearTimeout);
  }, [base, reducedMotion, t]);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [lines]);

  return (
    <div
      onClick={() => input.current?.focus()}
      className="w-[min(100%,500px)] overflow-hidden rounded-xl bg-[#0d0d0e] font-mono text-[13px] text-[#e7e6e0] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.95)] ring-1 ring-white/10"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="flex-1 text-center text-[11px] text-white/45">lompii.sh — zsh</span>
      </div>
      <div ref={body} className="h-[300px] overflow-y-auto p-4 leading-relaxed">
        {lines.map((l, i) =>
          l.kind === "in" ? (
            <p key={i} className="mt-2">
              <span className="text-accent">{PROMPT}</span> {l.text}
            </p>
          ) : (
            <p key={i} className="whitespace-pre-wrap text-white/70">
              {l.text}
            </p>
          ),
        )}
        <form
          className="mt-2 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            run(value);
            setValue("");
          }}
        >
          <label htmlFor="term-input" className="flex-none text-accent">
            {PROMPT}
          </label>
          <input
            id="term-input"
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-[#e7e6e0] caret-[var(--accent)] outline-none focus-visible:outline-none"
          />
        </form>
      </div>
    </div>
  );
}
