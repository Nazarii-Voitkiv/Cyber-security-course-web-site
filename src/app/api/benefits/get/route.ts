// GET: app/api/benefits/get/route.ts
import { NextResponse } from 'next/server';
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

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'private-data', 'benefits.json');
        const fileContent = await fs.readFile(filePath, 'utf8');
        const data: BenefitsData = JSON.parse(fileContent);

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('GET /api/benefits/get error:', error);
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'An unknown error occurred' 
        }, { status: 500 });
    }
}