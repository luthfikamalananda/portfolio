"use client";

import type { ReactNode } from "react";
import { accentHex } from "@/lib/site";
import ClickSpark from "./reactbits/ClickSpark";
import { useUI } from "./UIProvider";

/** Easter egg: when party mode is on (⌘K → "party"), every click sparks. */
export function PartyLayer({ children }: { children: ReactNode }) {
  const { party, accent, theme } = useUI();
  return (
    <ClickSpark
      disabled={!party}
      sparkColor={[accentHex[accent][theme], "#ff6b3d", "#8f7bff", "#2de2e6"]}
      sparkCount={14}
      sparkRadius={48}
      sparkSize={12}
      ring
      className="h-auto!"
    >
      {children}
    </ClickSpark>
  );
}
