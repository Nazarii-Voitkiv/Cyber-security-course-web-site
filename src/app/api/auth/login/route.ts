import { NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        console.log('API Login attempt:', {
            username,
            passwordProvided: !!password,
            envVars: {
                adminUsernameExists: !!process.env.ADMIN_USERNAME,
                adminPasswordExists: !!process.env.ADMIN_PASSWORD,
                jwtSecretExists: !!process.env.JWT_SECRET
            }
        });

        const result = await authenticate(username, password);
        console.log('Authentication result:', { success: result.success, hasToken: !!result.token });

        if (!result.success) {
            console.log('Authentication failed:', result.error);
            return NextResponse.json(
                { error: result.error },
                { status: 401 }
            );
        }

        console.log('Authentication successful, setting cookie');
        const cookieValue = `token=${result.token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`;
        console.log('Setting cookie:', cookieValue);
        
        return NextResponse.json({
            token: result.token
        }, {
            status: 200,
            headers: {
                'Set-Cookie': cookieValue
            }
        });
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json(
            { error: 'Внутрішня помилка сервера' },
            { status: 500 }
        );
    }
}
