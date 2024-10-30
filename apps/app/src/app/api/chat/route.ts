import { createWorkersAI } from "workers-ai-provider";

import { type Message, streamText } from "ai";

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = (await req.json()) as { messages: Message[] };

  const ai = createWorkersAI({ binding: process.env.AI });
  const model = ai("@cf/meta/llama-2-7b-chat-fp16");

  const result = await streamText({
    model,
    messages,
  });

  return result.toDataStreamResponse({
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
}
