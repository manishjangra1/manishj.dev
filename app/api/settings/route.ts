import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Settings from '@/lib/models/Settings';
import { requireAuth } from '@/lib/auth';
import { StorageFactory } from '@/lib/storage/StorageFactory';

export async function GET() {
  try {
    await connectDB();
    let settings = await Settings.findOne().lean();
    if (!settings) {
      const newSettings = await Settings.create({});
      settings = JSON.parse(JSON.stringify(newSettings));
    }
    return NextResponse.json(settings);
  } catch (error: unknown) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const body = await request.json();
    let settings = await Settings.findOne().lean();

    // Check if resume URL is being removed or changed
    if (settings?.resumeUrl && body.resumeUrl !== settings.resumeUrl) {
      const oldUrl = settings.resumeUrl;
      if (oldUrl && (oldUrl.startsWith('/storage/') || oldUrl.includes('blob.vercel-storage.com'))) {
        try {
          const storageService = StorageFactory.getStorageService();
          await storageService.delete(oldUrl);
        } catch (error) {
          console.error('Error deleting old resume file:', error);
        }
      }
    }

    // Check if about image URL is being removed or changed
    if (settings?.aboutImage && body.aboutImage !== settings.aboutImage) {
      const oldImageUrl = settings.aboutImage;
      if (oldImageUrl && (oldImageUrl.startsWith('/storage/') || oldImageUrl.includes('blob.vercel-storage.com'))) {
        try {
          const storageService = StorageFactory.getStorageService();
          await storageService.delete(oldImageUrl);
        } catch (error) {
          console.error('Error deleting old about image file:', error);
        }
      }
    }

    if (!settings) {
      const newSettings = await Settings.create(body);
      settings = JSON.parse(JSON.stringify(newSettings));
    } else {
      const updatedSettings = await Settings.findOneAndUpdate({}, body, { new: true, runValidators: true }).lean();
      settings = updatedSettings || settings;
    }

    // Revalidate home page cache
    revalidatePath('/');

    return NextResponse.json(settings);
  } catch (error: unknown) {
    const err = error as Error;
    if (err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
