// English copy (default Locale). Beyond Code values marked TODO are still placeholders.
import type { SiteContent } from "./types";
import { owner, projectBase, skills } from "./shared";

const projectText: Record<string, { tagline: string; role: string }> = {
  tessera: {
    tagline:
      "A micro-frontend travel booking platform — bus, flight, hotel, KAI & European rail, ferry, PELNI and attractions — for corporates (B2B) and consumers via Tessera Lifestyle, live inside GoPay. I led the move to Next.js Multi-Zones and built per-corporate white-label branding with CSS design tokens, dark mode and a custom i18n hook.",
    role: "Frontend engineer · ~970 commits, #2 contributor",
  },
  retroppies: {
    tagline:
      "A multi-tenant photobooth franchise system: an Electron kiosk (QRIS payment, photo + video capture, WebGL filters, borderless A6 printing, iOS-ready MP4 via ffmpeg, auto-update with rollback), a tenant dashboard with analytics, and a no-login PWA where guests grab their photos by QR code.",
    role: "Freelance · sole frontend engineer",
  },
  "membership-parkir": {
    tagline:
      "A mobile-first web app for selling and renewing parking memberships, live at Kawasan Industri Maspion, Gresik — QRIS, Virtual Account and card payments, role-based tenant quotas and signed requests. One of the products growing the Parking unit's service-fee revenue.",
    role: "Main author · ~97% of commits",
  },
  "udbm-widgets": {
    tagline:
      "A library of 50+ embeddable React widgets other teams install into the UDBM dashboard. I built the Parking widgets: transaction and shift reports, member cards, approvals and analytics.",
    role: "Frontend · Parking widgets",
  },
  "reforma-trash": {
    tagline:
      "A web marketplace for buying and selling recyclable waste. Won Best Capstone Project at Dicoding's MSIB Batch 3, and later became my published undergraduate thesis.",
    role: "Team lead · team of 4",
  },
};

