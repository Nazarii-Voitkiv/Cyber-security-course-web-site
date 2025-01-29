import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Можна додатково перевірити, чи є body.title / body.reasons тощо

        const filePath = path.join(process.cwd(), 'src', 'data', 'whyCourse.json');
        fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf8');

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('POST /api/whycourse/update error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
