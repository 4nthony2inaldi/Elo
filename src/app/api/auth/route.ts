import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Password is only accessible server-side (no NEXT_PUBLIC_ prefix)
const SITE_PASSWORD = process.env.SITE_PASSWORD || 'scout2024';
const SESSION_SECRET = process.env.SESSION_SECRET || 'scout-session-secret-change-in-production';
const COOKIE_NAME = 'scout_session';

// Simple token generation - in production, use a proper JWT library
function generateSessionToken(): string {
  const timestamp = Date.now();
  const data = `authenticated:${timestamp}:${SESSION_SECRET}`;
  // Simple hash for demo - use crypto in production
  const hash = Buffer.from(data).toString('base64');
  return `${timestamp}:${hash}`;
}

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

// POST - Login
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === SITE_PASSWORD) {
      const token = generateSessionToken();
      const response = NextResponse.json({ success: true });

      // Set HTTP-only cookie - cannot be accessed via JavaScript
      response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}

// GET - Check auth status
export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);

  if (sessionCookie && validateSessionToken(sessionCookie.value)) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

// DELETE - Logout
export async function DELETE() {
  const response = NextResponse.json({ success: true });

  // Clear the session cookie
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  return response;
}
