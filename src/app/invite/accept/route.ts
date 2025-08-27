// src/app/invite/accept/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.redirect(
      new URL('/welcome?err=missing_token', req.url),
    );
  }
  // Lägg token i cookie och skicka till login om användaren inte är inloggad
  const res = NextResponse.redirect(new URL('/auth/login', req.url));
  res.cookies.set('invite_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
  return res;
}
