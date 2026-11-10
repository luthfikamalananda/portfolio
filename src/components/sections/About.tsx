import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import type { SiteContent } from "@/content";
import { photos } from "@/content/shared";
import { asset } from "@/lib/site";
import TiltedCard from "../reactbits/TiltedCard";
import { Card } from "../Card";
import { Reveal } from "../Reveal";
import { Section } from "./Section";

export function About({ content }: { content: SiteContent }) {
  const { about, ui, owner, status, journey } = content;
  const latest = journey.find((m) => m.latestEducation);

  return (
    // overflow-x-clip: the TiltedCard's entrance and touch tilt push it ~2px past a phone's edge, which
    // briefly made the whole page scroll sideways. clip (not hidden) creates no scroll container.
    <Section id="about" index="01" eyebrow={ui.about.eyebrow} title={ui.about.title} className="overflow-x-clip">
      <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <div className="relative mx-auto w-full max-w-sm md:mx-0">
          <TiltedCard
            imageSrc={asset(photos.about)}
            altText={owner.name}
            captionText={ui.about.photoCaption}
            containerHeight="520px"
            imageHeight="520px"
            imageWidth="100%"
            rotateAmplitude={10}
            scaleOnHover={1.04}
            // Slower spring (default 0.6): the photo eases into its tilt and its entrance instead of snapping.
            smoothness={0.95}
            radius={28}
            showTooltip={false}
            glare={0.25}
          />
          {/* z-10: TiltedCard raises itself to z-2 while hovered — the sticker must stay on top. */}
          <span className="pointer-events-none absolute -right-2 -top-4 z-10 rotate-6 rounded-full bg-accent px-4 py-2 font-display text-sm font-semibold text-on-accent shadow-lg md:-right-6">
            {ui.about.photoCaption} 👋
          </span>
        </div>

        <div className="flex flex-col gap-8">
          <div className="space-y-5 text-lg leading-relaxed text-muted md:text-xl">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.18}>
                <p className={i === 0 ? "text-fg" : undefined}>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1 + about.paragraphs.length * 0.18}>
          <ul className="flex flex-wrap gap-2 font-mono text-xs">
            <li className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-muted">
              <MapPin className="size-3.5" /> {owner.location}
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-muted">
              <Sparkles className="size-3.5" /> {status.learning}
            </li>
          </ul>
          </Reveal>

          {latest && (
            <Reveal delay={0.25 + about.paragraphs.length * 0.18}>
            <Card className="rounded-2xl">
              <div className="flex gap-4 p-6">
                <span className="grid size-11 flex-none place-items-center rounded-xl bg-accent text-on-accent">
                  <GraduationCap className="size-5" />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">{ui.about.latestEducation}</p>
                  <p className="mt-1 font-display text-xl font-semibold">{latest.title}</p>
                  <p className="text-muted">
                    {latest.place} · {latest.period}
                  </p>
                  <p className="mt-2 text-sm text-muted">{latest.summary}</p>
                </div>
              </div>
            </Card>
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}
