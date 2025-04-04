import { NextRequest, NextResponse } from 'next/server';
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

export async function POST(request: NextRequest) {
    try {
        const data: ComparePlansData = await request.json();
        const filePath = path.join(process.cwd(), 'private-data/compareplans.json');
        
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating compare plans:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update compare plans' },
            { status: 500 }
        );
    }
}