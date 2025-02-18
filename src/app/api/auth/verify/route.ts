import { NextResponse } from 'next/server';
import { validateToken } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const cookieHeader = request.headers.get('cookie');
        if (!cookieHeader) {
            console.error("No cookie header found.");
            return NextResponse.json({ error: 'Недійсний токен' }, { status: 401 });
        }
        const token = cookieHeader
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1]?.trim() || null;
        if (!token) {
            console.error("Token not set in cookie header.");
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