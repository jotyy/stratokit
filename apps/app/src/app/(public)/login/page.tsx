import { auth, signIn } from "@/lib/auth";
import { siteConfig } from "@/lib/config";
import { Button } from "@stratokit/ui/button";
import { Icons } from "@stratokit/ui/icons";
import { Input } from "@stratokit/ui/input";
import { Label } from "@stratokit/ui/label";
import { Separator } from "@stratokit/ui/separator";
import Link from "next/link";
import { redirect } from "next/navigation";

export const runtime = "edge";

export const metadata = {
  title: `Sign in | ${siteConfig.title}`,
};

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-[100dvh] overflow-hidden relative items-center justify-center">
      <div className="absolute -bottom-[280px] inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4.5rem_2rem] -z-10 [transform:perspective(560px)_rotateX(63deg)] pointer-events-none" />
      <div className="absolute w-full bottom-[100px] h-1/2 bg-gradient-to-b from-background to-transparent pointer-events-none -z-10" />

      <div className="mx-auto z-10 w-full max-w-[500px]">
        <div className="mb-8 text-center">
          <Icons.logo className="size-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold tracking-tighter">Welcome back</h1>
          <p className="text-foreground/60 font-normal">
            Sign in to your account to continue
          </p>
        </div>
        <form
          action={async (formData) => {
            "use server";

            await signIn("resend", formData);
          }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="m@example.com"
              required
              type="email"
              className="h-10"
            />
          </div>
          <Button className="w-full" size="lg">
            Sign In
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          <p className="text-foreground/60">
            Don't have an account?
            <Link
              className="font-medium text-foreground/80 underline-offset-4 hover:underline ml-2"
              href="/sign-up"
            >
              Sign up
            </Link>
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex items-center justify-center gap-4">
          <form
            action={async () => {
              "use server";

              await signIn("github", { redirectTo: "/" });
            }}
          >
            <Button size="lg" variant="outline">
              <Icons.gitHub className="mr-2 size-4" />
              Sign in with GitHub
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
