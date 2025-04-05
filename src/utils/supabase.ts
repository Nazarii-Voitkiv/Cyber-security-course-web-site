import { createClient } from '@supabase/supabase-js';

// Перевірка наявності змінних середовища
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Створення клієнта Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Функція для отримання даних секції
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

// Функція для оновлення даних секції
export async function updateSectionData(sectionName: string, sectionData: any) {
  // Перевіряємо чи існує запис
  const { data: existingData } = await supabase
    .from('sections')
    .select('id')
    .eq('name', sectionName)
    .single();

  if (existingData) {
    // Оновлюємо існуючий запис
    const { data, error } = await supabase
      .from('sections')
      .update({ data: sectionData, updated_at: new Date() })
      .eq('name', sectionName);

    if (error) throw error;
    return data;
  } else {
    // Створюємо новий запис
    const { data, error } = await supabase
      .from('sections')
      .insert([{ name: sectionName, data: sectionData }]);

    if (error) throw error;
    return data;
  }
}

// Функція для отримання всіх секцій
export async function getAllSections() {
  const { data, error } = await supabase
    .from('sections')
    .select('name, data');

  if (error) {
    console.error('Error fetching all sections:', error);
    return {};
  }

  // Перетворення у формат { sectionName: sectionData }
  return data.reduce((acc, section) => {
    acc[section.name] = section.data;
    return acc;
  }, {});
}
