import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_SECRET = process.env.SESSION_SECRET || 'scout-session-secret-change-in-production';
const COOKIE_NAME = 'scout_session';

function validateSessionToken(token: string): boolean {
  try {
    const [timestamp, hash] = token.split(':');
    const data = `authenticated:${timestamp}:${SESSION_SECRET}`;
    const expectedHash = Buffer.from(data).toString('base64');

    // Check if hash matches and token is not older than 24 hours
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    return hash === expectedHash && tokenAge < maxAge;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to login page, API routes, and static assets
  if (
    pathname === '/login' ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/images/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check for valid session cookie
  const sessionCookie = request.cookies.get(COOKIE_NAME);

  if (!sessionCookie || !validateSessionToken(sessionCookie.value)) {
    // Redirect to login page
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
