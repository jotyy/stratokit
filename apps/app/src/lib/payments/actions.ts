"use server";

import { actionClientWithTeam } from "@/actions/safe-action";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createCheckoutSession, createCustomerPortalSession } from "./stripe";

export const checkoutActionSchema = z.object({
  priceId: z.string(),
});

export const checkoutAction = actionClientWithTeam
  .schema(checkoutActionSchema)
  .action(async ({ ctx, parsedInput: { priceId } }) => {
    await createCheckoutSession({ team: ctx.team, priceId });
  });

export const customerPortalAction = actionClientWithTeam.action(
  async ({ ctx }) => {
    const portalSession = await createCustomerPortalSession(ctx.team);
    redirect(portalSession.url);
  },
);
