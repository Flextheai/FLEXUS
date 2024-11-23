import { auth } from "@/lib/auth"
    import { generateImage } from "@/lib/flux-api"
    import { NextResponse } from "next/server"

    export async function GET() {
      try {
        const session = await auth()
        if (!session?.user) {
          return new Response("Unauthorized", { status: 401 })
        }

        const result = await generateImage({
          prompt: "A cat eating a birthday cake, digital art style",
          steps: 30,
          cfg_scale: 5,
          enable_refiner: false,
          height: 1024,
          width: 1024
        })

        return NextResponse.json(result)
      } catch (error) {
        console.error('Test generation failed:', error)
        return new Response("Generation failed", { status: 500 })
      }
    }
