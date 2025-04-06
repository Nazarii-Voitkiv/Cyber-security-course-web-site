import { NextResponse } from 'next/server';

// Налаштування шляхів для Middleware
export const config = {
  matcher: ['/welcome', '/api/dynamic-message/:path*']
};

export async function middleware(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  try {
    // Обробка шляху /welcome
    if (path === '/welcome') {
      const greeting = await get('greeting');
      return NextResponse.json(greeting);
    }
    
    // Обробка динамічних повідомлень
    if (path.startsWith('/api/dynamic-message/')) {
      const messageKey = path.split('/').pop();
      
      if (messageKey) {
        // Спробуємо знайти дані за ключем
        try {
          const message = await get(messageKey);
          if (message !== undefined) {
            return NextResponse.json({ 
              key: messageKey, 
              message, 
              updatedAt: new Date().toISOString() 
            });
          }
        } catch (e) {
          console.error(`Error fetching ${messageKey}:`, e);
        }
        
        // Якщо не знайшли прямо, шукаємо через розділи
        try {
          const sectionParts = messageKey.split('.');
          if (sectionParts.length > 1) {
            const sectionName = sectionParts[0];
            const section = await get(sectionName);
            if (section) {
              // Шукаємо вкладені поля за шляхом
              let value = section;
              for (let i = 1; i < sectionParts.length; i++) {
                if (value && typeof value === 'object') {
                  value = value[sectionParts[i]];
                } else {
                  value = undefined;
                  break;
                }
              }
              
              if (value !== undefined) {
                return NextResponse.json({ 
                  key: messageKey, 
                  message: value, 
                  updatedAt: new Date().toISOString() 
                });
              }
            }
          }
        } catch (e) {
          console.error(`Error navigating nested path ${messageKey}:`, e);
        }
        
        // Якщо не знайшли дані
        return NextResponse.json(
          { error: `Message with key "${messageKey}" not found` }, 
          { status: 404 }
        );
      }
    }
    
    return NextResponse.next();
  } catch (error) {
    console.error('Edge Config error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Edge Config', message: error.message },
      { status: 500 }
    );
  }
}
