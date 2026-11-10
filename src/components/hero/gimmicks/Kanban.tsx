"use client";

import { LayoutGroup, motion } from "motion/react";
import { useRef, useState } from "react";
import type { SiteContent } from "@/content";
import { getGimmickCopy } from "@/content/gimmicks";
import { INK, PAPER } from "./shared";

/** A tiny To do / Doing / Done board. Cards can be dragged between columns. */
export function KanbanGimmick({ content }: { content: SiteContent }) {
  const t = getGimmickCopy(content.locale).kanban;
  const [cards, setCards] = useState(t.cards);
  const columns = useRef<(HTMLDivElement | null)[]>([]);

  const drop = (id: string, x: number) => {
    const target = columns.current.findIndex((el) => {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return x >= r.left && x <= r.right;
    });
    if (target < 0) return;
    setCards((cs) => {
      const card = cs.find((c) => c.id === id);
      if (!card || card.column === target) return cs;
      return [...cs.filter((c) => c.id !== id), { ...card, column: target as 0 | 1 | 2 }];
    });
  };

  return (
    <LayoutGroup>
      <div className="grid w-[min(100%,500px)] grid-cols-3 gap-2 rounded-[22px] bg-bg-elev/80 p-2 ring-1 ring-line-strong backdrop-blur">
        {t.columns.map((title, col) => {
          const list = cards.filter((c) => c.column === col);
          return (
            <div key={title} ref={(el) => void (columns.current[col] = el)} className="flex min-h-[300px] flex-col gap-2 rounded-2xl bg-surface/60 p-2">
              <p className="flex items-center justify-between px-1 pb-1 pt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                <span className="flex items-center gap-1.5">
                  <span className={`size-1.5 rounded-full ${col === 1 ? "bg-accent" : col === 2 ? "bg-fg/40" : "bg-line-strong"}`} />
                  {title}
                </span>
                <span>{list.length}</span>
              </p>
              {list.map((c, i) => (
                <motion.div
                  key={c.id}
                  layoutId={c.id}
                  layout
                  drag
                  dragSnapToOrigin
                  onDragEnd={(e, info) => drop(c.id, info.point.x - window.scrollX)}
                  whileDrag={{ scale: 1.06, rotate: -3, zIndex: 50, boxShadow: "0 24px 40px -16px rgb(0 0 0 / 0.7)" }}
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  className={`relative cursor-grab touch-none select-none rounded-xl px-3 py-2.5 text-[13px] font-medium leading-snug shadow-[0_6px_14px_-8px_rgb(0_0_0/0.6)] active:cursor-grabbing ${
                    col === 2 ? "line-through decoration-1 opacity-70" : ""
                  }`}
                  style={{ background: col === 1 && i === 0 ? "var(--accent)" : PAPER, color: col === 1 && i === 0 ? "var(--on-accent)" : INK }}
                >
                  {c.text}
                </motion.div>
              ))}
            </div>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
