import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Можна додати мінімальну валідацію полів, щоб переконатися,
        // що heroTitle, heroSubtitle та courseTypes існують

        const filePath = path.join(process.cwd(), 'src', 'data', 'heroContent.json');
        fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf8');

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
