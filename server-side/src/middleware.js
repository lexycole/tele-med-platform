// import { clerkMiddleware } from "@clerk/nextjs";
import { clerkMiddleware } from '@clerk/nextjs/server'


export default clerkMiddleware({
    apiRoutes: ["/api(.*)"],
  });  

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
// import { NextResponse } from 'next/server'

// // Define public API routes that don't require authentication
// const publicApiRoutes = [
//   '/api/public(.*)',
//   '/api/webhook(.*)',
//   '/sign-in(.*)'
// ]

// const isPublicApiRoute = createRouteMatcher(publicApiRoutes)

// // All other API routes are protected by default
// const isProtectedApiRoute = createRouteMatcher(['/api/(.*)'])

// export default clerkMiddleware((auth, req) => {
//   if (isPublicApiRoute(req)) {
//     // Allow access to public API routes
//     return NextResponse.next()
//   }

//   if (isProtectedApiRoute(req)) {
//     // Protect all other API routes
//     return auth().protect()
//   }

//   // For non-API routes, allow the request to proceed
//   return NextResponse.next()
// })

// export const config = {
//   matcher: [
//     // Only run on API routes
//     '/api/(.*)',
//     // Skip all static files
//     '/((?!_next/static|_next/image|favicon.ico).*)',
//   ],
// }