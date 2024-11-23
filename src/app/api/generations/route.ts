import { auth } from '@/lib/auth';
    import { prisma } from '@/lib/prisma';

    export async function GET(req: Request) {
      try {
        const session = await auth();
        if (!session?.user) {
          return new Response('Unauthorized', { status: 401 });
        }

        const userId = new URL(req.url).searchParams.get('userId');
        if (!userId) {
          return new Response('User ID is required', { status: 400 });
        }

        const generations = await prisma.generation.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
        });

        return Response.json(generations);
      } catch (error) {
        console.error('Error fetching generations:', error);
        return new Response('Internal Server Error', { status: 500 });
      }
    }
