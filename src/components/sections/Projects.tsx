import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { SiteContent } from "@/content";
import type { Project } from "@/content/types";
import { asset } from "@/lib/site";
import { Card } from "../Card";
import { ProjectParts } from "../ProjectParts";
import { Section } from "./Section";

function ProjectLinks({ project, ui }: { project: Project; ui: SiteContent["ui"] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.links.live && (
        <a
          href={project.links.live}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
        >
          {ui.projects.live} <ArrowUpRight className="size-4" />
        </a>
      )}
      {project.links.repo && (
        <a
          href={project.links.repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-sm font-medium transition-colors hover:border-fg"
        >
          <SiGithub className="size-3.5" /> {ui.projects.repo}
        </a>
      )}
    </div>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5 font-mono text-[11px] text-muted">
      {items.map((s) => (
        <li key={s} className="rounded-md border border-line px-2 py-1">
          {s}
        </li>
      ))}
    </ul>
  );
}

/** The Project's poster; with `imageDark`, CSS swaps in the dark variant so the pre-paint theme applies without a flash. */
function ProjectImage({ project }: { project: Project }) {
  const cls = "absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]";
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized SVG/PNG */}
      <img src={asset(project.image)} alt="" loading="lazy" className={`${cls} ${project.imageDark ? "[[data-theme=dark]_&]:hidden" : ""}`} />
      {project.imageDark && (
        // eslint-disable-next-line @next/next/no-img-element -- static export
        <img src={asset(project.imageDark)} alt="" loading="lazy" className={`${cls} hidden [[data-theme=dark]_&]:block`} />
      )}
    </>
  );
}

function FeaturedCard({ project, ui, wide }: { project: Project; ui: SiteContent["ui"]; wide?: boolean }) {
  return (
    <Card className={`group rounded-3xl ${wide ? "md:col-span-2" : ""}`}>
      <article className={`flex h-full flex-col ${wide ? "md:grid md:grid-cols-[1.4fr_1fr]" : ""}`}>
        <div className={`relative overflow-hidden ${wide ? "aspect-[16/10] md:aspect-auto md:min-h-[380px]" : "aspect-[16/10]"}`}>
          <ProjectImage project={project} />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
          <p className="flex items-center justify-between font-mono text-xs text-muted">
            <span>{project.role}</span>
            <span>{project.year}</span>
          </p>
          <h3 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{project.title}</h3>
          <p className="text-muted">{project.tagline}</p>
          {project.parts && <ProjectParts parts={project.parts} label={ui.projects.parts.replace("{n}", String(project.parts.length))} />}
          <div className="mt-auto flex flex-col gap-5 pt-2">
            <Stack items={project.stack} />
            <ProjectLinks project={project} ui={ui} />
          </div>
        </div>
      </article>
    </Card>
  );
}

export function Projects({ content }: { content: SiteContent }) {
  const { ui, projects } = content;
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <Section id="projects" index="03" eyebrow={ui.projects.eyebrow} title={ui.projects.title} intro={ui.projects.intro}>
      <div className="grid gap-5 md:grid-cols-2">
        {featured.map((p, i) => (
          <FeaturedCard key={p.slug} project={p} ui={ui} wide={i === 0 || (i === featured.length - 1 && (featured.length - 1) % 2 === 1)} />
        ))}
      </div>

      <h3 className="mb-6 mt-20 font-mono text-xs uppercase tracking-[0.2em] text-muted">{ui.projects.more}</h3>
      <ul className="grid gap-4 sm:grid-cols-2">
        {others.map((p) => {
          const href = p.links.live ?? p.links.repo;
          return (
            <li key={p.slug}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-line bg-surface/40 p-5 transition-colors hover:border-accent"
              >
                <div className="relative -mx-5 -mt-5 mb-2 aspect-[16/10] overflow-hidden border-b border-line">
                  <ProjectImage project={p} />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-muted">{p.year}</p>
                    <p className="mt-1 font-display text-xl font-semibold">{p.title}</p>
                  </div>
                  <ArrowUpRight className="size-5 flex-none text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink" />
                </div>
                <p className="text-sm text-muted">{p.tagline}</p>
                <div className="mt-auto pt-1">
                  <Stack items={p.stack} />
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
