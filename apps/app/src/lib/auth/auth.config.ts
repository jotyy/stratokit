import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@stratokit/db";
import { env } from "@stratokit/env/app/server";
import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";

export default {
  adapter: DrizzleAdapter(db),
  secret: env.AUTH_SECRET,
  providers: [
    GitHub,
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "Stratokit <no-reply@chatflare.cloud>",
    }),
  ],
} satisfies NextAuthConfig;
