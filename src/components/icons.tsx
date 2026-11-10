import type { IconType } from "react-icons";
import {
  SiCss,
  SiDocker,
  SiDribbble,
  SiElectron,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiGitlab,
  SiHtml5,
  SiInstagram,
  SiJavascript,
  SiMui,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiReactquery,
  SiRedux,
  SiRust,
  SiStorybook,
  SiTailwindcss,
  SiTurborepo,
  SiTypescript,
  SiVercel,
  SiVite,
  SiWebgl,
  SiX,
} from "react-icons/si";
import { FaInfinity, FaLinkedinIn, FaMasksTheater } from "react-icons/fa6";
import { GiBearFace } from "react-icons/gi";
import { MdPointOfSale } from "react-icons/md";
import type { SocialKind } from "@/content/types";

/**
 * Line-art logos (React, Electron, Redux, TanStack Query, Node.js, Figma) render much thinner than the solid marks
 * around them; tracing their outline thickens them to the same visual weight.
 */
function bold(Icon: IconType): IconType {
  return function BoldIcon(props) {
    return <Icon strokeWidth={1.3} strokeLinejoin="round" {...props} stroke="currentColor" />;
  };
}

/** Skill icon keys used in content/shared.ts. */
export const skillIcons: Record<string, IconType> = {
  typescript: SiTypescript,
  javascript: SiJavascript,
  html: SiHtml5,
  css: SiCss,
  react: bold(SiReact),
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  framer: SiFramer,
  reactquery: bold(SiReactquery),
  git: SiGit,
  docker: SiDocker,
  figma: bold(SiFigma),
  vite: SiVite,
  storybook: SiStorybook,
  vercel: SiVercel,
  rust: SiRust,
  webgl: SiWebgl,
  nodejs: bold(SiNodedotjs),
  electron: bold(SiElectron),
  mui: SiMui,
  redux: bold(SiRedux),
  turborepo: SiTurborepo,
  gitlab: SiGitlab,
  // No official marks in Simple Icons — filled stand-ins (to match the brand marks) drawn from each idea.
  zustand: GiBearFace, // Zustand's mascot is a bear
  playwright: FaMasksTheater, // Playwright's logo is a pair of theatre masks
  mpos: MdPointOfSale, // mobile point-of-sale
  devops: FaInfinity, // the DevOps loop
};

export const socialIcons: Record<SocialKind, IconType> = {
  github: SiGithub,
  linkedin: FaLinkedinIn,
  x: SiX,
  instagram: SiInstagram,
  dribbble: SiDribbble,
};
