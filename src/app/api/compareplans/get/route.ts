import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Зберігаємо кешовані дані та час останнього оновлення
let cachedComparePlanData: Record<string, unknown> | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 1000; // 60 секунд

export async function GET() {
  try {
    const now = Date.now();
    // Якщо кеш є і ще припустимий – повертаємо кешовані дані
    if (cachedComparePlanData && now - cacheTimestamp < CACHE_DURATION) {
      return NextResponse.json(
        { success: true, data: cachedComparePlanData },
        { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=30' } }
      );
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!apiKey || !spreadsheetId) {
      throw new Error('Missing GOOGLE_API_KEY or SPREADSHEET_ID.');
    }
    const sheets = google.sheets({ version: 'v4' });
    const range = 'Sheet8!A1:Z100'; // adjust range as needed for ComparePlan data
    const response = await sheets.spreadsheets.values.get({ spreadsheetId, range, key: apiKey });
    const rows = response.data.values || [];
    
    let comparePlanData: Record<string, unknown> = {};
    if (rows.length > 1) {
      const headers = rows[0];
      const values = rows[1];
      comparePlanData = headers.reduce((acc: Record<string, unknown>, header: string, index: number) => {
        acc[header] = values[index];
        return acc;
      }, {});

      if (comparePlanData.plans && typeof comparePlanData.plans === 'string') {
        try {
          let plansStr = comparePlanData.plans.trim();
          if (plansStr.startsWith('{') && plansStr.endsWith('}]')) {
            plansStr = '[' + plansStr.slice(0, -1) + ']';
          }
          if (plansStr.startsWith('[') && plansStr.endsWith(']')) {
            comparePlanData.plans = JSON.parse(plansStr);
          } else {
            console.error("Plan string is not valid JSON format:", plansStr);
            comparePlanData.plans = [];
          }
        } catch (err) {
          console.error("Error parsing plans:", err);
          comparePlanData.plans = [];
        }
      }
      
      if (comparePlanData.featuresComparison && typeof comparePlanData.featuresComparison === 'string') {
        try {
          comparePlanData.featuresComparison = JSON.parse(comparePlanData.featuresComparison);
        } catch (err) {
          console.error("Error parsing featuresComparison:", err);
          comparePlanData.featuresComparison = [];
        }
      }
    }
    
    // Оновлюємо кешовані дані
    cachedComparePlanData = comparePlanData;
    cacheTimestamp = Date.now();
    
    return NextResponse.json(
      { success: true, data: comparePlanData },
      { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=30' } }
    );
  } catch (error: unknown) {
    console.error('GET /api/compareplans/get error:', error);
    return NextResponse.json(
      { success: false, error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}