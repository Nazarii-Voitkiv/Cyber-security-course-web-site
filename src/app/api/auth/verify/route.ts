import { NextResponse, NextRequest } from 'next/server';
import { validateToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        // Додаткове логування отриманих кукі
        console.debug('Cookies (NextRequest.cookies):', request.cookies);
        const cookieHeader = request.headers.get('cookie');
        console.debug('Заголовок cookie:', cookieHeader);
        
        const token = request.cookies.get('token')?.value;
        if (!token) {
            console.error("Token відсутній у кукі.");
            return NextResponse.json({ error: 'Недійсний токен' }, { status: 401 });
        }
        
        const isValid = await validateToken(token);
        if (!isValid) {
            return NextResponse.json({ error: 'Недійсний токен' }, { status: 401 });
        }
        return NextResponse.json({ valid: true }, { status: 200 });
    } catch (error) {
        console.error('Помилка перевірки токена:', error);
        return NextResponse.json(
            { error: 'Внутрішня помилка сервера' },
            { status: 500 }
        );
    }
}