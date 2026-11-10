// Locale-independent data. Values still marked TODO are placeholders.
import type { Owner, Project, Skill } from "./types";

export const owner: Omit<Owner, "role" | "location"> = {
  name: "Luthfi Ananda",
  fullName: "Luthfi Kamal Ananda",
  shortName: "Luthfi",
  nickname: "Lompii",
  timeZone: "Asia/Jakarta",
  email: "luthfi.kamal.ananda@gmail.com",
  socials: [
    { kind: "github", label: "GitHub", href: "https://github.com/luthfikamalananda" },
    { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/luthfi-ananda/" },
  ],
};

export const skills = {
  languages: [
    { name: "TypeScript", icon: "typescript" },
    { name: "JavaScript", icon: "javascript" },
    { name: "HTML", icon: "html" },
    { name: "CSS", icon: "css" },
  ],
  frameworks: [
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextjs" },
    { name: "Electron", icon: "electron" },
    { name: "Tailwind CSS", icon: "tailwind" },
    { name: "MUI", icon: "mui" },
    { name: "Zustand", icon: "zustand" },
    { name: "Redux Toolkit", icon: "redux" },
    { name: "TanStack Query", icon: "reactquery" },
    { name: "Framer Motion", icon: "framer" },
  ],
  tools: [
    { name: "Turborepo", icon: "turborepo" },
    { name: "Vite", icon: "vite" },
    { name: "Git", icon: "git" },
    { name: "GitLab CI", icon: "gitlab" },
    { name: "Docker", icon: "docker" },
    { name: "Playwright", icon: "playwright" },
    { name: "Figma", icon: "figma" },
  ],
  learning: [
    { name: "Mobile (MPOS)", icon: "mpos" },
    { name: "Backend", icon: "nodejs" },
    { name: "DevOps", icon: "devops" },
  ],
} satisfies Record<string, Skill[]>;

export const projectBase: Omit<Project, "tagline" | "role">[] = [
  {
    slug: "tessera",
    title: "Tessera",
    year: "2025 — Now",
    stack: ["Next.js 16", "Multi-Zones", "Turborepo", "TypeScript", "MUI", "Tailwind", "Zustand", "TanStack Query"],
    image: "/projects/tessera.svg",
    featured: true,
    links: { live: "https://www.instagram.com/p/DaZuxD7j7w_/" },
  },
  {
    slug: "retroppies",
    title: "Retroppies Photobooth",
    year: "2026",
    stack: ["Electron", "React", "TypeScript", "WebGL", "ffmpeg", "MUI", "TanStack Query", "Playwright", "PWA"],
    image: "/projects/retroppies.svg",
    featured: true,
    links: {},
  },
  {
    slug: "membership-parkir",
    title: "Membership Parkir Web",
    year: "2024 — Now",
    stack: ["React", "Vite", "TypeScript", "Redux Toolkit", "Tailwind", "shadcn/ui", "Zod"],
    image: "/projects/membership-parkir.svg",
    featured: true,
    links: {},
  },
  {
    slug: "udbm-widgets",
    title: "UDBM Parking Widgets",
    year: "2024 — Now",
    stack: ["React", "MUI", "Highcharts", "Formik", "Babel"],
    image: "/projects/udbm-widgets.svg",
    featured: false,
    links: {},
  },
  {
    slug: "reforma-trash",
    title: "Reforma Trash Project",
    year: "2022",
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/projects/reforma-trash.svg",
    featured: false,
    links: { live: "https://openjournal.unpam.ac.id/index.php/JTSI/article/view/34194/" },
  },
];

/** The Owner's photo in the crops the layouts need (public/photo/). */
export const photos = {
  /** Full-length original, 743×1597 — magazine cover. */
  full: "/photo/portrait.jpg",
  /** 4:5 head-and-shoulders — About, polaroid, specimen. */
  portrait: "/photo/portrait-4x5.jpg",
  /** ~3:4 from the very top of the photo (full hair) — the About card. */
  about: "/photo/portrait-about.jpg",
  /** 5:4 head-and-shoulders — ID badge. */
  landscape: "/photo/portrait-5x4.jpg",
  /** 1:1 face — small inline pill. */
  face: "/photo/portrait-face.jpg",
} as const;

/** Facts for Beyond Code that don't change between Locales. */
export const gaming = {
  game: "Tekken 8",
  main: "Jin Kazama",
  rank: "God of Destruction 5",
  community: "Semarang Gelut Xtreme",
  communityCity: "Semarang",
  /** "Now playing" on the Content & Gaming card (landscape Steam header art). */
  nowPlaying: { title: "Yakuza Kiwami", art: "/games/yakuza-kiwami-header.jpg" },
  /** The community's TikTok, which the Owner manages (shown under Content & Gaming). */
  tiktok: "https://www.tiktok.com/@sgxesports",
  youtube: {
    url: "https://www.youtube.com/@lopiananda",
    featuredVideoId: "0tKLswyx_2Y",
    /** Seconds into the stream where the featured clip starts (the hook). */
    featuredStart: 215,
  },
  /**
   * The game catalog (Story & Stream). Posters are the official Steam library capsules (600×900);
   * a game without `poster` (e.g. Minecraft, not on Steam) renders a typographic card. Notes per Locale: `beyond.play.notes[id]`.
   */
  games: [
    // Personal favorites
    { id: "clair-obscur", title: "Clair Obscur: Expedition 33", year: 2025, kind: "favorite", poster: "/games/clair-obscur.jpg" },
    // Franchises are one entry; `years` shows the span, `year` sorts by the latest.
    { id: "plague-tale", title: "A Plague Tale: Innocence & Requiem", year: 2022, years: "2019–2022", kind: "favorite", poster: "/games/plague-tale-innocence.jpg", posters: ["/games/plague-tale-innocence.jpg", "/games/plague-tale-requiem.jpg"] },
    { id: "doom-eternal", title: "DOOM Eternal", year: 2020, kind: "favorite", poster: "/games/doom-eternal.jpg" },
    { id: "tlou", title: "The Last of Us Part I & II", year: 2024, years: "2022–2024", kind: "favorite", poster: "/games/tlou-part-1.jpg", posters: ["/games/tlou-part-1.jpg", "/games/tlou-part-2.jpg"] },
    // Recommended
    { id: "re2", title: "Resident Evil 2", year: 2019, kind: "recommended", poster: "/games/resident-evil-2.jpg" },
    { id: "re4", title: "Resident Evil 4", year: 2023, kind: "recommended", poster: "/games/resident-evil-4.jpg" },
    { id: "ghost-of-tsushima", title: "Ghost of Tsushima", year: 2024, kind: "recommended", poster: "/games/ghost-of-tsushima.jpg" },
    { id: "detroit", title: "Detroit: Become Human", year: 2018, kind: "recommended", poster: "/games/detroit-become-human.jpg" },
    { id: "minecraft", title: "Minecraft", year: 2011, kind: "recommended" },
    // Only under "All"
    { id: "god-of-war", title: "God of War", year: 2018, poster: "/games/god-of-war.jpg" },
    { id: "silent-hill-2", title: "Silent Hill 2", year: 2024, poster: "/games/silent-hill-2.jpg" },
    { id: "rdr2", title: "Red Dead Redemption 2", year: 2018, poster: "/games/rdr2.jpg" },
    { id: "the-forest", title: "The Forest", year: 2018, poster: "/games/the-forest.jpg" },
    { id: "sons-of-the-forest", title: "Sons of the Forest", year: 2024, poster: "/games/sons-of-the-forest.jpg" },
    { id: "green-hell", title: "Green Hell", year: 2019, poster: "/games/green-hell.jpg" },
    { id: "raft", title: "Raft", year: 2022, poster: "/games/raft.jpg" },
  ] as {
    id: string;
    title: string;
    year: number;
    /** Shown instead of `year` for a franchise, e.g. "2019–2022". */
    years?: string;
    /** Personal favorites / Recommended filter; leave out for games that only appear under "All". */
    kind?: "favorite" | "recommended";
    poster?: string;
    /** A franchise's posters, shown side by side (each cropped to its centre). */
    posters?: string[];
  }[],
  // Shown cropped to 4:3; the first one is the big tile. Captions: `beyond.versus.captions`.
  tournamentPhotos: ["/beyond/tournament-3.jpg", "/beyond/tournament-1.jpg", "/beyond/tournament-2.jpg"],
  /** Crop focus per photo (CSS object-position), same order — keeps faces and prizes in frame. */
  tournamentFocus: ["50% 30%", "50% 55%", "50% 47%"],
  // TODO: one photo per activity, same order as `beyond.training.activities` (gym, badminton, ping pong)
  trainingPhotos: ["/beyond/training-1.svg", "/beyond/training-2.svg", "/beyond/training-3.svg"],
};

export const resumeFiles = {
  en: "/resume/luthfi-ananda-resume-en.pdf",
  id: "/resume/luthfi-ananda-resume-id.pdf",
} as const;
