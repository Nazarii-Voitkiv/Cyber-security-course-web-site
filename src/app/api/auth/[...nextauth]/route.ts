import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const expectedUsername = process.env.ADMIN_USERNAME;
        const expectedPassword = process.env.ADMIN_PASSWORD;

        if (!expectedUsername || !expectedPassword) {
          throw new Error('Missing environment variables for authentication');
        }

        if (credentials.username === expectedUsername && credentials.password === expectedPassword) {
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@example.com'
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
});

export { handler as GET, handler as POST };
