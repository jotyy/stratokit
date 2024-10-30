import { Suspense } from "react";
import { Chat } from "./_components/chat";
import { ModelSettings } from "./_components/model-settings";

export const runtime = "edge";
export const maxDuration = 30;

export interface Task {
  id: string;
  name: string;
  description: string;
}

export interface Property {
  property_id: string;
  value: string;
}

export interface CFModel {
  id: string;
  source: number;
  name: string;
  description: string;
  task: Task;
  tags: string[];
  properties: Property[];
}

async function getModels() {
  const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/models/search?task=Text Generation`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  return data.result as CFModel[];
}

export default async function AiPage() {
  const models = await getModels();

  return (
    <div className="container mx-auto h-full space-y-6">
      <h2 className="text-xl font-bold">AI Assistent</h2>

      <div className="flex gap-6">
        <div className="w-[20rem]">
          <Suspense fallback={<div>Loading...</div>}>
            <ModelSettings models={models} />
          </Suspense>
        </div>
        <Chat />
      </div>
    </div>
  );
}
