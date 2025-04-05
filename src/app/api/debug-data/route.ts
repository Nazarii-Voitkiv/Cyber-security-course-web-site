import { NextResponse } from 'next/server';
import { get as edgeConfigGet, createClient } from '@vercel/edge-config';

// Кешування даних для зменшення кількості запитів до Edge Config
let cachedData = null;
let lastFetchTime = 0;
const CACHE_TTL = 60000; // 1 хвилина

export async function GET() {
  try {
    // Використовуємо кеш
    const now = Date.now();
    if (cachedData && now - lastFetchTime < CACHE_TTL) {
      return NextResponse.json(cachedData);
    }
    
    // Отримуємо Edge Config URL
    const edgeConfigUrl = process.env.EDGE_CONFIG;
    if (!edgeConfigUrl) {
      return NextResponse.json(
        { success: false, error: 'Edge Config URL is not defined' },
        { status: 500 }
      );
    }

    // Перевіряємо наявність hero даних
    let heroData = null;
    try {
      heroData = await edgeConfigGet('hero');
    } catch (e) {
      console.error('Error getting hero:', e);
    }
    
    // Отримуємо всі доступні ключі
    let allKeys = [];
    let allItems = {};
    try {
      const client = createClient(edgeConfigUrl);
      allItems = await client.getAll();
      allKeys = Object.keys(allItems || {});
    } catch (e) {
      console.error('Error getting all keys:', e);
    }

    // Формуємо спрощену структуру відповіді
    const responseData = {
      success: true,
      keys: allKeys,
      sections: allItems,
      timestamp: new Date().toISOString()
    };
    
    // Оновлюємо кеш
    cachedData = responseData;
    lastFetchTime = now;
    
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'An unexpected error occurred'
    }, { status: 500 });
  }
}
