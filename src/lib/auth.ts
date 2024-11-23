import { PrismaAdapter } from "@auth/prisma-adapter"
    import { NextAuthOptions } from "next-auth"
    import GithubProvider from "next-auth/providers/github"
    import { prisma } from "./prisma"
    import { env } from "./env"

    export const authOptions: NextAuthOptions = {
      adapter: PrismaAdapter(prisma),
      providers: [
        GithubProvider({
          clientId: env.GITHUB_ID,
          clientSecret: env.GITHUB_SECRET,
        }),
      ],
      secret: env.NEXTAUTH_SECRET,
      callbacks: {
        session: async ({ session, user }) => {
          if (session?.user) {
            session.user.id = user.id;
            session.user.credits = user.credits;
          }
          return session;
        },
      },
    }
