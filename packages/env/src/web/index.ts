import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { sharedEnv } from "@stratokit/env/shared";

export const env = createEnv({
  extends: [sharedEnv],
  server: {
    SENTRY_AUTH_TOKEN: z.string(),
    SENTRY_ORG: z.string(),
    SENTRY_PROJECT: z.string(),
  },
  client: {
    PUBLIC_SENTRY_DSN: z.string(),
    PUBLIC_POSTHOG_KEY: z.string().optional(),
    PUBLIC_POSTHOG_HOST: z.string().optional(),
  },
  clientPrefix: "PUBLIC_",
  runtimeEnv: process.env,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
