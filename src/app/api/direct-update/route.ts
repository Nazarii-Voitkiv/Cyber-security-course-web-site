import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const { section, data } = await request.json();
    
    if (!section || !data) {
      return NextResponse.json({ success: false, error: 'Section name and data are required' }, { status: 400 });
    }
    
    const timestamp = new Date().toISOString();
    
    const { data: existingData } = await supabase
      .from('sections')
      .select('id')
      .eq('name', section)
      .single();
    
    let operation;
    
    if (existingData?.id) {
      const { error: updateError } = await supabase
        .from('sections')
        .update({ 
          data: data,
          updated_at: timestamp 
        })
        .eq('name', section);
      
      if (updateError) throw updateError;
      operation = 'update';
    } else {
      const { error: insertError } = await supabase
        .from('sections')
        .insert({
          name: section,
          data: data,
          created_at: timestamp,
          updated_at: timestamp
        });
      
      if (insertError) throw insertError;
      operation = 'insert';
    }
    
    return NextResponse.json({
      success: true,
      message: `Section "${section}" ${operation}d successfully`,
      timestamp
    });
    
  } catch (error: unknown) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred during update'
    }, { status: 500 });
  }
}
