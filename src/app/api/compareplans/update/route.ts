import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

interface Plan {
    title: string;
    description: string;
    originalPrice: string;
    price: string;
    discount: string;
    features: string[];
    recommended?: boolean;
    link: string;
}

interface ComparePlansData {
    title: string;
    specialOfferBanner: string;
    featuresTitle: string;
    plans: Plan[];
    featuresComparison: {
        name: string;
        basic: boolean | string;
        full: boolean | string;
    }[];
}

export async function POST(request: NextRequest) {
    try {
        const data: ComparePlansData = await request.json();
        console.log('Received data:', data);

        const spreadsheetId = process.env.SPREADSHEET_ID;
        const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
        const privateKey = process.env.GOOGLE_PRIVATE_KEY;

        if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
            throw new Error('Missing required environment variables');
        }

        // Створюємо JWT клієнт з сервісним акаунтом
        const auth = new JWT({
            email: serviceAccountEmail,
            key: privateKey.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });

        const sheets = google.sheets({ version: 'v4', auth });
        
        const updateValues = [
            ['plans', 'title', 'specialOfferBanner', 'featuresTitle', 'featuresComparison'],
            [
                JSON.stringify(data.plans || []),
                data.title || '',
                data.specialOfferBanner || '',
                data.featuresTitle || '',
                JSON.stringify(data.featuresComparison || [])
            ]
        ];

        console.log('Updating with values:', updateValues);

        const updateResult = await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: 'Sheet8!A1:E2',
            valueInputOption: 'RAW',
            requestBody: {
                values: updateValues
            }
        });

        console.log('Update result:', updateResult.status);
        
        return NextResponse.json(
            { success: true },
            { 
                headers: { 
                    'Cache-Control': 'no-store, must-revalidate',
                    'Pragma': 'no-cache'
                } 
            }
        );
    } catch (error: unknown) {
        console.error('POST /api/compareplans/update error:', error);
        return NextResponse.json(
            { success: false, error: 'An unknown error occurred' },
            { status: 500 }
        );
    }
}