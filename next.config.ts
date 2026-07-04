import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The hero photograph is rendered large and full-bleed; allow a
    // higher-fidelity quality tier than the Next default so the founder
    // portrait stays crisp under the cinematic grade. (Next 16 requires
    // any non-default `quality` to be declared here.)
    qualities: [75, 90, 100],
    // Collections/Services pages use licensed Unsplash stock photography
    // served straight from Unsplash's CDN (per the content spec).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
