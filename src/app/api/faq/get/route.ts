import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface FaqData {
    faqs: {
        question: string;
        answer: string;
    }[];
}

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'src/data/faq.json');
        const fileContent = await fs.readFile(filePath, 'utf8');
        const data: FaqData = JSON.parse(fileContent);

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error reading FAQ data:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to read FAQ data' },
            { status: 500 }
        );
    }
}
