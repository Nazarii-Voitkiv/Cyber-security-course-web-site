import { NextResponse } from 'next/server';

export async function POST() {
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = [
    'token=',
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    isProduction ? 'Secure' : '',
    'Max-Age=0',
    'Expires=Thu, 01 Jan 1970 00:00:00 GMT'
  ].filter(Boolean).join('; ');

  const response = NextResponse.json({ success: true }, { status: 200 });
  response.headers.set('Set-Cookie', cookieOptions);
  return response;
}