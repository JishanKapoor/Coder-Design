/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // ✅ Static export for GoDaddy (only in production build)
  // This allows API routes to work in development mode
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  
  // ✅ Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Disable image optimization for static export (GoDaddy doesn't support it)
  images: {
    unoptimized: true,
  },
  
  // Trailing slash for better compatibility
  trailingSlash: true,
};

export default nextConfig;
