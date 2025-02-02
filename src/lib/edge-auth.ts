import * as jose from 'jose';

export interface JWTPayload {
    id: string;
    username: string;
    iat?: number;
    exp?: number;
}

export async function verifyTokenEdge(token: string): Promise<JWTPayload | null> {
    if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not defined');
        return null;
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
        const { payload } = await jose.jwtVerify(token, secret);
        // Перевіряємо, чи має payload необхідні поля
        if (typeof payload.id === 'string' && typeof payload.username === 'string') {
            return {
                id: payload.id,
                username: payload.username,
                iat: payload.iat,
                exp: payload.exp
            };
        }
        console.error('Invalid payload structure:', payload);
        return null;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

export async function validateTokenEdge(token: string | null): Promise<boolean> {
    console.log('Validating token:', token ? 'Token exists' : 'No token');
    if (!token) return false;
    
    const payload = await verifyTokenEdge(token);
    console.log('Token verification result:', payload ? 'Valid' : 'Invalid');
    
    return !!payload;
}
