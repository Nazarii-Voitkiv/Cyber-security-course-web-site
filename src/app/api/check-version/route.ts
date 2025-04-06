import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Відсутні дані для підключення до Supabase');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('sections')
      .select('updated_at')
      .order('updated_at', { ascending: false })
      .limit(1);
    
    if (error) throw error;

    const latestUpdate = data?.[0]?.updated_at;
    const version = latestUpdate ? new Date(latestUpdate).getTime().toString() : Date.now().toString();

    return NextResponse.json({
      success: true,
      version,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Невідома помилка',
      version: Date.now().toString()
    }, { status: 500 });
  }
}
