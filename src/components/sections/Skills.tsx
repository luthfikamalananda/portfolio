import type { SiteContent } from "@/content";
import { skillIcons } from "../icons";
import { Card } from "../Card";
import { SkillMarquee } from "../SkillMarquee";
import { Section } from "./Section";

export function Skills({ content }: { content: SiteContent }) {
  const { ui, skillGroups } = content;
  const learningIndex = skillGroups.length - 1;

  return (
    <Section id="skills" index="02" eyebrow={ui.skills.eyebrow} title={ui.skills.title} intro={ui.skills.intro}>
      <SkillMarquee groups={skillGroups} />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, gi) => (
          <Card key={group.title} className="rounded-2xl">
            <div className="flex h-full flex-col p-6">
              <h3 className="mb-5 flex items-center justify-between font-mono text-xs uppercase tracking-[0.15em] text-muted">
                {group.title}
                {gi === learningIndex && <span className="blink size-2 rounded-full bg-accent" aria-hidden />}
              </h3>
              <ul className="flex flex-col gap-3">
                {group.skills.map((skill) => {
                  const Icon = skill.icon ? skillIcons[skill.icon] : undefined;
                  return (
                    <li key={skill.name} className="flex items-center gap-3 text-fg">
                      <span className="grid size-8 place-items-center rounded-lg border border-line bg-bg-elev">
                        {Icon && <Icon className="size-4" aria-hidden />}
                      </span>
                      {skill.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
