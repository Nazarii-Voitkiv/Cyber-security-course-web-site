import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST() {
  try {
    revalidateTag('site-content');
    
    return NextResponse.json({
      success: true,
      message: 'Кеш успішно оновлено',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Невідома помилка'
    }, { status: 500 });
  }
}
