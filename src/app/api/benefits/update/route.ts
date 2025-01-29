// POST: app/api/benefits/update/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const filePath = path.join(process.cwd(), 'src', 'data', 'benefits.json');
        fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf8');

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('POST /api/benefits/update error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
