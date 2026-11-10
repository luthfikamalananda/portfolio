import type { SiteContent } from "@/content";
import { BeyondLayout } from "../BeyondLayout";
import { Section } from "./Section";

/** Beyond Code (see GLOSSARY): the Owner off the clock — a card, then the Modes. */
export function BeyondCode({ content }: { content: SiteContent }) {
  const { ui } = content;
  return (
    <Section id="beyond" index="05" eyebrow={ui.beyond.eyebrow} title={ui.beyond.title} intro={ui.beyond.intro}>
      <BeyondLayout content={content} />
    </Section>
  );
}
