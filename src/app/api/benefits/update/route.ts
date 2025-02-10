// POST: app/api/benefits/update/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface Benefit {
    title: string;
    description: string;
    icon?: string;
}

interface BenefitsData {
    title: string;
    subtitle: string;
    benefits: Benefit[];
}

export async function POST(request: NextRequest) {
    try {
        const data: BenefitsData = await request.json();
        const filePath = path.join(process.cwd(), 'private-data', 'benefits.json');
        
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('POST /api/benefits/update error:', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' },
            { status: 500 }
        );
    }
}
