"use client";

import { useEffect, useState } from "react";

export const SHADOW = "shadow-[0_22px_45px_-18px_rgb(0_0_0/0.75),0_2px_6px_rgb(0_0_0/0.25)]";
export const PAPER = "#f3f2ec";
export const INK = "#141413";

/** Seconds to wait before a gimmick starts its own entrance — longer while the intro curtain plays. */
export function useIntroBase(normal = 0.35) {
  const [base, setBase] = useState(normal);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read a pre-paint DOM flag once
    if (document.documentElement.getAttribute("data-intro") === "play") setBase(normal + 1);
  }, [normal]);
  return base;
}

export const barcode = (ink: string) =>
  `repeating-linear-gradient(90deg, ${ink} 0 2px, transparent 2px 4px, ${ink} 4px 5px, transparent 5px 8px, ${ink} 8px 11px, transparent 11px 13px)`;
