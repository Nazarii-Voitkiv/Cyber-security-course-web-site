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
        const range = 'Sheet1!A1:Z100'; // adjust range as needed
        const response = await sheets.spreadsheets.values.get({ spreadsheetId, range, key: apiKey });
        const rows = response.data.values || [];
        
        let heroData: Record<string, unknown> = {};
        if (rows.length > 1) {
            const headers = rows[0];
            const values = rows[1];
            heroData = headers.reduce((acc: Record<string, unknown>, header: string, index: number) => {
                acc[header] = values[index];
                return acc;
            }, {});

            if (heroData.courseTypes && typeof heroData.courseTypes === 'string') {
                try {
                    heroData.courseTypes = JSON.parse(heroData.courseTypes);
                } catch (err) {
                    console.error("Error parsing courseTypes:", err);
                    heroData.courseTypes = [];
                }
            }
        }

        // Оновлюємо кеш
        cachedData = heroData;
        cacheTimestamp = now;
        
        return NextResponse.json(
            { success: true, data: heroData },
            { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=30' } }
        );
    } catch (error: unknown) {
        console.error('GET /api/hero/get error:', error);
        return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 500 });
    }
}