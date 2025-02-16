import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Кешування
let cachedData: Record<string, unknown> | null = null;
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
    const range = 'Sheet6!A1:Z100'; // adjust range as needed for LearningProcess data
    const response = await sheets.spreadsheets.values.get({ spreadsheetId, range, key: apiKey });
    const rows = response.data.values || [];
    
    let learningProcessData: Record<string, unknown> = {};
    if (rows.length > 1) {
      const headers = rows[0];
      const values = rows[1];
      learningProcessData = headers.reduce((acc: Record<string, unknown>, header: string, index: number) => {
        acc[header] = values[index];
        return acc;
      }, {});

      if (learningProcessData.features && typeof learningProcessData.features === 'string') {
        try {
          learningProcessData.features = JSON.parse(learningProcessData.features);
        } catch (err) {
          console.error("Error parsing features:", err);
          learningProcessData.features = [];
        }
      }
      
      if (learningProcessData.processSteps && typeof learningProcessData.processSteps === 'string') {
        try {
          learningProcessData.processSteps = JSON.parse(learningProcessData.processSteps);
        } catch (err) {
          console.error("Error parsing processSteps:", err);
          learningProcessData.processSteps = [];
        }
      }
    }

    // Оновлюємо кеш
    cachedData = learningProcessData;
    cacheTimestamp = now;
    
    return NextResponse.json(
      { success: true, data: learningProcessData },
      { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=30' } }
    );
  } catch (error: unknown) {
    console.error('GET /api/learningprocess/get error:', error);
    return NextResponse.json(
      { success: false, error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}