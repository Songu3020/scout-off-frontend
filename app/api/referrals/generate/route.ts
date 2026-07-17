import { NextRequest, NextResponse } from 'next/server';
import { generateCode } from '@/lib/referralStore';

export async function POST(req: NextRequest) {
  const sessionCookie = req.cookies.get('session')?.value;
  if (!sessionCookie) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const referral = generateCode(sessionCookie);
  return NextResponse.json(referral);
}
