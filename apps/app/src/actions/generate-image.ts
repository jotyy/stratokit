"use server";

import { authActionClient } from "@/actions/safe-action";
import { z } from "zod";

const generateImageSchema = z.object({
  prompt: z.string().min(1).max(1000),
});

export const generateImage = authActionClient
  .schema(generateImageSchema)
  .metadata({
    name: "generate-image",
  })
  .action(async ({ parsedInput: { prompt } }) => {
    return await process.env.AI.run("@cf/black-forest-labs/flux-1-schnell", {
      prompt,
    });
  });
