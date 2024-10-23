import type { Icons } from "@stratokit/ui/icons";

export type SidebarItem = {
  name: string;
  href: string;
  icon: keyof typeof Icons;
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: "gauge",
  },
  {
    name: "API",
    href: "/dashboard/api",
    icon: "code",
  },
  {
    name: "Documentation",
    href: "/dashboard/documentation",
    icon: "book",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: "settings",
  },
];

export const siteConfig = {
  title: "Strato",
  description: "Strato is a SaaS starter template built on top of Cloudflare.",
  url: "https://stratokit.dev",
  ogImage: "https://stratokit.dev/og.png",
  links: {
    twitter: "https://twitter.com/jotyy3",
    github: "https://github.com/jotyy/stratokit",
  },
};
