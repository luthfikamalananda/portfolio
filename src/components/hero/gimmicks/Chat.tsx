"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/content";
import { getGimmickCopy } from "@/content/gimmicks";
import { photos } from "@/content/shared";
import { asset } from "@/lib/site";
import { useUI } from "../../UIProvider";
import { useIntroBase } from "./shared";

type Msg = { id: number; from: "me" | "visitor"; text: string };

/** A little chat that starts by itself, then lets the Visitor pick what to ask next. */
export function ChatGimmick({ content, compact = false }: { content: SiteContent; compact?: boolean }) {
  const { owner, locale } = content;
  const t = getGimmickCopy(locale).chat;
  const { reducedMotion } = useUI();
  const base = useIntroBase(0.6);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [asked, setAsked] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const nextId = useRef(0);
  const scroller = useRef<HTMLDivElement>(null);

  const push = (from: Msg["from"], text: string) => setMessages((m) => [...m, { id: nextId.current++, from, text }]);
  const later = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, reducedMotion ? 0 : ms));

  // Opening exchange.
  useEffect(() => {
    const start = base * 1000;
    later(start, () => push("visitor", t.visitor));
    later(start + 500, () => setTyping(true));
    later(start + 1500, () => {
      setTyping(false);
      push("me", t.intro[0]);
    });
    later(start + 1800, () => setTyping(true));
    later(start + 3000, () => {
      setTyping(false);
      push("me", t.intro[1]);
      setReady(true);
    });
    const list = timers.current;
    return () => list.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once per locale
  }, [base, locale]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: reducedMotion ? "auto" : "smooth" });
  }, [messages, typing, reducedMotion]);

  const ask = (id: string) => {
    const r = t.replies.find((x) => x.id === id);
    if (!r || typing) return;
    setAsked((a) => [...a, id]);
    push("visitor", r.ask);
    later(350, () => setTyping(true));
    later(1400, () => {
      setTyping(false);
      push("me", r.answer);
    });
  };

  const remaining = t.replies.filter((r) => !asked.includes(r.id));

  return (
    <div className={`w-[min(100%,390px)] bg-bg-elev shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)] ring-1 ring-line-strong ${compact ? "rounded-[22px] p-2.5" : "rounded-[28px] p-3"}`}>
      <div className="flex items-center gap-3 border-b border-line px-2 pb-3 pt-1">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
        <img src={asset(photos.face)} alt="" className="size-9 rounded-full object-cover" />
        <div className="leading-tight">
          <p className="text-sm font-semibold">{owner.nickname}</p>
          <p className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
            <span className="size-1.5 rounded-full bg-accent" /> online · {owner.location.split(",")[0]}
          </p>
        </div>
      </div>

      <div ref={scroller} aria-live="polite" className={`flex flex-col gap-2 overflow-y-auto px-1 ${compact ? "h-[236px] py-3" : "h-[300px] py-4"}`}>
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.p
              key={m.id}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`max-w-[80%] rounded-[20px] leading-snug ${compact ? "px-3.5 py-2 text-[14px]" : "px-4 py-2.5 text-[15px]"} ${
                m.from === "me" ? "self-start rounded-bl-md bg-surface text-fg" : "self-end rounded-br-md bg-accent text-on-accent"
              }`}
            >
              {m.text}
            </motion.p>
          ))}
          {typing && (
            <motion.span
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label={t.typing}
              className="flex w-fit gap-1 self-start rounded-[20px] rounded-bl-md bg-surface px-4 py-3.5"
            >
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-1.5 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="flex min-h-[44px] flex-wrap gap-2 border-t border-line px-1 pt-3">
        {ready &&
          remaining.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => ask(r.id)}
              disabled={typing}
              className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent-ink disabled:opacity-40"
            >
              {r.ask}
            </button>
          ))}
      </div>
    </div>
  );
}
