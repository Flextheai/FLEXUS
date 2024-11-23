import { env } from '@/lib/env';
    import { auth } from '@/lib/auth';
    import { prisma } from '@/lib/prisma';
    import { ImageService } from '@/services/image-service';
    import { generateImageSchema } from '@/lib/validations/generate';

    export async function POST(req: Request) {
      try {
        const session = await auth();
        if (!session?.user) {
          return new Response('Unauthorized', { status: 401 });
        }

        const json = await req.json();
        const body = generateImageSchema.parse(json);

        const user = await prisma.user.findUnique({
          where: { id: session.user.id },
          select: { credits: true }
        });

        if (!user || user.credits < 1) {
          return new Response('Insufficient credits', { status: 402 });
        }

        const result = await ImageService.generateImage(body);

        await prisma.$transaction([
          prisma.generation.create({
            data: {
              prompt: body.prompt,
              imageUrl: result.image_url,
              parameters: body,
              userId: session.user.id,
            },
          }),
          prisma.user.update({
            where: { id: session.user.id },
            data: { credits: { decrement: 1 } },
          }),
        ]);

        return Response.json(result);
      } catch (error) {
        console.error('Generation error:', error);
        return new Response('Internal Server Error', { status: 500 });
      }
    }
