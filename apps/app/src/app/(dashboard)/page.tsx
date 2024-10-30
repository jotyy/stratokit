import { SignOut } from "@/components/sign-out";

export const metadata = {
  title: "Home",
};

export const runtime = "edge";

export default function Page() {
  return (
    <div className="size-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <p>Welcome</p>

        <SignOut />
      </div>
    </div>
  );
}
