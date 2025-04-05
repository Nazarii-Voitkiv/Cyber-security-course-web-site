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

export async function updateSectionData(sectionName: string, sectionData: Record<string, unknown>) {
  const { data: existingData } = await supabase
    .from('sections')
    .select('id')
    .eq('name', sectionName)
    .single();

  if (existingData) {
    const { data, error } = await supabase
      .from('sections')
      .update({ data: sectionData, updated_at: new Date() })
      .eq('name', sectionName);

    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('sections')
      .insert([{ name: sectionName, data: sectionData }]);

    if (error) throw error;
    return data;
  }
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
