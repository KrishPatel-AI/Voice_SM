import { SignupForm } from "@/components/authenication/signup-form";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-2">
        <Link
          href="/"
          className="flex items-center self-center font-bold text-2xl"
        >
          <span className="text-primary">Voice</span>SM
        </Link>

        <SignupForm />
      </div>
    </div>
  );
}
