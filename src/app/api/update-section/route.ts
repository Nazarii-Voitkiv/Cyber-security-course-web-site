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

    // Оновлюємо дані секції через Supabase
    await updateSectionData(section, data);
    
    return NextResponse.json({
      success: true,
      message: `Section "${section}" updated successfully`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating section:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update section' },
      { status: 500 }
    );
  }
}
