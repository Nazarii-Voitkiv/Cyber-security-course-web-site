import { signToken, verifyToken } from './jwt';
import bcrypt from 'bcryptjs';

interface AuthResponse {
    success: boolean;
    token?: string;
    error?: string;
}

export async function authenticate(username: string, password: string): Promise<AuthResponse> {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    console.log('Environment variables:', {
        ADMIN_USERNAME: process.env.ADMIN_USERNAME,
        ADMIN_PASSWORD_EXISTS: !!process.env.ADMIN_PASSWORD,
        ADMIN_PASSWORD_LENGTH: process.env.ADMIN_PASSWORD?.length,
        JWT_SECRET_EXISTS: !!process.env.JWT_SECRET
    });

    if (!username || !password) {
        return { success: false, error: 'Відсутні облікові дані' };
    }

    if (!adminUsername || !adminPassword) {
        console.error('Missing admin credentials in environment variables');
        return { success: false, error: 'Помилка конфігурації сервера' };
    }

    if (username === adminUsername) {
        console.log('Username matches');
        
        try {
            const isValidPassword = await bcrypt.compare(password, adminPassword);
            console.log('Password comparison:', {
                providedPassword: password,
                storedHashLength: adminPassword.length,
                isValid: isValidPassword
            });
            
            if (isValidPassword) {
                const token = await signToken({
                    id: '1',
                    username: adminUsername
                });
                return { success: true, token };
            }
        } catch (error) {
            console.error('Error during password verification:', error);
            return { success: false, error: 'Помилка перевірки паролю' };
        }
    }

    return { success: false, error: 'Невірні облікові дані' };
}

export async function validateToken(token: string | null): Promise<boolean> {
    console.log('Validating token:', token ? 'Token exists' : 'No token');
    if (!token) return false;
    
    const payload = await verifyToken(token);
    console.log('Token verification result:', payload ? 'Valid' : 'Invalid');
    
    return !!payload;
}
