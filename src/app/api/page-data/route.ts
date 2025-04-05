import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

const REQUIRED_SECTIONS = [
  'hero', 'intro', 'whyThisCourse', 'benefits', 'forWhom',
  'learningProcess', 'program', 'comparePlans', 'testimonials',
  'faq', 'footer'
];

const cache = { data: null, timestamp: 0 };
const CACHE_TTL = 60000; // 1 minute

export async function GET() {
  try {
    const now = Date.now();
    
    if (cache.data && (now - cache.timestamp) < CACHE_TTL) {
      return NextResponse.json(cache.data);
    }
    
    const sections = {};
    const promises = REQUIRED_SECTIONS.map(async (sectionName) => {
      try {
        const sectionData = await get(sectionName);
        if (sectionData) {
          sections[sectionName] = sectionData;
        }
      } catch (err) {
        console.log(`Section "${sectionName}" not found`);
      }
    });
    
    await Promise.all(promises);
    
    const response = {
      success: true,
      sections,
      timestamp: new Date().toISOString()
    };
    
    cache.data = response;
    cache.timestamp = now;
    
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to load page data' },
      { status: 500 }
    );
  }
}
