"use client";

import { useLayoutEffect, type RefObject } from "react";

/**
 * Sizes `ref`'s font so its widest `[data-fit-row]` child spans the element's width exactly
 * (edge-to-edge type). Re-fits on resize and once web fonts have loaded.
 */
export function useFitToWidth(ref: RefObject<HTMLElement | null>, max = Infinity) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      el.style.fontSize = "100px";
      const rows = Array.from(el.querySelectorAll<HTMLElement>("[data-fit-row]"));
      const widest = Math.max(...rows.map((r) => r.getBoundingClientRect().width));
      if (!widest) return;
      el.style.fontSize = `${Math.min(max, Math.floor((100 * el.clientWidth) / widest) - 1)}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [ref, max]);
}
