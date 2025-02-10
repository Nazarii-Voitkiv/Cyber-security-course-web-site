import { NextResponse } from 'next/server';
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

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'private-data', 'program.json');
        const fileContent = await fs.readFile(filePath, 'utf8');
        const data: ProgramData = JSON.parse(fileContent);

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('GET /api/program/get error:', error);
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'An unknown error occurred' 
        }, { status: 500 });
    }
}