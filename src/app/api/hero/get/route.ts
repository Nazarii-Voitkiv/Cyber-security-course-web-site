import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'private-data', 'hero.json');
        const fileData = fs.readFileSync(filePath, 'utf8');
        const heroData = JSON.parse(fileData);

        return NextResponse.json({ success: true, data: heroData });
    } catch (error: unknown) {
        console.error('GET /api/hero/get error:', error);
        return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 500 });
    }
}
