import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET() {
  try {
    // Перевіряємо з'єднання з Supabase
    const { data: connectionTest, error: connectionError } = await supabase
      .from('sections')
      .select('count(*)', { count: 'exact' });

    if (connectionError) {
      return NextResponse.json({
        success: false,
        error: 'Supabase connection error',
        details: connectionError
      }, { status: 500 });
    }

    // Отримуємо список секцій
    const { data: sections, error: sectionsError } = await supabase
      .from('sections')
      .select('name');

    if (sectionsError) {
      return NextResponse.json({
        success: false,
        error: 'Error fetching sections',
        details: sectionsError
      }, { status: 500 });
    }

    // Отримуємо дані hero секції
    const { data: heroSection, error: heroError } = await supabase
      .from('sections')
      .select('data')
      .eq('name', 'hero')
      .single();

    return NextResponse.json({
      success: true,
      connection: 'OK',
      sectionsCount: connectionTest?.[0]?.count || 0,
      availableSections: sections?.map(s => s.name) || [],
      heroData: heroSection?.data || null,
      heroDataExists: !!heroSection?.data
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Unexpected error during check'
    }, { status: 500 });
  }
}
