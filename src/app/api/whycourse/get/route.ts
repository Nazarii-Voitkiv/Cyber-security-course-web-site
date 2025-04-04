import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface WhyCourseReason {
    title: string;
    description: string;
    icon?: string;
}

interface WhyCourseData {
    title: string;
    subtitle: string;
    reasons: WhyCourseReason[];
}

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'private-data', 'whyCourse.json');
        const fileContent = await fs.readFile(filePath, 'utf8');
        const data: WhyCourseData = JSON.parse(fileContent);

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('GET /api/whycourse/get error:', error);
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'An unknown error occurred' 
        }, { status: 500 });
    }
}