import type { Locale, SiteContent } from "./types";
import { en } from "./en";
import { id } from "./id";

export const locales: Locale[] = ["en", "id"];
export const defaultLocale: Locale = "en";

const content: Record<Locale, SiteContent> = { en, id };

export function getContent(locale: Locale): SiteContent {
  return content[locale];
}

/** Route for a Locale. English lives at "/", Indonesian at "/id/" (see ADR 0001). */
export function localePath(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}/`;
}

export type { Locale, SiteContent } from "./types";
