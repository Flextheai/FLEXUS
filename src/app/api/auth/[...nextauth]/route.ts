import NextAuth from 'next-auth';
    import { PrismaAdapter } from '@auth/prisma-adapter';
    import { prisma } from '@/lib/prisma';
    import GoogleProvider from 'next-auth/providers/google';
    import { env } from '@/lib/env';

    export const authOptions = {
      adapter: PrismaAdapter(prisma),
      providers: [
        GoogleProvider({
          clientId: env.GOOGLE_CLIENT_ID,
          clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
      ],
      callbacks: {
        session: async ({ session, user }) => {
          if (session?.user) {
            session.user.id = user.id;
            session.user.credits = user.credits;
          }
          return session;
        },
      },
    };

    const handler = NextAuth(authOptions);
    export { handler as GET, handler as POST };
