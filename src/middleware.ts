import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import redis from './lib/redis';
import logger from './lib/logger';

// Конфігурація rate limiting
const RATE_LIMIT_CONFIG = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Ліміт запитів
  blockDuration: 60 * 60, // 1 година блокування
};

// Функція для генерації випадкового nonce
async function generateNonce(): Promise<string> {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Buffer.from(array).toString('base64');
}

// Перевірка rate limit
async function checkRateLimit(ip: string): Promise<boolean> {
  const key = `ratelimit:${ip}`;
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_CONFIG.windowMs;

  try {
    // Перевіряємо чи IP заблокований
    const isBlocked = await redis.get(`blocked:${ip}`);
    if (isBlocked) {
      return false;
    }

    // Отримуємо всі запити в поточному вікні
    const requests = await redis.zrangebyscore(key, windowStart, now);
    
    if (requests.length >= RATE_LIMIT_CONFIG.max) {
      // Блокуємо IP
      await redis.setex(`blocked:${ip}`, RATE_LIMIT_CONFIG.blockDuration, '1');
      logger.warn(`IP ${ip} blocked for rate limit violation`);
      return false;
    }

    // Додаємо новий запит
    await redis.zadd(key, now, `${now}`);
    await redis.expire(key, Math.floor(RATE_LIMIT_CONFIG.windowMs / 1000));
    
    return true;
  } catch (error) {
    logger.error('Rate limit error:', error);
    return true; // У випадку помилки пропускаємо запит
  }
}

// Функція для отримання security headers
async function getSecurityHeaders(nonce: string): Promise<Record<string, string>> {
  return {
    'Content-Security-Policy': `
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https:;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      block-all-mixed-content;
      upgrade-insecure-requests;
    `.replace(/\s+/g, ' ').trim(),
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };
}

export async function middleware(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Логуємо кожен запит
    logger.info('Incoming request', {
      ip,
      method: request.method,
      url: request.url,
      userAgent: request.headers.get('user-agent')
    });

    // Перевіряємо rate limit
    const isAllowed = await checkRateLimit(ip);
    if (!isAllowed) {
      logger.warn(`Rate limit exceeded for IP: ${ip}`);
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': String(RATE_LIMIT_CONFIG.blockDuration)
        }
      });
    }

    // Захист адмін роутів
    if (request.nextUrl.pathname.startsWith('/admin')) {
      try {
        const token = await getToken({ req: request });
        if (!token && request.nextUrl.pathname !== '/admin/login') {
          logger.warn(`Unauthorized access attempt to admin route: ${request.nextUrl.pathname}`);
          return NextResponse.redirect(new URL('/admin/login', request.url));
        }
      } catch (error) {
        logger.error('Authentication error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
      }
    }

    // Базова відповідь
    const response = NextResponse.next();
    
    // Видаляємо небезпечні заголовки
    response.headers.delete('x-powered-by');
    
    // Додаємо security headers
    const nonce = await generateNonce();
    const securityHeaders = await getSecurityHeaders(nonce);
    
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    logger.error('Middleware error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
