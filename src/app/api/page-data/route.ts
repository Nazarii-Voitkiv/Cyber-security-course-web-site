import { NextResponse } from 'next/server';
import { getAllSections } from '@/utils/supabase';

export async function GET() {
  try {
    const sections = await getAllSections();
    
    const headers = new Headers();
    headers.append('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
    headers.append('Pragma', 'no-cache');
    headers.append('Expires', '0');
    
    return NextResponse.json({
      success: true,
      sections,
      timestamp: new Date().toISOString()
    }, { headers });
  } catch (error: unknown) {
    console.error('Error fetching page data:', error);
    
    let errorMessage = 'Failed to load page data';
    if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = error.message as string || errorMessage;
    }
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
