"use client";

import { generateImage } from "@/actions/generate-image";
import { Button } from "@stratokit/ui/button";
import { Label } from "@stratokit/ui/label";
import { Textarea } from "@stratokit/ui/textarea";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

export function ImageGenerationForm() {
  const [prompt, setPrompt] = useState("");
  const { execute, isExecuting, result } = useAction(generateImage);

  return (
    <form
      action={async (formData) => {
        execute({
          prompt: formData.get("prompt") as string,
        });
      }}
      className="grid gap-6 grid-cols-1 sm:grid-cols-2"
    >
      <div className="space-y-2">
        <Label htmlFor="prompt" className="block text-sm font-medium">
          Describe the image you want to generate
        </Label>
        <Textarea
          id="prompt"
          name="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A serene lake at sunset with mountains in the background..."
          className="h-32"
        />

        <Button type="submit" disabled={isExecuting} className="mt-6">
          {isExecuting ? "Generating..." : "Generate Image"}
        </Button>
      </div>

      {result?.data && (
        <div className="mt-6">
          <img
            src={`data:image/jpeg;base64,${result?.data.image}`}
            alt="Generated card"
            className="rounded-lg w-full aspect-square object-cover"
          />
        </div>
      )}
    </form>
  );
}
