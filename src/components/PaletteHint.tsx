"use client";

import { useModKey } from "@/lib/usePlatform";
import { useUI } from "./UIProvider";

export function PaletteHint({ label }: { label: string }) {
  const { setPaletteOpen } = useUI();
  const mod = useModKey();
  return (
    <button type="button" onClick={() => setPaletteOpen(true)} className="inline-flex w-fit items-center gap-2 transition-colors hover:text-fg">
      <kbd className="rounded border border-line-strong px-1.5 py-0.5 text-fg">{mod} K</kbd> {label}
    </button>
  );
}
