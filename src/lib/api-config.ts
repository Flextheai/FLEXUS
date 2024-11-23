import { z } from 'zod';

    export const ApiConfigSchema = z.object({
      FLUX_API_KEY: z.string().min(1),
      API_URL: z.string().url(),
    });

    export const apiConfig = {
      FLUX_API_KEY: process.env.FLUX_API_KEY!,
      API_URL: 'https://api.hyperbolic.xyz/v1/image/generation',
    };

    export const validateApiConfig = () => {
      try {
        ApiConfigSchema.parse(apiConfig);
      } catch (error) {
        console.error('Invalid API configuration:', error);
        throw new Error('Invalid API configuration');
      }
    };
