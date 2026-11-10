"use client";

import { useUI } from "./UIProvider";

export function Toast() {
  const { toast } = useUI();
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4">
      {toast && (
        <p className="rounded-full border border-line-strong bg-bg-elev px-5 py-3 text-sm text-fg shadow-2xl">{toast}</p>
      )}
    </div>
  );
}
