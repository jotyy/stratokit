import { Card } from "@stratokit/ui/card";
import { ImageGenerationForm } from "./_components/image-generation-form";

export const metadata = {
  title: "AI Image Generation",
  description: "Generate images using AI with your text prompts",
};

export const runtime = "edge";

export default function AIImagePage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h2 className="text-xl font-bold">AI Image Generation</h2>

      <ImageGenerationForm />
    </div>
  );
}
