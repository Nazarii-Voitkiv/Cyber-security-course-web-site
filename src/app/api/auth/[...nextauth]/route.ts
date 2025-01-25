import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import { loginSchema } from '@/lib/validation';
import { compare } from 'bcryptjs';
import logger from '@/lib/logger';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          logger.warn('Missing credentials');
          return null;
        }

        try {
          const ip = req?.headers?.['x-forwarded-for'] || req?.headers?.['x-real-ip'] || 'unknown';

          // Валідація вхідних даних
          try {
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

            logger.info(`Successful login for user: ${validatedCredentials.username}`);
            return {
              id: '1',
              name: 'Admin',
              email: 'admin@example.com'
            };
          } catch (validationError) {
            logger.warn('Validation error:', validationError);
            return null;
          }
        } catch (error) {
          logger.error('Authentication error:', error);
          if (error instanceof Error) {
            throw error;
          }
          throw new Error('An unexpected error occurred');
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
