import { NextResponse } from 'next/server';
import { google } from 'googleapis';

interface FAQ {
  question: string;
  answer: string;
}

interface FaqData {
  faqs: FAQ[];
}

// Кешування
let cachedData: FaqData | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 1000;

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
    const range = 'Sheet10!A1:A2'; // в A1 має бути "faq", в A2 — рядок JSON
    const response = await sheets.spreadsheets.values.get({ spreadsheetId, range, key: apiKey });
    const rows = response.data.values || [];
    
    const faqData: FaqData = { faqs: [] };
    if (rows.length >= 2 && rows[0][0] === 'faq') {
      try {
        faqData.faqs = JSON.parse(rows[1][0]);
      } catch (err) {
        console.error("Error parsing FAQ JSON:", err);
      }
    }
    
    // Оновлюємо кеш
    cachedData = faqData;
    cacheTimestamp = now;

    return NextResponse.json(
      { success: true, data: faqData },
      { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=30' } }
    );
  } catch (error: unknown) {
    console.error('GET /api/faq/get error:', error);
    return NextResponse.json(
      { success: false, error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}