import { NextRequest, NextResponse } from 'next/server';

// Password is only accessible server-side (no NEXT_PUBLIC_ prefix)
const SITE_PASSWORD = process.env.SITE_PASSWORD || 'scout2024';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === SITE_PASSWORD) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
