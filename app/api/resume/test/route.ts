import { NextResponse } from 'next/server';
import { StorageFactory } from '@/lib/storage/StorageFactory';

/**
 * GET /api/resume/test
 * Test endpoint to check which storage service is being used
 */
export async function GET() {
  try {
    const storageService = StorageFactory.getStorageService();
    const serviceType = storageService.constructor.name;
    
    return NextResponse.json({
      service: serviceType,
      isVercelBlob: serviceType === 'VercelBlobStorageService',
      isLocalStorage: serviceType === 'LocalStorageService',
      hasToken: !!process.env.BLOB_READ_WRITE_TOKEN,
      message: serviceType === 'VercelBlobStorageService' 
        ? 'Vercel Blob is configured and ready to use'
        : 'Using local storage (BLOB_READ_WRITE_TOKEN not set or invalid)',
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      service: 'Error',
      hasToken: !!process.env.BLOB_READ_WRITE_TOKEN,
    }, { status: 500 });
  }
}

