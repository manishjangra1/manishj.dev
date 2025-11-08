/**
 * Gets the download URL for a resume
 * Handles multiple URL types:
 * - Local storage URLs (/storage/resumes/...)
 * - Vercel Blob URLs (blob.vercel-storage.com)
 * - Google Drive URLs (converts to direct download)
 * - Other external URLs (returns as is)
 * 
 * @param url - The resume URL
 * @returns The direct download URL
 */
export function getResumeDownloadUrl(url: string): string {
  if (!url) return '';
  
  // If it's a local storage URL, return as is (already accessible)
  if (url.startsWith('/storage/')) {
    return url;
  }
  
  // If it's a Vercel Blob URL, return as is (already publicly accessible)
  if (url.includes('blob.vercel-storage.com')) {
    return url;
  }
  
  // If it's already a direct download URL, return as is
  if (url.includes('uc?export=download')) {
    return url;
  }
  
  // Handle Google Drive URLs - convert to direct download URL
  if (url.includes('drive.google.com')) {
    // Extract file ID from various Google Drive URL formats
    let fileId = '';
    
    // Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch) {
      fileId = fileIdMatch[1];
    } else {
      // Format: https://drive.google.com/open?id=FILE_ID
      const openIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (openIdMatch) {
        fileId = openIdMatch[1];
      } else {
        // Format: https://drive.google.com/uc?id=FILE_ID
        const ucIdMatch = url.match(/\/uc\?id=([a-zA-Z0-9_-]+)/);
        if (ucIdMatch) {
          fileId = ucIdMatch[1];
        }
      }
    }
    
    // If we found a file ID, convert to direct download URL
    if (fileId) {
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
  }
  
  // For any other URL, return as is
  return url;
}

