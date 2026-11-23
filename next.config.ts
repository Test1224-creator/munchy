import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Serve AVIF to browsers that support it (smallest), WebP otherwise.
    formats: ["image/avif", "image/webp"],
    // Only allowed quality: every <Image> (default 75) is served at 90 so photos stay crisp.
    qualities: [90],
    // Optimized images are cached for 30 days.
    minimumCacheTTL: 2592000,
  },
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
