import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // За потреби можна перевіряти, чи body має потрібні поля
        // (heroTitle, heroSubtitle тощо)

        const filePath = path.join(process.cwd(), 'src', 'data', 'hero.json');
        fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf8');

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error('POST /api/hero/update error:', error);
        return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 500 });
    }
}
