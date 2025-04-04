import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface FooterData {
    contacts: {
        email: string;
        phone: string;
        workHours: string;
    };
    socialLinks: {
        name: string;
        url: string;
    }[];
    docs: {
        title: string;
        url: string;
    }[];
    copyright: string;
}

export async function POST(request: NextRequest) {
    try {
        const data: FooterData = await request.json();
        const filePath = path.join(process.cwd(), 'private-data/footer.json');
        
        await fs.writeFile(filePath, JSON.stringify({ data }, null, 2), 'utf8');
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating footer:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update footer' },
            { status: 500 }
        );
    }
}