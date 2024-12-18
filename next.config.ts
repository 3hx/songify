import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    SITE_NAME: "Songify",
    SITE_URL: process.env.NEXT_PUBLIC_BASE_URL || "https://songify.com",
    SITE_DESCRIPTION: "Create personalized, custom songs for your loved ones",
  },
};

export default nextConfig;
