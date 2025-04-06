import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Відсутні дані для підключення до Supabase');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const fetchSections = unstable_cache(
  async () => {
    const { data, error } = await supabase
      .from('sections')
      .select('name, data');

    if (error) throw error;

    const sections: Record<string, unknown> = {};
    data?.forEach(section => {
      sections[section.name] = section.data;
    });
    
    return { 
      sections,
      version: Date.now().toString()
    };
  },
  ['site-sections'],
  { revalidate: 86400, tags: ['site-content'] }
);

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await fetchSections();
    
    return NextResponse.json(
      {
        success: true,
        sections: data.sections,
        version: data.version,
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error: unknown) {
    console.error('Помилка отримання даних:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Невідома помилка',
      },
      { status: 500 }
    );
  }
}
