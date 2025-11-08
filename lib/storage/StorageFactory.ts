import { IStorageService } from './IStorageService';
import { LocalStorageService } from './LocalStorageService';
import { VercelBlobStorageService } from './VercelBlobStorageService';

/**
 * Storage Factory
 * Creates the appropriate storage service based on environment
 * Following Open/Closed Principle - open for extension, closed for modification
 * Following Dependency Inversion Principle - depends on abstractions (IStorageService)
 */
export class StorageFactory {
  private static instance: IStorageService | null = null;

  /**
   * Get the storage service instance
   * Uses Vercel Blob if BLOB_READ_WRITE_TOKEN is available (works in both dev and prod)
   * Falls back to local storage if token is not set
   */
  static getStorageService(): IStorageService {
    if (this.instance) {
      return this.instance;
    }

    // Use Vercel Blob if token is available (works in both dev and prod)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        this.instance = new VercelBlobStorageService();
        console.log('[StorageFactory] Using Vercel Blob Storage');
      } catch (error) {
        console.error('[StorageFactory] Failed to initialize Vercel Blob, falling back to local storage:', error);
        this.instance = new LocalStorageService();
      }
    } else {
      // Use local storage (development/fallback)
      console.log('[StorageFactory] Using Local Storage (BLOB_READ_WRITE_TOKEN not set)');
      this.instance = new LocalStorageService();
    }

    return this.instance;
  }

  /**
   * Reset the instance (useful for testing)
   */
  static reset(): void {
    this.instance = null;
  }
}

