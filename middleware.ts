import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    '/',
    '/api/webhook/clerk',
    '/api/message',
    '/api/room/create'

  ],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: [
    '/api/webhook/clerk',
    '/api/message',
    '/api/room/create'
],
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};