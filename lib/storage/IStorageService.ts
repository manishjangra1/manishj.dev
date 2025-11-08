/**
 * Storage Service Interface
 * Defines the contract for file storage operations
 * Following Interface Segregation Principle - clients depend only on methods they use
 */
export interface IStorageService {
  /**
   * Upload a file and return its URL
   * @param file - The file to upload
   * @param path - Optional path/filename for the file
   * @returns The URL of the uploaded file
   */
  upload(file: File | Buffer, path?: string): Promise<string>;

  /**
   * Delete a file by its URL
   * @param url - The URL of the file to delete
   * @returns True if deletion was successful
   */
  delete(url: string): Promise<boolean>;

  /**
   * Get a download URL for a file
   * @param url - The stored URL of the file
   * @returns A URL that can be used to download the file
   */
  getDownloadUrl(url: string): Promise<string>;
}

