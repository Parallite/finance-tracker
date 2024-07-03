import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
    '/(.*)',
]);

const isPublicRoute = createRouteMatcher([
    '/sign-in',
    '/sign-up'
]);

export default clerkMiddleware((auth, req) => {
    if (!auth().userId && isProtectedRoute(req) && !isPublicRoute(req)) {
        // Add custom logic to run before redirecting
        return auth().redirectToSignIn();
    }
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};