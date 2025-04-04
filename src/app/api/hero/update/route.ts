import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const filePath = path.join(process.cwd(), 'private-data', 'hero.json');
        fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf8');

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error('POST /api/hero/update error:', error);
        return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 500 });
    }
}