import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import BlogPost from '@/lib/models/BlogPost';
import { requireAuth } from '@/lib/auth';
import { StorageFactory } from '@/lib/storage/StorageFactory';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const post = await BlogPost.findById(id).lean();
    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    if (body.published && !body.publishedAt) {
      body.publishedAt = new Date();
    }

    // Check if cover image is being changed and delete old image
    const existingPost = await BlogPost.findById(id);
    if (existingPost && body.coverImage !== undefined && body.coverImage !== existingPost.coverImage) {
      const oldImageUrl = existingPost.coverImage;
      
      // Only delete if it's a stored file
      if (oldImageUrl && (oldImageUrl.startsWith('/storage/') || oldImageUrl.includes('blob.vercel-storage.com'))) {
        try {
          const storageService = StorageFactory.getStorageService();
          await storageService.delete(oldImageUrl);
        } catch (error) {
          // Log error but don't fail the update
          console.error('Error deleting old blog post image:', error);
        }
      }
    }

    // Ensure boolean fields are explicitly set (even if false)
    const updateData = {
      ...body,
      featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
    };

    const post = await BlogPost.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).lean();

    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    await connectDB();

    const { id } = await params;
    const post = await BlogPost.findById(id);

    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    // Delete the cover image if it's a stored file
    if (post.coverImage && (post.coverImage.startsWith('/storage/') || post.coverImage.includes('blob.vercel-storage.com'))) {
      try {
        const storageService = StorageFactory.getStorageService();
        await storageService.delete(post.coverImage);
      } catch (error) {
        // Log error but don't fail the deletion
        console.error('Error deleting blog post image:', error);
      }
    }

    // Delete the blog post
    await BlogPost.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}

