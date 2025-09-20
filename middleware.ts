import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
<<<<<<< HEAD
////////////////
// middleware.ts
// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import { NextRequest, NextResponse } from 'next/server';

// const isPublicRoute = createRouteMatcher([
//   '/',
//   '/api/webhook/clerk',
// ]);

// export default clerkMiddleware((auth, req: NextRequest) => {
//   if (isPublicRoute(req)) {
//     return NextResponse.next();
//   }

//   return auth().then(({ isAuthenticated, redirectToSignIn }) => {
//     if (!isAuthenticated) {
//       return redirectToSignIn({ returnBackUrl: req.url });
//     }
//     return NextResponse.next();
//   });
// });

// export const config = {
//   matcher: [
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     '/(api|trpc)(.*)',
//   ],
// };
=======
>>>>>>> fea486972289d6cdbbbc32902972655deddd945e
