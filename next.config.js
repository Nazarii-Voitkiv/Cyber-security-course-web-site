/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'example.com', 'your-storage-domain.com'],
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.facebook.com; " +
              "style-src 'self' 'unsafe-inline'; " +
              "img-src 'self' data: https://www.facebook.com; " +
              "font-src 'self'; " +
              "connect-src 'self'; " +
              "media-src 'self'; " +
              "frame-src 'self' https://www.facebook.com;"
          }
        ]
      }
    ];
  },
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    isrMemoryCacheSize: 0,
    serverActions: true
  },
};

module.exports = nextConfig;
