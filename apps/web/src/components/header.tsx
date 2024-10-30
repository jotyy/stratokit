"use client";

import { Icons } from "@stratokit/ui/icons";
import Link from "next/link";

export function Header() {
  return (
    <header className="absolute top-0 w-full flex items-center justify-between p-4 z-10">
      <Link href="/" className="flex items-center gap-2">
        <Icons.logo className="size-10" />
        <span className="hidden md:block text-lg font-medium">stratokit</span>
      </Link>

      <nav className="md:mt-2">
        <ul className="flex items-center gap-4">
          <li>
            <a
              href="https://github.com/jotyy/stratokit"
              className="text-sm px-4 py-2 bg-primary text-secondary rounded-full font-medium"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://stratokit-app.pages.dev"
              className="text-sm px-4 py-2 bg-secondary text-primary rounded-full font-medium"
            >
              Get started
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
