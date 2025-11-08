import { NextRequest, NextResponse } from 'next/server';
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

    // Check if resume URL is being removed or changed
    if (settings?.resumeUrl && body.resumeUrl !== settings.resumeUrl) {
      const oldUrl = settings.resumeUrl;
      
      // Only delete if it's a stored file (not external URL like Google Drive)
      if (oldUrl && (oldUrl.startsWith('/storage/') || oldUrl.includes('blob.vercel-storage.com'))) {
        try {
          const storageService = StorageFactory.getStorageService();
          await storageService.delete(oldUrl);
        } catch (error) {
          // Log error but don't fail the update
          console.error('Error deleting old resume file:', error);
        }
      }
    }

    // Check if about image URL is being removed or changed
    if (settings?.aboutImage && body.aboutImage !== settings.aboutImage) {
      const oldImageUrl = settings.aboutImage;
      
      // Only delete if it's a stored file
      if (oldImageUrl && (oldImageUrl.startsWith('/storage/') || oldImageUrl.includes('blob.vercel-storage.com'))) {
        try {
          const storageService = StorageFactory.getStorageService();
          await storageService.delete(oldImageUrl);
        } catch (error) {
          // Log error but don't fail the update
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

    return NextResponse.json(settings);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}

