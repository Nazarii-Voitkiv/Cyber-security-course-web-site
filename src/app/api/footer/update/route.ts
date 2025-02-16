import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

interface FooterData {
    contacts: {
        email: string;
        phone: string;
        workHours: string;
    };
    socialLinks: {
        name: string;
        url: string;
    }[];
    docs: {
        title: string;
        url: string;
    }[];
    copyright: string;
}

export async function POST(request: NextRequest) {
    try {
        const data: FooterData = await request.json();
        console.log('Received footer data:', data);

        const spreadsheetId = process.env.SPREADSHEET_ID;
        const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
        const privateKey = process.env.GOOGLE_PRIVATE_KEY;

        if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
            throw new Error('Missing required environment variables');
        }

        const auth = new JWT({
            email: serviceAccountEmail,
            key: privateKey.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });

        const sheets = google.sheets({ version: 'v4', auth });
        
        const updateValues = [
            ['footer'],
            [JSON.stringify(data)]
        ];

        console.log('Updating footer with values:', updateValues);

        const updateResult = await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: 'Sheet11!A1:A2',
            valueInputOption: 'RAW',
            requestBody: {
                values: updateValues
            }
        });

        console.log('Footer update result:', updateResult.status);
        
        return NextResponse.json(
            { success: true },
            { headers: { 'Cache-Control': 'no-store, must-revalidate' } }
        );
    } catch (error) {
        console.error('POST /api/footer/update error:', error);
        return NextResponse.json(
            { success: false, error: 'An unknown error occurred' },
            { status: 500 }
        );
    }
}