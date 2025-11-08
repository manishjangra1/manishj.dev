import { put, del, head } from '@vercel/blob';
import { IStorageService } from './IStorageService';

/**
 * Vercel Blob Storage Service
 * Stores files in Vercel Blob storage (for production)
 * Following Single Responsibility Principle - handles only Vercel Blob operations
 */
export class VercelBlobStorageService implements IStorageService {
  private readonly token: string;

  constructor() {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      throw new Error('BLOB_READ_WRITE_TOKEN environment variable is required for Vercel Blob storage');
    }
    this.token = token;
  }

  async upload(file: File | Buffer, filename?: string): Promise<string> {
    try {
      const buffer = file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;
      
      // Determine if it's an image or PDF
      let isImage = false;
      let contentType = 'application/pdf';
      let subdirectory = 'resumes';
      
      if (file instanceof File) {
        const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        isImage = imageTypes.includes(file.type);
        if (isImage) {
          contentType = file.type;
          subdirectory = 'images';
        }
      } else if (filename) {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
        const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
        isImage = imageExtensions.includes(ext);
        if (isImage) {
          subdirectory = 'images';
          contentType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
                       ext === '.png' ? 'image/png' :
                       ext === '.webp' ? 'image/webp' :
                       ext === '.gif' ? 'image/gif' : 'image/jpeg';
        }
      }
      
      // Generate filename if not provided
      const finalFilename = filename || this.generateFilename(
        file instanceof File ? file.name : (isImage ? 'image.jpg' : 'resume.pdf')
      );

      // Upload to Vercel Blob
      const blob = await put(`${subdirectory}/${finalFilename}`, buffer, {
        access: 'public',
        token: this.token,
        contentType,
      });

      return blob.url;
    } catch (error) {
      console.error('Error uploading file to Vercel Blob:', error);
      throw new Error('Failed to upload file to Vercel Blob');
    }
  }

  async delete(url: string): Promise<boolean> {
    try {
      // Delete from Vercel Blob using the full URL
      await del(url, { token: this.token });
      return true;
    } catch (error: any) {
      // If blob doesn't exist, consider it deleted
      if (error?.status === 404 || error?.message?.includes('not found')) {
        return true;
      }
      console.error('Error deleting file from Vercel Blob:', error);
      return false;
    }
  }

  async getDownloadUrl(url: string): Promise<string> {
    // Vercel Blob URLs are already publicly accessible
    return url;
  }

  private generateFilename(originalName: string): string {
    const timestamp = Date.now();
    const ext = originalName.includes('.') 
      ? originalName.substring(originalName.lastIndexOf('.')) 
      : '.pdf';
    const name = originalName
      .replace(ext, '')
      .replace(/[^a-zA-Z0-9]/g, '_');
    return `${name}_${timestamp}${ext}`;
  }
}

