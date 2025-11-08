import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Experience from '@/lib/models/Experience';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const experiences = await Experience.find().sort({ order: 1, startDate: -1 }).lean();
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const body = await request.json();
    const experience = await Experience.create(body);

    return NextResponse.json(experience.toObject(), { status: 201 });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}

