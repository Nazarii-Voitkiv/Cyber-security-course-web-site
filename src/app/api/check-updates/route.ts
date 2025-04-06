import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_version')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      // Якщо таблиці немає, повертаємо поточний час як версію
      return NextResponse.json({
        version: Date.now().toString(),
        lastUpdated: new Date().toISOString()
      });
    }

    return NextResponse.json({
      version: data?.version || Date.now().toString(),
      lastUpdated: data?.updated_at || new Date().toISOString()
    });
  } catch (error) {
    console.error('Error checking updates:', error);
    return NextResponse.json({
      version: Date.now().toString(),
      lastUpdated: new Date().toISOString()
    });
  }
}
