import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from './lib/auth0';

export async function middleware(request: NextRequest) {
  const res = await auth0.middleware(request);
  console.log('inside middleware', request.nextUrl.pathname);
  const { pathname, search } = request.nextUrl;

  // 2) Skippa Auth0:s egna endpoints
  if (pathname.startsWith('/auth')) return res;

  // 3) Kolla sessionen (viktigt: skicka in request-objektet i v4)
  const session = await auth0.getSession(request);

  // 4) Redirecta oinloggade till /auth/login med returnTo
  if (!session) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('returnTo', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  // 5) Tillåt requesten
  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
