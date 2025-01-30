import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface FaqData {
    faqs: {
        question: string;
        answer: string;
    }[];
}

export async function POST(request: NextRequest) {
    try {
        const data: FaqData = await request.json();
        const filePath = path.join(process.cwd(), 'src/data/faq.json');
        
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating FAQ:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update FAQ' },
            { status: 500 }
        );
    }
}
