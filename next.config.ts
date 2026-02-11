/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization (Vercel supports this natively)
  images: {
    unoptimized: true,
  },

  // Trailing slash for consistent URLs
  trailingSlash: true,
};

export default nextConfig;
