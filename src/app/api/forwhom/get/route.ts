// GET: app/api/forwhom/get/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface ForWhomGroup {
    title: string;
    description: string;
    image: string;
}

interface ForWhomData {
    title: string;
    subtitle: string;
    groups: ForWhomGroup[];
}

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'private-data', 'forWhom.json');
        const fileContent = await fs.readFile(filePath, 'utf8');
        const data: ForWhomData = JSON.parse(fileContent);

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('GET /api/forwhom/get error:', error);
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'An unknown error occurred' 
        }, { status: 500 });
    }
}
