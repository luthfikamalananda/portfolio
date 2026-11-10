import type { SiteContent } from "@/content";
import { socialIcons } from "../icons";
import { ContactActions } from "../ContactActions";
import { Section } from "./Section";

export function Contact({ content }: { content: SiteContent }) {
  const { ui, owner } = content;
  return (
    <Section id="contact" index="06" eyebrow={ui.contact.eyebrow} title={ui.contact.title} intro={ui.contact.body} className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-accent opacity-[0.12] blur-[120px]"
      />
      <div className="relative">
        <a
          href={`mailto:${owner.email}`}
          className="group inline-block font-display [overflow-wrap:anywhere] text-[clamp(1.75rem,6vw,4.5rem)] font-semibold tracking-tight underline decoration-line-strong decoration-2 underline-offset-[0.2em] transition-colors hover:text-accent-ink hover:decoration-accent"
        >
          {/* Wrap before "@" on narrow phones instead of splitting a word mid-way. */}
          {owner.email.split("@")[0]}
          <wbr />@{owner.email.split("@")[1]}
        </a>
        <ContactActions />
        <ul className="mt-12 flex flex-wrap gap-3">
          {owner.socials.map((s) => {
            const Icon = socialIcons[s.kind];
            return (
              <li key={s.kind}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-muted transition-colors hover:border-fg hover:text-fg"
                >
                  <Icon className="size-4" aria-hidden /> {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
