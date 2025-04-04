import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface LearningProcessStep {
    title: string;
    description: string;
    icon?: string;
}

interface LearningProcessData {
    title: string;
    subtitle: string;
    steps: LearningProcessStep[];
}

export async function POST(request: NextRequest) {
    try {
        const data: LearningProcessData = await request.json();
        const filePath = path.join(process.cwd(), 'private-data', 'learningProcess.json');
        
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('POST /api/learningprocess/update error:', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' },
            { status: 500 }
        );
    }
}