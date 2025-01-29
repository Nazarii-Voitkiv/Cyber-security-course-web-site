import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'src', 'data', 'program.json');
        const fileData = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);

        return NextResponse.json({ success: true, data: jsonData });
    } catch (error: any) {
        console.error('GET /api/program/get error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
