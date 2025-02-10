import { NextResponse, NextRequest } from 'next/server';
import { validateTokenEdge } from './lib/edge-auth';
import logger from './lib/logger';

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

const publicSecurityHeaders = {
    'Content-Security-Policy':
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net https://www.facebook.com; " +
        "style-src 'self' 'unsafe-inline'; " +
        "font-src 'self'; " +
        "img-src 'self' data: https: https://www.facebook.com; " +
        "connect-src 'self' https://connect.facebook.net https://www.facebook.com; " +
        "frame-src 'self' https://www.facebook.com; " +
        "form-action 'self'; " +
        "media-src 'self'; " +
        "object-src 'none';",
    'X-DNS-Prefetch-Control': 'on',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
};

export async function middleware(req: NextRequest) {
    const response = NextResponse.next();
    
    if (req.nextUrl.pathname.startsWith('/admin')) {
        Object.entries(adminSecurityHeaders).forEach(([key, value]) => {
            response.headers.set(key, value);
        });

        const publicPaths = ['/admin', '/api/auth/verify', '/api/auth/login'];
        if (publicPaths.includes(req.nextUrl.pathname)) {
            return response;
        }

        const cookies = req.cookies;
        console.log('All cookies:', cookies);
        
        const token = cookies.get('token')?.value;
        console.log('Found token in cookies:', token ? 'yes' : 'no');
        
        if (!token) {
            console.log('No token found, redirecting to login');
            return NextResponse.redirect(new URL('/admin', req.url));
        }

        const isValidToken = await validateTokenEdge(token);
        console.log('Token validation result:', isValidToken);

        if (!isValidToken) {
            console.log('Invalid token, redirecting to login');
            if (req.nextUrl.pathname.startsWith('/api/')) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            return NextResponse.redirect(new URL('/admin', req.url));
        }

        console.log('Token is valid, allowing access to:', req.nextUrl.pathname);
    } else {
        Object.entries(publicSecurityHeaders).forEach(([key, value]) => {
            response.headers.set(key, value);
        });
    }

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
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)'
    ]
};