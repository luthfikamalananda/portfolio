"use client";

import { useUI } from "./UIProvider";

/**
 * Quiet background texture behind the whole page (pattern + soft accent light).
 * Styles live in globals.css (.site-texture); kept faint so text stays readable.
 */
export function SiteTexture() {
  const { texture } = useUI();
  return <div aria-hidden className="site-texture" data-texture={texture} />;
}
