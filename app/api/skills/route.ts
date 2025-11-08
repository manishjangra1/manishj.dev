import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Skill from '@/lib/models/Skill';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const skills = await Skill.find().sort({ order: 1, category: 1 }).lean();
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const body = await request.json();
    const skill = await Skill.create(body);

    return NextResponse.json(skill.toObject(), { status: 201 });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}

