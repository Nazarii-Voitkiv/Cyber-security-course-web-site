import { NextResponse } from 'next/server';
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

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'private-data', 'learningProcess.json');
        const fileContent = await fs.readFile(filePath, 'utf8');
        const data: LearningProcessData = JSON.parse(fileContent);

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('GET /api/learningprocess/get error:', error);
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'An unknown error occurred' 
        }, { status: 500 });
    }
}
