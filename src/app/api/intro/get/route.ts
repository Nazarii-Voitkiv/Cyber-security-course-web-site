import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'src', 'data', 'intro.json');
        const fileData = fs.readFileSync(filePath, 'utf8');
        const introData = JSON.parse(fileData);

        return NextResponse.json({ success: true, data: introData });
    } catch (error: unknown) {
        console.error('GET /api/intro/get error:', error);
        return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 500 });
    }
}
