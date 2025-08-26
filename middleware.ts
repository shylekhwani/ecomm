import { clerkMiddleware } from '@clerk/nextjs/server';


export default clerkMiddleware({
  authorizedParties: [
    "https://ecomm-7tax7sjak-shylekhwanis-projects.vercel.app",
    "https://ecomm-ebon-nine.vercel.app", // your Vercel URL
    "http://localhost:3000",
  ], 
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // explicitly include Studio
    "/studio/:path*", // <--- 
  ],
};