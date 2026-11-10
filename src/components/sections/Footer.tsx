import type { SiteContent } from "@/content";
import { PaletteHint } from "../PaletteHint";

export function Footer({ content }: { content: SiteContent }) {
  const { ui, owner } = content;
  return (
    <footer className="border-t border-line px-4 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 font-mono text-xs text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} · {ui.footer.builtWith} <span className="text-fg">{owner.name}</span>
        </p>
        <PaletteHint label={ui.footer.pressK} />
        <a href="#top" className="w-fit transition-colors hover:text-fg">
          {ui.footer.backToTop} ↑
        </a>
      </div>
    </footer>
  );
}
