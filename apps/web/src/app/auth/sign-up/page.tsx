import { SignUp } from "@clerk/nextjs/app-beta";

export default function Page() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <SignUp signInUrl="/auth/sign-in" afterSignUpUrl="/dashboard" />
    </div>
  );
}
