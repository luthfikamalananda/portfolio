// Site-wide settings. Change these once you've picked them with the dev switcher.

export const siteConfig = {
  /** Production hero layout. Try others in dev with `?hero=`. */
  hero: "desk" as HeroKind,
  /** The interactive object on the right of the "desk" hero (≥1200px). Try others in dev with `?gimmick=`. */
  gimmick: "desk" as GimmickKind,
  /** The gimmick below 1200px (under the name on phones, beside it on tablets). */
  gimmickMobile: "chat" as GimmickKind,
  /** Background texture behind the whole page. Try others in dev with `?texture=`. */
  texture: "grid" as TextureKind,
  /** Production accent colour. Try others in dev with `?accent=`. */
  accent: "lime" as AccentKind,
  /** Game catalog layout under Beyond Code → Story & Stream. Try others in dev with `?games=`. */
  games: "spotlight" as GamesKind,
  /** How the Spotlight's other games are picked. Try others in dev with `?picker=`. */
  picker: "dock" as PickerKind,
  /** Beyond Code's left card: the Player Card, a card per tab, or none. Try others with `?beyondCard=`. */
  beyondCard: "context" as BeyondCardKind,
  /** Production navigation style. Try others in dev with `?nav=`. */
  nav: "keyrail" as NavKind,
  /** Absolute URL of the deployed site, used for metadata. Set NEXT_PUBLIC_SITE_URL when deploying. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const heroKinds = ["desk", "badge", "magazine", "sentence", "specimen"] as const;
export type HeroKind = (typeof heroKinds)[number];

export const gimmickKinds = ["deck", "player", "desk", "badge", "magazine", "chat", "vinyl", "kanban", "ticket", "scratch", "terminal"] as const;
export type GimmickKind = (typeof gimmickKinds)[number];

export const textureKinds = ["dots", "grid", "grain"] as const;
export type TextureKind = (typeof textureKinds)[number];

export const gamesKinds = ["combo", "combo-stage", "accordion", "accordion-scroll", "accordion-paged", "accordion-filter", "spotlight", "shelf", "fan", "grid"] as const;
export type GamesKind = (typeof gamesKinds)[number];

export const pickerKinds = ["thumbs", "slivers", "dock", "fan", "coverflow"] as const;
export type PickerKind = (typeof pickerKinds)[number];

export const beyondCardKinds = ["player", "context", "none"] as const;
export type BeyondCardKind = (typeof beyondCardKinds)[number];

export const navKinds = ["keyrail", "pill"] as const;
export type NavKind = (typeof navKinds)[number];

export const accentKinds = ["lime", "violet", "coral", "cyan"] as const;
export type AccentKind = (typeof accentKinds)[number];

/** Accent values for WebGL backgrounds (CSS reads the same values from globals.css). */
export const accentHex: Record<AccentKind, { dark: string; light: string }> = {
  lime: { dark: "#C6F432", light: "#86B300" },
  violet: { dark: "#8F7BFF", light: "#5227FF" },
  coral: { dark: "#FF6B3D", light: "#E2461B" },
  cyan: { dark: "#2DE2E6", light: "#0E9AA7" },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a public/ asset path with the basePath (needed only when hosted under a sub-path). */
export function asset(path: string): string {
  return `${basePath}${path}`;
}
