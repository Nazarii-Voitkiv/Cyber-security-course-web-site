import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getSectionData(sectionName: string) {
  const { data, error } = await supabase
    .from('sections')
    .select('data')
    .eq('name', sectionName)
    .single();

  if (error) {
    console.error(`Error fetching section "${sectionName}":`, error);
    return null;
  }

  return data?.data;
}

export async function getAllSections(): Promise<Record<string, unknown>> {
  const { data, error } = await supabase
    .from('sections')
    .select('name, data');

  if (error) {
    console.error('Error fetching all sections:', error);
    return {};
  }

  return data.reduce<Record<string, unknown>>((acc, section) => {
    acc[section.name] = section.data;
    return acc;
  }, {});
}
