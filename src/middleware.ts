// import { NextRequest, NextResponse } from 'next/server';
// import { auth0 } from './lib/auth0';
//
// export async function middleware(request: NextRequest) {
//   const res = await auth0.middleware(request);
//   console.log('inside middleware', request.nextUrl.pathname);
//   const { pathname, search } = request.nextUrl;
//
//   // 2) Skippa Auth0:s egna endpoints
//   if (pathname.startsWith('/auth') || pathname === '/') return res;
//
//   // 3) Kolla sessionen (viktigt: skicka in request-objektet i v4)
//   const session = await auth0.getSession(request);
//
//   // 4) Redirecta oinloggade till /auth/login med returnTo
//   if (!session) {
//     const loginUrl = new URL('/auth/login', request.url);
//     loginUrl.searchParams.set('returnTo', pathname + search);
//     return NextResponse.redirect(loginUrl);
//   }
//
//   // 5) Tillåt requesten
//   return res;
// }
//
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico, sitemap.xml, robots.txt (metadata files)
//      */
//     '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
//   ],
// };

// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from './lib/auth0';

export async function middleware(req: NextRequest) {
  // Låt SDK:t hantera /auth/* och cookies
  const res = await auth0.middleware(req);
  const { pathname, search } = req.nextUrl;

  if (pathname.startsWith('/auth')) return res;

  // 1) Publik startsida men redirecta inloggade
  if (pathname === '/') {
    const session = await auth0.getSession(req);
    if (session) return NextResponse.redirect(new URL('/dashboard', req.url));
    return res; // oinloggad får se /
  }

  // 2) Skydda allt annat
  const session = await auth0.getSession(req);
  if (!session) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('returnTo', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!images|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
