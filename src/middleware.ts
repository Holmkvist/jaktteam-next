import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from './lib/auth0';

function readClaimFromIdToken(idToken: string, key: string) {
  try {
    const payloadB64 = idToken
      .split('.')[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const json = atob(payloadB64);
    const payload = JSON.parse(json);
    return payload[key];
  } catch {
    return undefined;
  }
}

export async function middleware(req: NextRequest) {
  // Låt SDK:t hantera /auth/* och cookies
  const res = await auth0.middleware(req);

  const { pathname, search } = req.nextUrl;

  if (pathname.startsWith('/auth')) return res;

  // 1) Publik startsida men redirecta inloggade
  if (pathname === '/') {
    const session = await auth0.getSession(req);
    if (session) return NextResponse.redirect(new URL('/dashboard', req.url));
    return res;
  }

  // 2) Skydda allt annat
  const session = await auth0.getSession(req);
  if (!session) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('returnTo', pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  // om onboarding → tvinga till /welcome
  const idToken = session.tokenSet?.idToken as string | undefined;
  const onboardingClaim =
    idToken && readClaimFromIdToken(idToken, 'https://your.app/onboarding');

  const needsOnboarding =
    req.cookies.get('onboarding')?.value === '1' || onboardingClaim === true;

  console.log('needsOnboarding', { needsOnboarding, onboardingClaim });
  if (
    needsOnboarding &&
    !pathname.startsWith('/welcome') &&
    !pathname.startsWith('/invite')
  ) {
    res.cookies.set('onboarding', '0', { secure: true });
    return NextResponse.redirect(new URL('/welcome', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!images|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
