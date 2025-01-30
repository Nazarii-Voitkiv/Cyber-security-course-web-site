// POST: app/api/forwhom/update/route.ts
import { NextRequest, NextResponse } from 'next/server';
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

export async function POST(request: NextRequest) {
    try {
        const data: ForWhomData = await request.json();
        const filePath = path.join(process.cwd(), 'src', 'data', 'forWhom.json');
        
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('POST /api/forwhom/update error:', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' },
            { status: 500 }
        );
    }
}
