# Storage Service

This directory contains the storage service implementation following SOLID principles.

## Architecture

The storage system uses a factory pattern with interface-based design:

- **IStorageService**: Interface defining the contract for storage operations
- **LocalStorageService**: Implementation for local file system (development)
- **VercelBlobStorageService**: Implementation for Vercel Blob storage (production)
- **StorageFactory**: Factory that returns the appropriate service based on environment

## Usage

```typescript
import { StorageFactory } from '@/lib/storage/StorageFactory';

const storageService = StorageFactory.getStorageService();

// Upload a file
const url = await storageService.upload(file, 'optional-filename.pdf');

// Delete a file
await storageService.delete(url);

// Get download URL
const downloadUrl = await storageService.getDownloadUrl(url);
```

## Environment Setup

### Development (Local Storage)
No configuration needed. Files are stored in `public/storage/resumes/`.

### Production (Vercel Blob)
Set the following environment variable in Vercel:
- `BLOB_READ_WRITE_TOKEN`: Your Vercel Blob read/write token

To get your token:
1. Go to Vercel Dashboard
2. Navigate to your project settings
3. Go to Storage tab
4. Create a Blob store or use an existing one
5. Copy the `BLOB_READ_WRITE_TOKEN`

## SOLID Principles Applied

1. **Single Responsibility**: Each service class handles only one type of storage
2. **Open/Closed**: Easy to add new storage providers without modifying existing code
3. **Liskov Substitution**: All implementations can be used interchangeably
4. **Interface Segregation**: Clean interface with only necessary methods
5. **Dependency Inversion**: Code depends on abstractions (IStorageService), not concrete implementations

