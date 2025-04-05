import { NextResponse } from 'next/server';
import { getAllSections } from '@/utils/supabase';

// Define the response type for proper typing
interface PageDataResponse {
  success: boolean;
  sections: Record<string, unknown>;
  timestamp: string;
}

// Кешування даних для зменшення запитів до Supabase
const cache: { data: PageDataResponse | null; timestamp: number } = { 
  data: null, 
  timestamp: 0 
};

const CACHE_TTL = 60000; // 1 хвилина

export async function GET() {
  try {
    const now = Date.now();
    
    if (cache.data && (now - cache.timestamp) < CACHE_TTL) {
      return NextResponse.json(cache.data);
    }
    
    const sections = await getAllSections();
    
    const response: PageDataResponse = {
      success: true,
      sections,
      timestamp: new Date().toISOString()
    };
    
    cache.data = response;
    cache.timestamp = now;
    
    return NextResponse.json(response);
  } catch (error: unknown) {
    console.error('Error fetching page data:', error);
    
    // Safe error message extraction
    let errorMessage = 'Failed to load page data';
    if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = error.message as string || errorMessage;
    }
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
