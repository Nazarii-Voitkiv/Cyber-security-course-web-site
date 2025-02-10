import { NextRequest, NextResponse } from 'next/server';
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

export async function POST(request: NextRequest) {
    try {
        const data: WhyCourseData = await request.json();
        const filePath = path.join(process.cwd(), 'private-data', 'whyCourse.json');
        
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('POST /api/whycourse/update error:', error);
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'An unknown error occurred' 
        }, { status: 500 });
    }
}
