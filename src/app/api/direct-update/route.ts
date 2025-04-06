import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { revalidateTag } from 'next/cache';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Відсутні дані для підключення до Supabase');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const { section, data } = await request.json();
    
    if (!section || !data) {
      return NextResponse.json(
        { success: false, error: 'Необхідно вказати назву секції та дані' }, 
        { status: 400 }
      );
    }
    
    const timestamp = new Date().toISOString();
    const version = Date.now().toString();
    
    const { data: existingData } = await supabase
      .from('sections')
      .select('id')
      .eq('name', section)
      .single();
    
    const operation = existingData?.id ? 'update' : 'insert';
    
    const upsertOperation = existingData?.id
      ? supabase.from('sections').update({ data, updated_at: timestamp }).eq('name', section)
      : supabase.from('sections').insert({ name: section, data, created_at: timestamp, updated_at: timestamp });
    
    const { error } = await upsertOperation;
    if (error) throw error;
    
    revalidateTag('site-content');
    
    return NextResponse.json({
      success: true,
      message: `Секція "${section}" успішно ${operation === 'update' ? 'оновлена' : 'створена'}`,
      timestamp,
      version,
      cacheInvalidated: true
    });
    
  } catch (error: unknown) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Невідома помилка під час оновлення'
    }, { status: 500 });
  }
}
