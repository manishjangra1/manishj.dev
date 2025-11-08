/**
 * Converts a Google Drive sharing URL to a direct download URL
 * Supports multiple Google Drive URL formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 * 
 * @param url - The Google Drive URL
 * @returns The direct download URL, or the original URL if it's not a Google Drive URL
 */
export function getResumeDownloadUrl(url: string): string {
  if (!url) return '';
  
  // If it's already a direct download URL, return as is
  if (url.includes('uc?export=download')) {
    return url;
  }
  
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
  
  // If it's not a Google Drive URL or we couldn't extract the ID, return as is
  return url;
}

