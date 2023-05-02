import { SignIn } from '@clerk/nextjs/app-beta';

export default function Page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <SignIn signUpUrl="/auth/sign-up" afterSignInUrl="/dashboard" />
    </div>
  );
}
