import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Un hébergement mutualisé limite le nombre de processus : un seul travailleur suffit.
  experimental: { cpus: 1 },
};

export default nextConfig;
