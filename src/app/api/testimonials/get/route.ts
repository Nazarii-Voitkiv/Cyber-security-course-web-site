import { NextResponse } from 'next/server';
import { google } from 'googleapis';

interface Testimonial {
  id: string | number;
  rating: number;
  content: string;
  name: string;
  position: string;
  image: string;
}

interface TestimonialsData {
  testimonials: Testimonial[];
}

// Кешування
let cachedData: TestimonialsData | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 1000; // 60 секунд

export async function GET() {
  try {
    const now = Date.now();
    if (cachedData && now - cacheTimestamp < CACHE_DURATION) {
      return NextResponse.json(
        { success: true, data: cachedData },
        { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=30' } }
      );
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!apiKey || !spreadsheetId) {
      throw new Error('Missing GOOGLE_API_KEY or SPREADSHEET_ID.');
    }
    const sheets = google.sheets({ version: 'v4' });
    const range = 'Sheet9!A1:A2'; // читаємо лише перший стовпець, два рядки
    const response = await sheets.spreadsheets.values.get({ spreadsheetId, range, key: apiKey });
    const rows = response.data.values || [];
    
    const testimonialsData: TestimonialsData = { testimonials: [] };
    if (rows.length >= 2 && rows[0][0] === 'testimonials') {
      try {
        testimonialsData.testimonials = JSON.parse(rows[1][0]);
      } catch (err) {
        console.error("Error parsing testimonials JSON:", err);
      }
    }

    // Оновлюємо кеш
    cachedData = testimonialsData;
    cacheTimestamp = now;

    return NextResponse.json(
      { success: true, data: testimonialsData },
      { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=30' } }
    );
  } catch (error: unknown) {
    console.error('GET /api/testimonials/get error:', error);
    return NextResponse.json(
      { success: false, error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}