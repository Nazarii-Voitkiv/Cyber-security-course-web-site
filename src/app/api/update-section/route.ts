import { NextRequest, NextResponse } from 'next/server';
import { updateSectionData } from '@/utils/supabase';

export async function POST(request: NextRequest) {
  try {
    const { section, data } = await request.json();
    
    if (!section || !data) {
      return NextResponse.json(
        { success: false, error: 'Section name and data are required' },
        { status: 400 }
      );
    }

    await updateSectionData(section, data);
    
    return NextResponse.json({
      success: true,
      message: `Section "${section}" updated successfully`,
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    console.error('Error updating section:', error);
    
    let errorMessage = 'Failed to update section';
    if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = error.message as string || errorMessage;
    }
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
