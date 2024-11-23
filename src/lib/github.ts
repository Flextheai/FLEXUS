import { createAppAuth } from "@octokit/auth-app";
    import { Octokit } from "@octokit/rest";
    import fs from 'fs';
    import { env } from './env';

    const privateKey = fs.readFileSync(env.PRIVATE_KEY_PATH, 'utf8');

    export const octokit = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId: env.APP_ID,
        privateKey: privateKey,
        webhookSecret: env.WEBHOOK_SECRET,
      },
    });
