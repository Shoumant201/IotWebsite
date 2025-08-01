import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds for deployment
    ignoreDuringBuilds: process.env.DISABLE_ESLINT_PLUGIN === 'true',
  },
  typescript: {
    // Disable type checking during builds for deployment if needed
    ignoreBuildErrors: process.env.DISABLE_ESLINT_PLUGIN === 'true',
  },
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true, // Required for static export
  },
  // Enable static export for Netlify
  output: 'export',
  trailingSlash: true,
  // Disable image optimization for static export
  distDir: 'out',
}

export default nextConfig