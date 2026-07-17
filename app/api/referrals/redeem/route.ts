import { NextRequest, NextResponse } from 'next/server';
import { redeemCode } from '@/lib/referralStore';

export async function POST(req: NextRequest) {
  const sessionCookie = req.cookies.get('session')?.value;
  if (!sessionCookie) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 },
    );
  }

  if (!body.code) {
    return NextResponse.json(
      { error: 'Missing referral code' },
      { status: 400 },
    );
  }

  const ok = redeemCode(body.code, sessionCookie);
  if (!ok) {
    return NextResponse.json(
      { error: 'Invalid or already redeemed code' },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true });
}
