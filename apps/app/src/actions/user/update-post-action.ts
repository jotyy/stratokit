"use server";

import { authActionClient } from "@/actions/safe-action";
import { db, eq, users } from "@stratokit/db";
import { updateUserSchema } from "./schema";

export const updateUserAction = authActionClient
  .schema(updateUserSchema)
  .metadata({
    name: "update-user",
  })
  .action(async ({ parsedInput: input, ctx: { user } }) => {
    const result = await db
      .update(users)
      .set(input)
      .where(eq(users.id, user.id!));

    return result;
  });
