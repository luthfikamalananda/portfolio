import type { NextConfig } from "next";

// See docs/adr/0001-nextjs-static-export.md — this site is ALWAYS a static export.
// NEXT_PUBLIC_BASE_PATH lets the same build live under a sub-path (unused while hosted at a domain root).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: { unoptimized: true },
  // Lets you open the dev server at http://127.0.0.1:3000 as well as localhost.
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
