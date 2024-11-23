import { z } from 'zod'

    const generateImageSchema = z.object({
      prompt: z.string().min(1),
      steps: z.number().min(10).max(50).default(30),
      cfg_scale: z.number().min(1).max(20).default(5),
      enable_refiner: z.boolean().default(false),
      height: z.number().default(1024),
      width: z.number().default(1024),
      backend: z.string().default("auto")
    })

    export type GenerateImageParams = z.infer<typeof generateImageSchema>

    export async function generateImage(params: GenerateImageParams) {
      try {
        const response = await fetch(process.env.FLUX_API_URL!, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.FLUX_API_KEY}`,
          },
          body: JSON.stringify({
            model_name: "FLUX.1-dev",
            ...params
          })
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        return await response.json()
      } catch (error) {
        console.error('Image generation failed:', error)
        throw error
      }
    }
