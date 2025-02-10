import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface Testimonial {
    name: string;
    position: string;
    text: string;
    image?: string;
}

interface TestimonialsData {
    testimonials: Testimonial[];
}

export async function POST(request: NextRequest) {
    try {
        const data: TestimonialsData = await request.json();
        const filePath = path.join(process.cwd(), 'private-data/testimonials.json');
        
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating testimonials:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update testimonials' },
            { status: 500 }
        );
    }
}