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
    const { sections } = await request.json();
    
    // Save content to a JSON file
    const contentPath = path.join(process.cwd(), 'content.json');
    await fs.writeFile(contentPath, JSON.stringify(sections, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving content:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
