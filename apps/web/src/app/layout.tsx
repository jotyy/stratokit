import "@stratokit/ui/globals.css";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Provider as AnalyticsProvider } from "@stratokit/analytics/client";
import { cn } from "@stratokit/ui/cn";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Tektur } from "next/font/google";

const DepartureMono = Tektur({
  subsets: ["latin"],
  variable: "--font-departure-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stratokit.run"),
  title: "Create stratokit",
  description:
    "A free, open-source starter kit for your next project, built with insights from Midday.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${DepartureMono.variable} ${GeistSans.variable} ${GeistMono.variable}`,
          "antialiased dark",
        )}
      >
        <Header />
        {children}
        <Footer />

        <AnalyticsProvider />
      </body>
    </html>
  );
}
