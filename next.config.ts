import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Three Fiber components are loaded via dynamic imports with ssr: false
  // No additional webpack/turbopack configuration needed
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
