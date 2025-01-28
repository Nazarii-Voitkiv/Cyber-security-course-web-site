// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import logger from './lib/logger';

// Security headers
const securityHeaders = {
  'Content-Security-Policy':
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net; " +
      "style-src 'self' 'unsafe-inline'; " +
      "font-src 'self'; " +
      "img-src 'self' data: https:; " +
      "connect-src 'self' https://connect.facebook.net; " +
      "frame-src 'self' https://www.facebook.com;",
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
};

// Paths that don't require security headers and rate limiting
const whitelist = [
  '/_next',
  '/images',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml'
];

export async function middleware(request: NextRequest) {
  try {
    // Authentication check for admin dashboard
    // Перевірка автентифікації для адмін-панелі
    const isAuthenticated = request.cookies.get('isAuthenticated')?.value;

    if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }

    // Request logging
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
        request.headers.get('x-real-ip') ||
        'unknown';

    logger.info('Incoming request', {
      ip,
      method: request.method,
      path: request.nextUrl.pathname,
      userAgent: request.headers.get('user-agent')
    });

    // Check whitelist paths
    if (whitelist.some(path => request.nextUrl.pathname.startsWith(path))) {
      const response = NextResponse.next();
      addSecurityHeaders(response);
      return response;
    }

    // Default response for other paths
    const response = NextResponse.next();
    addSecurityHeaders(response);
    return response;

  } catch (error) {
    logger.error('Middleware error:', error);
    const response = NextResponse.next();
    addSecurityHeaders(response);
    return response;
  }

  return NextResponse.next();
}

// Helper function to add security headers
function addSecurityHeaders(response: NextResponse) {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};