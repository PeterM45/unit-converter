import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // Optimize bundle size by tree-shaking icon imports
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
