import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import { loginSchema } from '@/lib/validation';
import { compare } from 'bcryptjs';
import logger from '@/lib/logger';
import redis from '@/lib/redis';

const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_BLOCK_DURATION = 15 * 60; // 15 minutes in seconds

async function checkLoginAttempts(username: string, ip: string): Promise<boolean> {
  const key = `login_attempts:${username}:${ip}`;
  try {
    const attempts = await redis.incr(key);
    await redis.expire(key, LOGIN_BLOCK_DURATION);

    if (attempts > MAX_LOGIN_ATTEMPTS) {
      logger.warn(`Login blocked for user ${username} from IP ${ip} due to too many attempts`);
      return false;
    }
    return true;
  } catch (error) {
    logger.error('Error checking login attempts:', error);
    return true; // У випадку помилки дозволяємо спробу
  }
}

async function resetLoginAttempts(username: string, ip: string) {
  const key = `login_attempts:${username}:${ip}`;
  try {
    await redis.del(key);
  } catch (error) {
    logger.error('Error resetting login attempts:', error);
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const ip = req?.headers?.['x-forwarded-for'] || req?.headers?.['x-real-ip'] || 'unknown';
          
          // Перевіряємо спроби входу
          const canAttemptLogin = await checkLoginAttempts(credentials?.username || '', ip as string);
          if (!canAttemptLogin) {
            throw new Error('Too many login attempts. Please try again later.');
          }

          // Валідація вхідних даних
          const validatedCredentials = loginSchema.parse(credentials);
          
          const expectedUsername = process.env.ADMIN_USERNAME;
          const hashedPassword = process.env.ADMIN_PASSWORD_HASH;

          if (!expectedUsername || !hashedPassword) {
            logger.error('Missing environment variables for authentication');
            throw new Error('Server configuration error');
          }

          if (validatedCredentials.username !== expectedUsername) {
            logger.warn(`Failed login attempt for username: ${validatedCredentials.username}`);
            return null;
          }

          const isValidPassword = await compare(validatedCredentials.password, hashedPassword);

          if (!isValidPassword) {
            logger.warn(`Invalid password attempt for user: ${validatedCredentials.username}`);
            return null;
          }

          // Скидаємо лічильник спроб при успішному вході
          await resetLoginAttempts(validatedCredentials.username, ip as string);

          logger.info(`Successful login for user: ${validatedCredentials.username}`);
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@example.com'
          };
        } catch (error) {
          logger.error('Authentication error:', error);
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 2 * 60 * 60, // 2 hours
  },
  jwt: {
    maxAge: 2 * 60 * 60, // 2 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token.sub) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
