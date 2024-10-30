import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

import { sharedEnv } from "@stratokit/env/shared";

export const env = createEnv({
  extends: [sharedEnv],
  shared: {
    PORT: z.coerce.number().default(3000),
  },
  server: {
    AUTH_SECRET: z.string(),

    AUTH_GITHUB_ID: z.string().optional(),
    AUTH_GITHUB_SECRET: z.string().optional(),

    RESEND_API_KEY: z.string().optional(),

    // SENTRY_ORG: z.string(),
    // SENTRY_PROJECT: z.string(),
    // SENTRY_AUTH_TOKEN: z.string(),
  },
  experimental__runtimeEnv: {
    PORT: process.env.PORT,
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
