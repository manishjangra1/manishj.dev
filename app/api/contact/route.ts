import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Contact from '@/lib/models/Contact';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const read = searchParams.get('read');

    let query: any = {};
    if (read !== null) {
      query.read = read === 'true';
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const contact = await Contact.create(body);

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create contact message' }, { status: 500 });
  }
}

