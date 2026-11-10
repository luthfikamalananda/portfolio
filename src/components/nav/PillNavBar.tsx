"use client";

import PillNav, { type PillNavItem } from "../reactbits/PillNav";
import { useUI } from "../UIProvider";
import { NAV_SECTIONS, NavControls, initialsOf, useActiveSection } from "./shared";

/** Shared PillNav props. */
function usePillProps() {
  const { content, theme } = useUI();
  const active = useActiveSection();
  const items: PillNavItem[] = NAV_SECTIONS.map((id) => ({ label: content.ui.nav[id], href: `#${id}` }));
  return {
    logo: <span className="font-display text-sm font-bold">{initialsOf(content.owner.name)}</span>,
    logoAlt: content.owner.name,
    logoHref: "#top",
    items,
    activeHref: active ? `#${active}` : "#top",
    theme,
    surface: "glass" as const,
    hoverEffect: "glide" as const,
    indicator: "dot" as const,
    highlightColor: "var(--accent)",
    highlightTextColor: "var(--on-accent)",
    size: "md" as const,
    ariaLabel: "Main",
  };
}

/**
 * The phone/tablet pill bar: PillNav collapsed from the first paint, plus the controls.
 */
export function PillBarMobile({ className = "" }: { className?: string }) {
  const common = usePillProps();
  return (
    <header className={`fixed inset-x-0 top-0 z-50 flex items-start justify-between gap-3 px-4 pt-4 sm:px-6 ${className}`}>
      <div className="min-w-0 flex-1">
        <PillNav {...common} collapse="always" />
      </div>
      <NavControls className="flex-none" palette={false} />
    </header>
  );
}

/** Floating pill bar at the top. */
export function PillNavBar() {
  const common = usePillProps();
  return (
    <>
      {/* Two navs switched by CSS: PillNav's "auto" collapse is measured in JS, so the server always
          renders it expanded — on phones that overflowed onto the controls until hydration (worst on
          a Locale switch, which is a full reload). Below lg it is collapsed from the first paint. */}
      <PillBarMobile className="lg:hidden" />
      <header className="fixed inset-x-0 top-0 z-50 hidden items-start justify-between gap-3 px-6 pt-4 lg:flex">
        <div className="flex min-w-0 flex-1 justify-center pl-32">
          <PillNav {...common} collapse="auto" />
        </div>
        <NavControls className="flex-none" />
      </header>
    </>
  );
}
