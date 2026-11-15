import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const clerkKey = process.env['NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'];
const isClerkConfigured = Boolean(
  clerkKey &&
  clerkKey !== 'pk_test_sample' &&
  (clerkKey.startsWith('pk_test_') || clerkKey.startsWith('pk_live_')) &&
  clerkKey.length > 20
);

const isPublicRoute = createRouteMatcher([
  '/',
  '/learn(.*)',
  '/resources(.*)',
  '/interviews(.*)',
  '/playground(.*)',
  '/dashboard(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/health',
]);

const middleware = isClerkConfigured
  ? clerkMiddleware(async (auth, req) => {
      if (!isPublicRoute(req)) {
        await auth.protect();
      }
    })
  : () => NextResponse.next();

export default middleware;

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
