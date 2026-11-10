"use client";

import type { SkillGroup } from "@/content/types";
import LogoLoop, { type LogoItem } from "./reactbits/LogoLoop";
import { skillIcons } from "./icons";
import { useUI } from "./UIProvider";

export function SkillMarquee({ groups }: { groups: SkillGroup[] }) {
  const { reducedMotion } = useUI();
  const logos: LogoItem[] = groups
    .flatMap((g) => g.skills)
    .filter((s) => s.icon && skillIcons[s.icon])
    .map((s) => {
      const Icon = skillIcons[s.icon!];
      return { node: <Icon aria-hidden />, title: s.name, ariaLabel: s.name, hoverColor: "var(--accent)" };
    });

  return (
    <div className="-mx-4 text-muted sm:-mx-8">
      <LogoLoop
        logos={logos}
        speed={reducedMotion ? 0 : 60}
        logoHeight={36}
        gap={56}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="var(--bg)"
        labels="hover"
        ariaLabel="Skills"
      />
    </div>
  );
}
