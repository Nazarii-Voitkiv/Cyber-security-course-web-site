import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { pixelId } = await request.json();
    
    // Update .env.local file with new pixel ID
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = `NEXT_PUBLIC_FB_PIXEL_ID=${pixelId}\n`;
    await fs.writeFile(envPath, envContent);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving pixel ID:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
