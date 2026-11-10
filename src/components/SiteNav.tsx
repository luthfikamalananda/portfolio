"use client";

import { KeyRailNav } from "./nav/KeyRailNav";
import { PillNavBar } from "./nav/PillNavBar";
import { useUI } from "./UIProvider";

/** Main navigation. The style is chosen in lib/site.ts (`nav`), or with `?nav=` in dev. */
export function SiteNav() {
  const { nav } = useUI();
  return nav === "pill" ? <PillNavBar /> : <KeyRailNav />;
}
