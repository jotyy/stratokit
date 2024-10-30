"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@stratokit/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@stratokit/ui/select";
import { Slider } from "@stratokit/ui/slider";
import { Textarea } from "@stratokit/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { CFModel } from "../page";

const modelSettingsSchema = z.object({
  systemPrompt: z.string().min(1),
  model: z.string().min(1),
  temperature: z.number().min(0).max(1),
  maxLength: z.number().min(1).max(4096),
  topP: z.number().min(0).max(1),
  frequencyPenalty: z.number().min(0).max(2),
  presencePenalty: z.number().min(0).max(2),
});

type ModelSettings = z.infer<typeof modelSettingsSchema>;

const defaultValues: ModelSettings = {
  systemPrompt: "You are a helpful AI assistant.",
  model: "@hf/thebloke/llama-2-13b-chat-awq",
  temperature: 0.5,
  maxLength: 1024,
  topP: 0.5,
  frequencyPenalty: 0,
  presencePenalty: 0,
};

export function ModelSettings({ models }: { models: CFModel[] }) {
  const modelOptions = models.map((model) => ({
    label: model.name,
    value: model.name,
  }));

  const form = useForm<ModelSettings>({
    defaultValues,
    resolver: zodResolver(modelSettingsSchema),
  });

  const values = form.watch();

  return (
    <Form {...form}>
      <form className="flex flex-col space-y-6 rounded-lg">
        <FormField
          control={form.control}
          name="systemPrompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>System Prompt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a system prompt to guide the AI assistant."
                  className="h-24"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {modelOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="temperature"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Temperature</FormLabel>
                <span>{values.temperature}</span>
              </div>
              <FormControl>
                <Slider
                  value={[field.value]}
                  min={0}
                  max={1}
                  step={0.1}
                  onValueChange={([value]) => field.onChange(value)}
                  className="w-full"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxLength"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Max Length</FormLabel>
                <span>{values.maxLength}</span>
              </div>
              <FormControl>
                <Slider
                  value={[field.value]}
                  min={1}
                  max={4096}
                  step={1}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topP"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Top P</FormLabel>
                <span>{values.topP}</span>
              </div>
              <FormControl>
                <Slider
                  value={[field.value]}
                  min={0}
                  max={1}
                  step={0.1}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="frequencyPenalty"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Frequency Penalty</FormLabel>
                <span>{values.frequencyPenalty}</span>
              </div>
              <FormControl>
                <Slider
                  value={[field.value]}
                  min={0}
                  max={2}
                  step={0.1}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="presencePenalty"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Presence Penalty</FormLabel>
                <span>{values.presencePenalty}</span>
              </div>
              <FormControl>
                <Slider
                  value={[field.value]}
                  min={0}
                  max={2}
                  step={0.1}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
