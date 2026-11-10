import type { Metadata } from "next";
import { getContent, localePath, type Locale } from "@/content";
import { asset, siteConfig } from "./site";

export function buildMetadata(locale: Locale): Metadata {
  const { meta, owner } = getContent(locale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: meta.title,
    description: meta.description,
    authors: [{ name: owner.fullName }],
    creator: owner.fullName,
    icons: { icon: asset("/icon.svg") },
    alternates: {
      canonical: asset(localePath(locale)),
      languages: { en: asset(localePath("en")), id: asset(localePath("id")) },
    },
    openGraph: {
      type: "website",
      title: meta.title,
      description: meta.description,
      locale: locale === "id" ? "id_ID" : "en_US",
      url: asset(localePath(locale)),
      // TODO: add an Open Graph image (1200×630) at public/og.png and reference it here.
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}
