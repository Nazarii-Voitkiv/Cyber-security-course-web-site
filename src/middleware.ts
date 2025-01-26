import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import logger from './lib/logger';
import crypto from 'crypto';

// Security headers
const securityHeaders = {
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "font-src 'self'; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self';",
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
};

// Paths that don't require rate limiting
const whitelist = [
  '/_next',
  '/images',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml'
];

export async function middleware(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Логуємо кожен запит
    logger.info('Incoming request', {
      ip,
      method: request.method,
      path: request.nextUrl.pathname,
      userAgent: request.headers.get('user-agent')
    });

    // Перевіряємо чи шлях в білому списку
    if (whitelist.some(path => request.nextUrl.pathname.startsWith(path))) {
      const response = NextResponse.next();
      // Додаємо заголовки безпеки
      Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
      return response;
    }

    const response = NextResponse.next();
    
    // Додаємо заголовки безпеки
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    logger.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
