import { auth } from "@/lib/auth";
import { getTeamForUser } from "@/lib/db/queries";
import * as Sentry from "@sentry/nextjs";
import { setupAnalytics } from "@stratokit/analytics/server";
import { ratelimit } from "@stratokit/kv/ratelimit";
import { logger } from "@stratokit/logger";
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from "next-safe-action";
import { headers } from "next/headers";
import { z } from "zod";

const handleServerError = (e: Error) => {
  console.error("Action error:", e.message);

  if (e instanceof Error) {
    return e.message;
  }

  return DEFAULT_SERVER_ERROR_MESSAGE;
};

export const actionClient = createSafeActionClient({
  handleServerError,
});

export const actionClientWithMeta = createSafeActionClient({
  handleServerError,
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
      track: z
        .object({
          event: z.string(),
          channel: z.string(),
        })
        .optional(),
    });
  },
});

export const authActionClient = actionClientWithMeta
  .use(async ({ next, clientInput, metadata }) => {
    const result = await next({ ctx: {} });

    if (process.env.NODE_ENV === "development") {
      logger.info(`Input -> ${JSON.stringify(clientInput)}`);
      logger.info(`Result -> ${JSON.stringify(result.data)}`);
      logger.info(`Metadata -> ${JSON.stringify(metadata)}`);

      return result;
    }

    return result;
  })
  .use(async ({ next, metadata }) => {
    const ip = headers().get("x-forwarded-for");

    const { success, remaining } = await ratelimit.limit(
      `${ip}-${metadata.name}`,
    );

    if (!success) {
      throw new Error("Too many requests");
    }

    return next({
      ctx: {
        ratelimit: {
          remaining,
        },
      },
    });
  })
  .use(async ({ next, metadata }) => {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (metadata) {
      const analytics = await setupAnalytics({
        userId: session.user.id,
      });

      if (metadata.track) {
        analytics.track(metadata.track);
      }
    }

    return Sentry.withServerActionInstrumentation(metadata.name, async () => {
      return next({
        ctx: {
          user: session.user!,
        },
      });
    });
  });

export const actionClientWithTeam = authActionClient.use(
  async ({ next, ctx }) => {
    const team = await getTeamForUser(ctx.user.id!);

    if (!team) {
      throw new Error("Team not found");
    }

    return next({
      ctx: {
        team,
      },
    });
  },
);
