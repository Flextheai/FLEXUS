import { z } from 'zod'

    const envSchema = z.object({
      DATABASE_URL: z.string().min(1),
      GITHUB_ID: z.string().min(1),
      GITHUB_SECRET: z.string().min(1),
      NEXTAUTH_SECRET: z.string().min(1),
      NEXTAUTH_URL: z.string().url(),
      FLUX_API_KEY: z.string().min(1),
      FLUX_API_URL: z.string().url(),
      WEBHOOK_URL: z.string().url(),
      PRIVATE_KEY_PATH: z.string().min(1),
      WEBHOOK_SECRET: z.string().min(1),
      APP_ID: z.string().min(1),
    })

    export const env = envSchema.parse(process.env)
