import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Contact from '@/lib/models/Contact';
import { requireAuth } from '@/lib/auth';
import { contactFormSchema } from '@/lib/validation/contact';

// In-memory rate limiting map: IP -> timestamp[]
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Filter timestamps within window
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

export async function GET(request: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const read = searchParams.get('read');

    const query: Record<string, boolean> = {};
    if (read !== null) {
      query.read = read === 'true';
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error: unknown) {
    const err = error as Error;
    if (err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting by IP
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp || '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Please try again in a minute' },
        { status: 429 }
      );
    }

    // 2. Parse and validate body with Zod
    const body = await request.json();
    const parseResult = contactFormSchema.safeParse(body);

    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      parseResult.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      return NextResponse.json(
        { error: 'Validation failed', fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, message, website } = parseResult.data;

    // 3. Honeypot check: If bot filled 'website', reject silently
    if (website && website.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 4. Save to MongoDB
    await connectDB();
    const contact = await Contact.create({
      name,
      email,
      message,
      read: false,
    });

    return NextResponse.json({ success: true, id: contact._id }, { status: 201 });
  } catch (error: unknown) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Could not send message. Please try again or email directly.' },
      { status: 500 }
    );
  }
}
