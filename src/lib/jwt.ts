import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

export interface JWTPayload {
    id: string;
    username: string;
    iat?: number;
    exp?: number;
}

export const signToken = async (payload: JWTPayload): Promise<string> => {
    const secret = new TextEncoder().encode(JWT_SECRET);
    
    const josePayload: jose.JWTPayload = {
        ...payload,
        sub: payload.id,
    };

    const token = await new jose.SignJWT(josePayload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1d')
        .sign(secret);
    return token;
};

export const verifyToken = async (token: string): Promise<JWTPayload | null> => {
    try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        const { payload } = await jose.jwtVerify(token, secret);
        
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
};

export const getTokenFromHeader = (header: string | null): string | null => {
    if (!header || !header.startsWith('Bearer ')) {
        return null;
    }
    return header.split(' ')[1];
};