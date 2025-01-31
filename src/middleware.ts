// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server';
import logger from './lib/logger';

// Security headers
const securityHeaders = {
  'Content-Security-Policy':
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net https://www.facebook.com; " +
      "style-src 'self' 'unsafe-inline'; " +
      "font-src 'self'; " +
      "img-src 'self' data: https: https://www.facebook.com; " +
      "connect-src 'self' https://connect.facebook.net https://www.facebook.com; " +
      "frame-src 'self' https://www.facebook.com;",
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
};

export default withAuth(
  function middleware(req) {
    const response = NextResponse.next();
    
    // Add security headers
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    // Request logging
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ||
        req.headers.get('x-real-ip') ||
        'unknown';

    logger.info('Incoming request', {
      ip,
      method: req.method,
      url: req.url,
      userAgent: req.headers.get('user-agent') || 'unknown'
    });

    return response;
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith("/admin/dashboard")) {
          return token !== null;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};