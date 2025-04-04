import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface Plan {
    title: string;
    description: string;
    originalPrice: string;
    price: string;
    discount: string;
    features: string[];
    recommended?: boolean;
    link: string;
}

interface ComparePlansData {
    title: string;
    specialOfferBanner: string;
    featuresTitle: string;
    plans: Plan[];
    featuresComparison: {
        name: string;
        basic: boolean | string;
        full: boolean | string;
    }[];
}

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'private-data', 'comparePlans.json');
        const fileContent = await fs.readFile(filePath, 'utf8');
        const data: ComparePlansData = JSON.parse(fileContent);

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('GET /api/compareplans/get error:', error);
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'An unknown error occurred' 
        }, { status: 500 });
    }
}