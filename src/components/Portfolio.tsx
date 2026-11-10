import { getContent, type Locale } from "@/content";
import { CommandPalette } from "./CommandPalette";
import { DevSwitcher } from "./DevSwitcher";
import { IntroCurtain } from "./IntroCurtain";
import { PartyLayer } from "./PartyLayer";
import { ResumeDialog } from "./ResumeDialog";
import { SiteNav } from "./SiteNav";
import { SiteTexture } from "./SiteTexture";
import { Toast } from "./Toast";
import { UIProvider } from "./UIProvider";
import { About } from "./sections/About";
import { BeyondCode } from "./sections/BeyondCode";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { Journey } from "./sections/Journey";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";

/** The whole single-page portfolio for one Locale. */
export function Portfolio({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  return (
    <UIProvider content={content}>
      <SiteTexture />
      <IntroCurtain name={content.owner.name} />
      <SiteNav />
      <PartyLayer>
        <main>
          <Hero content={content} />
          <About content={content} />
          <Skills content={content} />
          <Projects content={content} />
          <Journey content={content} />
          <BeyondCode content={content} />
          <Contact content={content} />
        </main>
        <Footer content={content} />
      </PartyLayer>
      <CommandPalette />
      <ResumeDialog />
      <Toast />
      {process.env.NODE_ENV === "development" && <DevSwitcher />}
    </UIProvider>
  );
}
