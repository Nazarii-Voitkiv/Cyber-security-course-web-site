import { NextResponse } from 'next/server';
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

interface FileData {
    data: FooterData;
}

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'private-data/footer.json');
        const fileContent = await fs.readFile(filePath, 'utf8');
        const fileData: FileData = JSON.parse(fileContent);

        return NextResponse.json({ success: true, data: fileData.data });
    } catch (error) {
        console.error('Error reading footer data:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to read footer data' },
            { status: 500 }
        );
    }
}