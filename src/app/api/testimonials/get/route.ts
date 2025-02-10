import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface Testimonial {
    id: string;
    rating: number;
    content: string;
    name: string;
    position: string;
    image: string;
}

interface TestimonialsData {
    testimonials: Testimonial[];
}

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'private-data', 'testimonials.json');
        const fileContent = await fs.readFile(filePath, 'utf8');
        const data: TestimonialsData = JSON.parse(fileContent);

        return NextResponse.json({ success: true, data: data });
    } catch (error) {
        console.error('GET /api/testimonials/get error:', error);
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'An unknown error occurred' 
        }, { status: 500 });
    }
}
