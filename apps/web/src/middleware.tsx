import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Set the paths that don't require the user to be signed in
const publicPaths = ["/auth/sign-in*", "/auth/sign-up*"];

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

export default withClerkMiddleware((request: NextRequest) => {
  const { userId } = getAuth(request);

  const dashboard = new URL("/dashboard", request.url);
  const signInUrl = new URL("/auth/sign-in", request.url);

  // Homepage redirects to dashboard if signed in
  // otherwise redirects to sign in page.
  if (request.nextUrl.pathname === "/") {
    if (userId) {
      return NextResponse.redirect(dashboard);
    } else {
      return NextResponse.redirect(signInUrl);
    }
  }

  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (!userId) {
    signInUrl.searchParams.set("redirect_url", request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

// Stop Middleware running on static files and public folder
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public folder
     */
    "/((?!static|.*\\..*|_next|favicon.ico).*)",
    "/",
  ],
};
