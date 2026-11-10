import type { ReactNode } from "react";
import { RootShell } from "@/components/RootShell";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("id");

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell locale="id">{children}</RootShell>;
}
