// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server';
import logger from './lib/logger';

// Security headers for admin routes
const adminSecurityHeaders = {
  'Content-Security-Policy':
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "font-src 'self'; " +
      "img-src 'self' data: https:; " +
      "connect-src 'self'; " +
      "frame-src 'self';",
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
};

// Security headers for public routes (with Facebook Pixel)
const publicSecurityHeaders = {
  'Content-Security-Policy':
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net; " +
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

// This middleware will run on all routes
export default withAuth(
  function middleware(req) {
    const response = NextResponse.next();
    
    // Add appropriate security headers based on route
    if (req.nextUrl.pathname.startsWith('/admin')) {
      Object.entries(adminSecurityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
    } else {
      Object.entries(publicSecurityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
    }

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
        // /admin is public
        if (req.nextUrl.pathname === '/admin') {
          return true;
        }
        // /admin/dashboard/* requires authentication
        if (req.nextUrl.pathname.startsWith('/admin/dashboard')) {
          return !!token;
        }
        // All other routes are public
        return true;
      },
    },
  }
);

// Configure middleware to run on all routes except static files
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
};