export const en: SiteContent = {
  locale: "en",
  meta: {
    title: "Luthfi Ananda — Software Engineer (Frontend)",
    description:
      "Software engineer in Semarang focused on frontend — building travel, parking and payment products with React and Next.js at PT Mitra Kasih Perkasa.",
  },
  owner: { ...owner, role: "Software Engineer (Frontend)", location: "Semarang, Indonesia" },
  status: {
    available: true,
    availability: "Open to interesting opportunities",
    learning: "Mobile, backend & DevOps",
  },
  hero: {
    intro:
      "Frontend-focused software engineer in Semarang. I build the travel-booking platform behind Tessera Lifestyle in GoPay, plus parking and payment apps that real people tap through every day.",
    now: [
      { label: "Building", value: "Tessera at PT Mitra Kasih Perkasa" },
      { label: "Exploring", value: "Mobile, backend & DevOps" },
      { label: "Open to", value: "Interesting opportunities, remote-friendly" },
    ],
    photoCaption: "that's me — Lompii to friends",
    sentence: {
      lead: "Hi, I'm Luthfi",
      afterPhoto: "— a software engineer based in Semarang",
      afterClock: "who builds frontends that feel",
      rotating: ["fast.", "clear.", "on-brand.", "a little fun."],
    },
    magazine: {
      issue: "Issue 01 · Nov 2026 · Semarang",
      price: "Rp 0,— for recruiters",
      headline: "The frontend issue",
      coverLines: [
        { kicker: "Interview", title: "Luthfi Ananda on shipping travel booking inside GoPay" },
        { kicker: "Inside", title: "10 micro-frontends, one design-token system, any brand colour" },
        { kicker: "Plus", title: "A photobooth that prints, transcodes and updates itself" },
      ],
      sticker: "open to interesting opportunities · remote-friendly · ",
    },
  },
  about: {
    paragraphs: [
      "I'm Luthfi — most people call me Lompii — a software engineer focused on frontend at PT Mitra Kasih Perkasa (MKP) since April 2024. I work in the Travel Tech unit on Tessera, and help the Parking unit ship the apps its customers use.",
      "On Tessera I led the move to Next.js Multi-Zones, built white-label branding so every corporate client sees its own colours, and started the i18n hook the whole platform now uses. I like the work where architecture and small UI details meet.",
      "I graduated in Informatics Engineering from Universitas Dian Nuswantoro with a 3.93 GPA. Next, I want to go beyond the browser: mobile and MPOS, backend and DevOps.",
    ],
  },
  skillGroups: [
    { title: "Languages", skills: skills.languages },
    { title: "Frameworks & libraries", skills: skills.frameworks },
    { title: "Tools", skills: skills.tools },
    { title: "Currently learning", skills: skills.learning },
  ],
  projects: projectBase.map((p) => ({ ...p, ...projectText[p.slug] })),
  journey: [
    {
      kind: "work",
      title: "Software Engineer (Frontend)",
      place: "PT Mitra Kasih Perkasa",
      period: "Apr 2026 — Now",
      summary: "Travel Tech unit — Tessera, a 10-app booking platform for B2B corporates and Tessera Lifestyle in GoPay — while still helping the Parking unit.",
      highlights: [
        "Led the migration to Next.js Multi-Zones",
        "Built white-label corporate branding on --tsr-* design tokens",
        "Dark mode across 10 products",
      ],
    },
    {
      kind: "work",
      title: "Freelance Frontend Engineer",
      place: "Retroppies",
      period: "May 2026 — Now",
      summary: "Sole frontend engineer on a photobooth franchise system: Electron kiosk, tenant dashboard and guest PWA.",
    },
    {
      kind: "work",
      title: "Junior Software Engineer (Frontend)",
      place: "PT Mitra Kasih Perkasa",
      period: "Apr 2024 — Mar 2026",
      summary: "Built Membership Parkir Web and Parking widgets for UDBM, then joined Tessera across Bus, Flight, KAI and European rail.",
      highlights: ["Membership Parkir live at Kawasan Industri Maspion, Gresik", "Started Tessera's custom i18n hook"],
    },
    {
      kind: "education",
      title: "B.Sc. Informatics Engineering",
      place: "Universitas Dian Nuswantoro",
      period: "2020 — 2024",
      summary: "GPA 3.93 / 4.00 · Thesis published in JTSI (2023): a web marketplace for recyclable waste.",
      latestEducation: true,
    },
    {
      kind: "education",
      title: "MSIB Batch 3 · Front-End Web",
      place: "Dicoding × Kampus Merdeka",
      period: "Aug — Dec 2022",
      summary: "Led a team of 4 on Reforma Trash Project, which won Best Capstone Project.",
    },
  ],
  beyond: {
    playerStats: [
      { label: "Execution", value: 88 },
      { label: "Ship speed", value: 91 },
      { label: "Kopi intake", value: 99 },
      { label: "Ranked patience", value: 37 },
    ],
    specialMove: "Ship it",
    versus: {
      blurb:
        "Tekken 8 is where I spend my competitive energy. I'm a member of Semarang Gelut Xtreme and often end up on the committee for our tournaments — and on the mic as caster.",
      roles: ["Member", "Crew", "Committee", "Caster"],
      captions: ["On the mic as caster", "3rd place — Amateur League, ELS.ID", "Runner-up — Starcomp"],
    },
    play: {
      blurb:
        "Games with a story that stays with you, and games whose mechanics are just plain fun — DOOM Eternal counts. I stream my playthroughs on YouTube, and I run the TikTok for our community, Semarang Gelut Xtreme.",
      featuredTitle: "masak iya horor kidz? - Silent Hill Townfall",
      about: "I play for the story first — the ones I finish at 2 a.m. and think about for a week. But a game with mechanics as tight as DOOM Eternal will always pull me back.",
      // TODO: replace with your own tiny one-liners
      notes: {
        "god-of-war": "Fatherhood, Norse myth, and an axe that comes back when you call it.",
        "silent-hill-2": "Fog, guilt, and a letter from someone who shouldn't be writing.",
        "clair-obscur": "Turn-based, but every parry feels like a rhythm game.",
        tlou: "Part I ruined me in fifteen minutes; Part II argued with me about revenge, and won.",
        rdr2: "Spent more time fishing than doing missions. No regrets.",
        "plague-tale": "Two games, one sibling bond — and so many rats.",
        re4: "Parrying a chainsaw with a knife never gets old.",
        "the-forest": "Crash-landed, then built a cabin and regretted exploring the caves.",
        "sons-of-the-forest": "Same island dread, with a companion who actually helps.",
        "green-hell": "Survival where even a leech is a problem.",
        "raft": "Started on four planks, ended with a floating base.",
        "doom-eternal": "Pure mechanics: dash, chainsaw, glory kill, repeat.",
        "re2": "Mr. X's footsteps live in my head rent-free.",
        "ghost-of-tsushima": "Follow the wind, stay for the duels.",
        "detroit": "Every choice branches — and you'll want to replay to see the rest.",
        "minecraft": "No story, no limits — still the best sandbox.",
      },
      // TODO: your own take on each game, two to four sentences
      reviews: {
        "god-of-war": "Placeholder — what Kratos and Atreus' journey meant to you, and how the one-shot camera pulled you in.",
        "silent-hill-2": "Placeholder — how the remake handled the original's dread, and the ending you got.",
        "clair-obscur": "Placeholder — what made the combat and the story click for you.",
        tlou: "Placeholder — the moments that stayed with you after the credits.",
        rdr2: "Placeholder — why the slow pace works, and the side activities you lost hours in.",
        "plague-tale": "Placeholder — the relationship at its core, and how the world tells the story.",
        re4: "Placeholder — the remake's combat loop and what it does better than the original.",
        "the-forest": "Placeholder — what made this survival loop fun for you (solo or with friends?).",
        "sons-of-the-forest": "Placeholder — what made this survival loop fun for you (solo or with friends?).",
        "green-hell": "Placeholder — what made this survival loop fun for you (solo or with friends?).",
        "raft": "Placeholder — what made this survival loop fun for you (solo or with friends?).",
        "doom-eternal": "Placeholder — the combat chess: why the resource loop makes it the most fun shooter you've played.",
        "re2": "Placeholder — why this is the remake you'd hand to anyone new to the series.",
        "ghost-of-tsushima": "Placeholder — what makes it worth recommending.",
        "detroit": "Placeholder — the choices that stuck with you.",
        "minecraft": "Placeholder — why it's still on your list after all these years.",
      },
    },
    training: {
      blurb: "Long sessions at a desk and on a stick need balancing out — so I lift, and I'll take any excuse for a rally.",
      // TODO: adjust details (how often, where, with whom)
      activities: [
        { name: "Gym", detail: "Strength training, a few times a week" },
        { name: "Badminton", detail: "Weekly games with friends" },
        { name: "Ping pong", detail: "Quick matches, very competitive" },
      ],
    },
  },
  ui: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      journey: "Journey",
      beyond: "Beyond",
      contact: "Contact",
      resume: "Resume",
      menu: "Menu",
      close: "Close",
    },
    keys: {
      title: "Keyboard shortcuts",
      sections: "Jump to a section",
      nextPrev: "Next / previous section",
      scroll: "Scroll a bit / a page",
      top: "Back to the top",
      resume: "Download resume",
      theme: "Light / dark",
      language: "Bahasa Indonesia",
      palette: "Command palette",
      help: "Show / hide this list",
      hint: "This site runs on a keyboard",
    },
    hero: {
      scroll: "Scroll",
      localTime: "in Semarang",
      ctaWork: "Selected work",
      ctaContact: "Say hello",
      hint: "move your cursor across the name",
      hintTouch: "drag a finger across the name",
      edition: "Portfolio, ed. 2026",
      dragHint: "psst — everything on this desk can be dragged",
      receiptTitle: "Now serving",
      receiptFooter: "thanks for scrolling",
      badgeHint: "grab the badge — it swings. Click to flip it.",
      badgeAccess: "Access: all areas",
      badgeSince: "Building for the web since 2022",
      badgeBack: "Currently",
    },
    about: {
      eyebrow: "About",
      title: "A little about me",
      latestEducation: "Latest education",
      photoCaption: "That's me!",
    },
    skills: {
      eyebrow: "Skills",
      title: "Things I work with",
      intro: "No percentage bars — just the tools I reach for every week.",
    },
    projects: {
      eyebrow: "Projects",
      title: "Selected work",
      intro: "A few things I've designed, built and shipped.",
      more: "More things I've made",
      live: "Live",
      repo: "Code",
    },
    journey: {
      eyebrow: "Journey",
      title: "How I got here",
      kinds: { education: "Education", work: "Work", organization: "Organization" },
    },
    beyond: {
      eyebrow: "Beyond code",
      title: "Off the clock, on the stick",
      intro: "Story games, late-night streams, and a fighting-game community I keep showing up for.",
      player: "Player 1",
      main: "Main",
      rank: "Rank",
      special: "Special move",
      comboHint: "type S D P or ↓ → P — or tap the keys",
      comboHit: "SHIP IT! ✦ combo landed",
      flip: "Flip card",
      cardBack: "Back side — coming soon",
      modes: {
        versus: { label: "Community", sub: "Fighting game community · Tekken 8" },
        play: { label: "Content & Gaming", sub: "Streams & Games Catalogue" },
        training: { label: "Sports", sub: "Staying active off-screen" },
      },
      gameKinds: { favorite: "Personal favorites", recommended: "Recommended" },
      gameAll: "All",
      wall: { count: "games played", search: "Search a game…", sortYear: "Newest", sortAZ: "A–Z", empty: "Not on the shelf (yet).", back: "All games" },
      community: "Community",
      watch: "Play video",
      channel: "YouTube channel",
      tiktok: "Community TikTok",
      nowPlaying: "Now playing",
      seeMore: "See the other side of me",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's build something fun.",
      body: "Have a project, a role, or just want to talk about frontend? My inbox is always open.",
      copy: "Copy email",
      copied: "Copied!",
      resume: "Download resume",
    },
    resume: {
      title: "Download resume",
      body: "Which version would you like?",
      english: "English",
      indonesian: "Bahasa Indonesia",
      current: "current language",
      cancel: "Cancel",
    },
    palette: {
      placeholder: "Type a command or search…",
      empty: "Nothing found. Try “party”.",
      hint: "to navigate",
      groups: { navigate: "Navigate", actions: "Actions", links: "Links" },
      toggleTheme: "Toggle light / dark theme",
      switchLocale: "Ganti ke Bahasa Indonesia",
      copyEmail: "Copy email address",
      downloadResume: "Download resume",
      party: "Party mode",
      partyOn: "Party mode on — click anywhere 🎉",
      partyOff: "Party mode off",
    },
    theme: { toDark: "Switch to dark theme", toLight: "Switch to light theme" },
    locale: { switchTo: "Bahasa Indonesia" },
    footer: { builtWith: "Designed & built by", backToTop: "Back to top", pressK: "for commands" },
  },
};
