import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    CLOUDFLARE_D1_ACCOUNT_ID: z.string().min(1),
    DATABASE: z.string().min(1),
    CLOUDFLARE_D1_API_TOKEN: z.string().min(1),
  },
  runtimeEnv: {
    CLOUDFLARE_D1_ACCOUNT_ID:
      // FIXME: This is a hack to get the tests to run
      process.env.NODE_ENV === "test"
        ? "http://127.0.0.1:8080"
        : process.env.CLOUDFLARE_D1_ACCOUNT_ID,
    DATABASE: process.env.DATABASE,
    CLOUDFLARE_D1_API_TOKEN: process.env.CLOUDFLARE_D1_API_TOKEN,
  },
  skipValidation: true,
});
