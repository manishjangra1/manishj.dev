import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Settings from '@/lib/models/Settings';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    let settings = await Settings.findOne().lean();
    if (!settings) {
      const newSettings = await Settings.create({});
      settings = JSON.parse(JSON.stringify(newSettings));
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const body = await request.json();
    let settings = await Settings.findOne().lean();

    if (!settings) {
      const newSettings = await Settings.create(body);
      settings = JSON.parse(JSON.stringify(newSettings));
    } else {
      const updatedSettings = await Settings.findOneAndUpdate({}, body, { new: true, runValidators: true }).lean();
      settings = updatedSettings || settings;
    }

    return NextResponse.json(settings);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}

