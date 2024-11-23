import { env } from '@/lib/env';
    import { createHmac } from 'crypto';
    import { headers } from 'next/headers';

    export async function POST(request: Request) {
      const signature = headers().get('x-hub-signature-256');
      const body = await request.text();
      
      const hmac = createHmac('sha256', env.WEBHOOK_SECRET);
      const calculatedSignature = `sha256=${hmac.update(body).digest('hex')}`;
      
      if (signature !== calculatedSignature) {
        return new Response('Invalid signature', { status: 401 });
      }

      // Process webhook payload
      const payload = JSON.parse(body);
      console.log('Webhook received:', payload);

      return new Response('OK', { status: 200 });
    }
