// @ts-nocheck

import type { Story, StoryDecorator } from "@ladle/react";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@stratokit/ui/button";
import { MousePointerClickIcon } from "lucide-react";

const primaryColors = {
  default: "",
  purple: "262.1 83.3% 57.8%",
  rose: "346.8 77.2% 49.8%",
  blue: "221.2 83.2% 53.3%",
  green: "142.1 76.2% 36.3%",
};

const decorators: StoryDecorator[] = [
  (Story) => (
    <div className="flex justify-center">
      <Story />
    </div>
  ),
];

export const All: Story = () => (
  <div className="space-y-4">
    {Object.entries(primaryColors).map(([name, color]) => (
      <div className="space-y-4">
        <h2 className="text-xs uppercase text-muted-foreground">{name}</h2>
        <div className="grid grid-cols-4 gap-4" style={{ "--primary": color }}>
          <Button>Click me</Button>
          <Button variant="destructive">Click me</Button>
          <Button variant="outline">Click me</Button>
          <Button variant="secondary">Click me</Button>
          <Button variant="ghost">Click me</Button>
          <Button variant="link">Click me</Button>
          <Button size="icon">
            <PlusIcon className="size-4" />
          </Button>
          <Button size="icon">
            <ReloadIcon className="size-4 animate-spin" />
          </Button>
        </div>
      </div>
    ))}
  </div>
);
All.decorators = [
  (Story) => (
    <div className="flex h-[80vh] items-center justify-center">
      <Story />
    </div>
  ),
];

export const Default: Story = () => (
  <div className="grid grid-cols-2 gap-8" style={{ "--radius": "0.75rem" }}>
    <Button>
      <MousePointerClickIcon className="mr-2 size-4" />
      Click me
    </Button>
    <Button style={{ "--primary": "262.1 83.3% 57.8%" }}>
      <MousePointerClickIcon className="mr-2 size-4" />
      Click me
    </Button>
    <Button style={{ "--primary": "346.8 77.2% 49.8%" }}>
      <MousePointerClickIcon className="mr-2 size-4" />
      Click me
    </Button>
    <Button style={{ "--primary": "221.2 83.2% 53.3%" }}>
      <MousePointerClickIcon className="mr-2 size-4" />
      Click me
    </Button>
    <Button style={{ "--primary": "142.1 76.2% 36.3%" }}>
      <MousePointerClickIcon className="mr-2 size-4" />
      Click me
    </Button>
    <Button style={{ "--primary": "24.6 95% 53.1%" }}>
      <MousePointerClickIcon className="mr-2 size-4" />
      Click me
    </Button>
  </div>
);
Default.decorators = decorators;

export const Disabled: Story = () => <Button disabled>Click me</Button>;
Disabled.decorators = decorators;

export const Secondary: Story = () => (
  <Button variant="secondary">Click me</Button>
);
Secondary.decorators = decorators;

export const Outline: Story = () => <Button variant="outline">Click me</Button>;
Outline.decorators = decorators;

export const Destructive: Story = () => (
  <Button variant="destructive">Click me</Button>
);
Destructive.decorators = decorators;

export const Ghost: Story = () => <Button variant="ghost">Click me</Button>;
Ghost.decorators = decorators;

export const Link: Story = () => <Button variant="link">Click me</Button>;
Link.decorators = decorators;

export const WithIcon: Story = () => (
  <Button>
    <PlusIcon className="mr-2 size-4" />
    Add
  </Button>
);
WithIcon.decorators = decorators;

export const IconOnly: Story = () => (
  <Button size="icon">
    <PlusIcon className="size-4" />
  </Button>
);
IconOnly.decorators = decorators;

export const Loading: Story = () => (
  <Button>
    <ReloadIcon className="mr-2 size-4 animate-spin" />
    Add
  </Button>
);
Loading.decorators = decorators;
