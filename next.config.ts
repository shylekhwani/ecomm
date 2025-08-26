import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
  domains: ["lh3.googleusercontent.com"],
  remotePatterns: [
     {
      protocol: 'https',
      hostname: 'cdn.sanity.io',
      // port: '',
      // pathname: '/images/**',
     },
   ],
  },
  typescript:{
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
