import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { StorageFactory } from '@/lib/storage/StorageFactory';

/**
 * DELETE /api/about-image/delete
 * Delete an about section image
 */
export async function DELETE(request: NextRequest) {
  try {
    // Require authentication
    await requireAuth();

    // Get the URL from query parameters
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { error: 'No URL provided' },
        { status: 400 }
      );
    }

    // Delete file using storage service
    const storageService = StorageFactory.getStorageService();
    const success = await storageService.delete(url);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete file' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error deleting about image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}

