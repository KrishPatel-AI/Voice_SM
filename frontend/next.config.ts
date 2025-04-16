import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows builds with ESLint errors
    ignoreDuringBuilds: true,
  },

  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/market-indices/:path*',
        destination: 'http://localhost:5000/market-indices/:path*',
      },
      {
        source: '/ws/:path*',
        destination: 'http://localhost:5000/ws/:path*',
      },
    ];
  },
};

export default nextConfig;
