import { promises as fs } from 'fs';
import path from 'path';
import { IStorageService } from './IStorageService';

/**
 * Local File Storage Service
 * Stores files in the local filesystem (for development)
 * Following Single Responsibility Principle - handles only local file operations
 */
export class LocalStorageService implements IStorageService {
  private readonly baseStorageDir: string;

  constructor() {
    // Store in public/storage for easy access
    this.baseStorageDir = path.join(process.cwd(), 'public', 'storage');
  }

  private getStorageDir(subdirectory: string = 'resumes'): string {
    return path.join(this.baseStorageDir, subdirectory);
  }

  private async ensureStorageDir(subdirectory: string = 'resumes'): Promise<void> {
    try {
      const storageDir = this.getStorageDir(subdirectory);
      await fs.mkdir(storageDir, { recursive: true });
    } catch (error) {
      console.error('Error creating storage directory:', error);
    }
  }

  async upload(file: File | Buffer, filename?: string): Promise<string> {
    try {
      const buffer = file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;
      
      // Determine subdirectory based on filename or file type
      let subdirectory = 'resumes';
      if (filename) {
        // Check if filename suggests it's an image
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
        const ext = path.extname(filename).toLowerCase();
        if (imageExtensions.includes(ext)) {
          subdirectory = 'images';
        }
      } else if (file instanceof File) {
        const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (imageTypes.includes(file.type)) {
          subdirectory = 'images';
        }
      }
      
      await this.ensureStorageDir(subdirectory);
      
      // Generate filename if not provided
      const finalFilename = filename || this.generateFilename(
        file instanceof File ? file.name : (subdirectory === 'images' ? 'image.jpg' : 'resume.pdf')
      );
      const storageDir = this.getStorageDir(subdirectory);
      const filePath = path.join(storageDir, finalFilename);

      // Write file to disk
      await fs.writeFile(filePath, buffer);

      // Return public URL
      return `/storage/${subdirectory}/${finalFilename}`;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }

  async delete(url: string): Promise<boolean> {
    try {
      // Extract subdirectory and filename from URL
      // URL format: /storage/{subdirectory}/{filename}
      const urlParts = url.split('/').filter(Boolean);
      if (urlParts.length < 3 || urlParts[0] !== 'storage') {
        return false;
      }
      const subdirectory = urlParts[1];
      const filename = urlParts.slice(2).join('/');
      const storageDir = this.getStorageDir(subdirectory);
      const filePath = path.join(storageDir, filename);

      // Check if file exists
      try {
        await fs.access(filePath);
      } catch {
        // File doesn't exist, consider it deleted
        return true;
      }

      // Delete file
      await fs.unlink(filePath);
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  async getDownloadUrl(url: string): Promise<string> {
    // For local storage, the URL is already a public path
    return url;
  }

  private generateFilename(originalName: string): string {
    const timestamp = Date.now();
    const ext = path.extname(originalName) || '.pdf';
    const name = path.basename(originalName, ext).replace(/[^a-zA-Z0-9]/g, '_');
    return `${name}_${timestamp}${ext}`;
  }
}

