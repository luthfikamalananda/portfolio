"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import type { Project } from "@/content/types";

/** A Project's apps as a numbered list that opens and closes smoothly (closed by default). */
export function ProjectParts({ parts, label }: { parts: NonNullable<Project["parts"]>; label: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="border-t border-line pt-4">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 text-left text-sm font-medium text-fg"
      >
        {label}
        <ChevronDown aria-hidden className={`size-4 text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {/* 0fr ↔ 1fr animates the height to fit its content. */}
      <div
        id={id}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <ol className="min-h-0 space-y-3 overflow-hidden pt-4">
          {parts.map((part, i) => (
            <li key={part.name} className="grid grid-cols-[auto_1fr] gap-x-3 text-sm">
              <span className="font-mono text-xs leading-5 text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="font-medium text-fg">{part.name}</p>
                <p className="mt-0.5 text-muted">{part.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
