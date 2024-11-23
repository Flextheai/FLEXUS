import { z } from 'zod';

    export const generateImageSchema = z.object({
      prompt: z.string().min(1),
      steps: z.number().min(1).optional(),
      cfg_scale: z.number().min(1).optional(),
      enable_refiner: z.boolean().optional(),
      height: z.number().min(1).optional(),
      width: z.number().min(1).optional(),
      backend: z.string().optional(),
    });
