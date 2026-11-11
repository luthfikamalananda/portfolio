import { Bricolage_Grotesque, Caveat, Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import type { Locale } from "@/content";
import { siteConfig } from "@/lib/site";
import { Analytics } from "./Analytics";
import "@/app/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
// Variable axes are used by the Hero name (weight + width react to the cursor).
// Handwriting for paper objects on the desk (notebook page, name tag).
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], axes: ["wdth", "opsz"] });

// Runs before first paint: applies the Visitor's saved theme (or, with none saved, the OS light/dark preference), and decides
// whether the intro curtain plays (first visit this session, motion allowed, right after a Locale switch — or forced with ?intro).
const headScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.setAttribute("data-theme",t)}catch(e){}try{var force=location.search.indexOf("intro")>-1;var next=sessionStorage.getItem("intro-next");if(next)sessionStorage.removeItem("intro-next");var calm=matchMedia("(prefers-reduced-motion: reduce)").matches;if(force||next||(!calm&&!sessionStorage.getItem("intro-seen"))){d.setAttribute("data-intro","play");sessionStorage.setItem("intro-seen","1")}}catch(e){}})()`;

/** The <html>/<body> shell shared by both Locale root layouts. */
export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html
      lang={locale}
      data-theme="light"
      data-accent={siteConfig.accent}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${caveat.variable} antialiased`}
    >
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router root layout, per Next docs */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
      </head>
      <body className="grain min-h-dvh overflow-x-clip">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
