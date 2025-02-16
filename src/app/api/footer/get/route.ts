import { NextResponse } from 'next/server';
import { google } from 'googleapis';

interface FooterData {
    contacts: {
        email: string;
        workHours: string;
    };
    socialLinks: Array<{
        name: string;
        url: string;
    }>;
    docs: Array<{
        title: string;
        url: string;
    }>;
    copyright: string;
}

// Кешування
let cachedData: FooterData | null = null;
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
        const range = 'Sheet11!A1:A2'; // у A1 - 'footer', у A2 - JSON
        const response = await sheets.spreadsheets.values.get({ spreadsheetId, range, key: apiKey });
        const rows = response.data.values || [];

        let footerData: FooterData | null = null;
        if (rows.length >= 2 && rows[0][0] === 'footer') {
            try {
                footerData = JSON.parse(rows[1][0]);
            } catch (err) {
                console.error('Error parsing footer JSON:', err);
            }
        }

        // Оновлюємо кеш
        cachedData = footerData;
        cacheTimestamp = now;

        return NextResponse.json(
            { success: true, data: footerData },
            { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=30' } }
        );
    } catch (error) {
        console.error('Error reading footer data:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to read footer data' },
            { status: 500 }
        );
    }
}