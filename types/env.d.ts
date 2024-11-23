declare namespace NodeJS {
      interface ProcessEnv {
        DATABASE_URL: string
        GITHUB_ID: string
        GITHUB_SECRET: string
        NEXTAUTH_SECRET: string
        NEXTAUTH_URL: string
        FLUX_API_KEY: string
        FLUX_API_URL: string
        WEBHOOK_URL: string
        PRIVATE_KEY_PATH: string
        WEBHOOK_SECRET: string
        APP_ID: string
      }
    }
