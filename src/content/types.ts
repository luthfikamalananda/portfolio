// Domain types for the portfolio. Names follow GLOSSARY.md — keep them in sync.

export type Locale = "en" | "id";

export type SocialKind = "github" | "linkedin" | "x" | "instagram" | "dribbble";

export interface SocialLink {
  kind: SocialKind;
  label: string;
  href: string;
}

/** The person the portfolio is about. */
export interface Owner {
  /** Display name used across the site. */
  name: string;
  /** Full legal name — metadata and the Resume. */
  fullName: string;
  shortName: string;
  /** What friends call the Owner; used in casual copy. */
  nickname: string;
  role: string;
  location: string;
  /** IANA time zone, used for the live local clock in the Hero. */
  timeZone: string;
  email: string;
  socials: SocialLink[];
}

/** A short, current-tense line about availability and focus. */
export interface Status {
  availability: string;
  available: boolean;
  learning: string;
}

export type MilestoneKind = "education" | "work" | "organization";

/** One entry in the Journey. */
export interface Milestone {
  kind: MilestoneKind;
  title: string;
  place: string;
  period: string;
  summary: string;
  highlights?: string[];
  /** Marks the Latest Education Milestone (surfaced in About). */
  latestEducation?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  year: string;
  stack: string[];
  image: string;
  /** Optional variant shown instead of `image` while the dark theme is on. */
  imageDark?: string;
  /** For a Project made of several apps: one line per app, shown under the tagline. */
  parts?: { name: string; detail: string }[];
  featured: boolean;
  links: { live?: string; repo?: string };
}

export interface Skill {
  name: string;
  /** Key into the icon map in components/icons.tsx. */
  icon?: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

/** Localised copy for Beyond Code (shared facts live in content/shared.ts → `gaming`). */
export interface BeyondContent {
  /** Joke stats on the Player Card, 0–100. */
  playerStats: { label: string; value: number }[];
  specialMove: string;
  versus: { blurb: string; roles: string[]; captions: string[] };
  /** Story & Stream: one tab for the games, the channel and the game catalog. */
  play: {
    blurb: string;
    featuredTitle: string;
    /** One-liner per game id. */
    notes: Record<string, string>;
    /** The Owner's longer take per game id, shown in the review panel. */
    reviews: Record<string, string>;
    /** Content & Gaming card: a few lines on the Owner as a player. */
    about: string;
  };
  training: { blurb: string; activities: { name: string; detail: string }[] };
}

export interface UiCopy {
  nav: { about: string; skills: string; projects: string; journey: string; beyond: string; contact: string; resume: string; menu: string; close: string };
  /** Keyboard navbar: key legends and the "?" cheat sheet. */
  keys: {
    title: string;
    sections: string;
    nextPrev: string;
    scroll: string;
    top: string;
    resume: string;
    theme: string;
    language: string;
    palette: string;
    help: string;
    hint: string;
  };
  hero: {
    scroll: string;
    localTime: string;
    ctaWork: string;
    ctaContact: string;
    hint: string;
    hintTouch: string;
    edition: string;
    dragHint: string;
    receiptTitle: string;
    receiptFooter: string;
    badgeHint: string;
    badgeAccess: string;
    badgeSince: string;
    badgeBack: string;
  };
  about: { eyebrow: string; title: string; latestEducation: string; photoCaption: string };
  skills: { eyebrow: string; title: string; intro: string };
  projects: { eyebrow: string; title: string; intro: string; more: string; /** Toggle for a Project's apps; `{n}` = how many. */ parts: string; live: string; repo: string };
  journey: { eyebrow: string; title: string; kinds: Record<MilestoneKind, string> };
  beyond: {
    eyebrow: string;
    title: string;
    intro: string;
    player: string;
    main: string;
    rank: string;
    special: string;
    comboHint: string;
    comboHit: string;
    /** Player Card: flip button label, and the back face's placeholder line. */
    flip: string;
    cardBack: string;
    modes: Record<"versus" | "play" | "training", { label: string; sub: string }>;
    /** Labels for a game's `kind` in the catalog. */
    gameKinds: Record<"favorite" | "recommended", string>;
    gameAll: string;
    /** Library wall (filter "All"). */
    wall: { count: string; search: string; sortYear: string; sortAZ: string; empty: string; back: string };
    community: string;
    watch: string;
    channel: string;
    /** Link to the community TikTok the Owner manages. */
    tiktok: string;
    nowPlaying: string;
    seeMore: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    copy: string;
    copied: string;
    resume: string;
  };
  resume: { title: string; body: string; english: string; indonesian: string; current: string; cancel: string };
  palette: {
    placeholder: string;
    empty: string;
    hint: string;
    groups: { navigate: string; actions: string; links: string };
    toggleTheme: string;
    switchLocale: string;
    copyEmail: string;
    downloadResume: string;
    party: string;
    partyOn: string;
    partyOff: string;
  };
  theme: { toDark: string; toLight: string };
  locale: { switchTo: string };
  footer: { builtWith: string; backToTop: string; pressK: string };
}

export interface SiteContent {
  locale: Locale;
  meta: { title: string; description: string };
  owner: Owner;
  status: Status;
  hero: {
    /** One plain, specific sentence about the Owner. No slogans. */
    intro: string;
    /** "Now" list: what the Owner is doing right now. */
    now: { label: string; value: string }[];
    photoCaption: string;
    /** Hero "sentence" layout: lead → photo → afterPhoto → clock → afterClock → rotating word. */
    sentence: { lead: string; afterPhoto: string; afterClock: string; rotating: string[] };
    /** Hero "magazine" layout: the portfolio as a magazine cover. */
    magazine: {
      issue: string;
      price: string;
      headline: string;
      coverLines: { kicker: string; title: string }[];
      sticker: string;
    };
  };
  about: { paragraphs: string[] };
  skillGroups: SkillGroup[];
  projects: Project[];
  journey: Milestone[];
  beyond: BeyondContent;
  ui: UiCopy;
}
