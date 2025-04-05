import { NextResponse } from 'next/server';
import { getAllSections } from '@/utils/supabase';

// Кешування даних для зменшення запитів до Supabase
let cache = { data: null, timestamp: 0 };
const CACHE_TTL = 60000; // 1 хвилина

export async function GET() {
  try {
    const now = Date.now();
    
    // Використовуємо кеш, якщо дані свіжі
    if (cache.data && (now - cache.timestamp) < CACHE_TTL) {
      return NextResponse.json(cache.data);
    }
    
    // Отримуємо всі секції з Supabase
    const sections = await getAllSections();
    
    const response = {
      success: true,
      sections,
      timestamp: new Date().toISOString()
    };
    
    // Оновлюємо кеш
    cache.data = response;
    cache.timestamp = now;
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching page data:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to load page data' },
      { status: 500 }
    );
  }
}
