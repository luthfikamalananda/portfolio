import { Briefcase, GraduationCap, Users } from "lucide-react";
import type { SiteContent } from "@/content";
import type { MilestoneKind } from "@/content/types";
import { Section } from "./Section";

const kindIcon: Record<MilestoneKind, typeof Briefcase> = {
  work: Briefcase,
  education: GraduationCap,
  organization: Users,
};

const kindStyle: Record<MilestoneKind, string> = {
  work: "bg-fg text-bg",
  education: "bg-accent text-on-accent",
  organization: "border border-line-strong text-fg",
};

export function Journey({ content }: { content: SiteContent }) {
  const { ui, journey } = content;

  return (
    <Section id="journey" index="04" eyebrow={ui.journey.eyebrow} title={ui.journey.title}>
      <ol className="relative">
        {journey.map((m, i) => {
          const Icon = kindIcon[m.kind];
          return (
            <li
              key={`${m.title}-${m.period}`}
              className="group relative grid gap-3 border-t border-line py-8 md:grid-cols-[180px_1fr_auto] md:gap-10 md:py-10"
            >
              <p className="font-mono text-sm text-muted">{m.period}</p>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  {m.title}
                  <span className="text-muted"> @ {m.place}</span>
                </h3>
                <p className="mt-2 max-w-2xl text-muted">{m.summary}</p>
                {m.highlights && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {m.highlights.map((h) => (
                      <li key={h} className="rounded-full bg-bg-elev px-3 py-1 text-sm">
                        <span className="text-accent-ink">↗</span> {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex items-start gap-2 md:justify-end">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs ${kindStyle[m.kind]}`}>
                  <Icon className="size-3.5" aria-hidden /> {ui.journey.kinds[m.kind]}
                </span>
              </div>
              {i === journey.length - 1 && <span className="absolute inset-x-0 bottom-0 h-px bg-line" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
