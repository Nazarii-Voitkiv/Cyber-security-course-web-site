import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface ProgramModule {
    title: string;
    description: string;
    topics: string[];
}

interface ProgramData {
    title: string;
    subtitle: string;
    modules: ProgramModule[];
}

export async function POST(request: NextRequest) {
    try {
        const data: ProgramData = await request.json();
        const filePath = path.join(process.cwd(), 'src', 'data', 'program.json');
        
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('POST /api/program/update error:', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' },
            { status: 500 }
        );
    }
}
