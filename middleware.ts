import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/hackathons(.*)",
  "/teams(.*)",
  "/api/hackathons(.*)",
  "/api/set-role",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    // Accessing auth().userId will automatically enforce authentication
    auth().userId;
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
