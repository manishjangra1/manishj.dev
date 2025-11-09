import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Project from '@/lib/models/Project';
import { requireAuth } from '@/lib/auth';
import { StorageFactory } from '@/lib/storage/StorageFactory';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const project = await Project.findById(id).lean();
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    
    // Find the project first
    const project = await Project.findById(id);
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Check if image is being changed and delete old image
    if (body.image !== undefined && body.image !== project.image) {
      const oldImageUrl = project.image;
      
      // Only delete if it's a stored file
      if (oldImageUrl && (oldImageUrl.startsWith('/storage/') || oldImageUrl.includes('blob.vercel-storage.com'))) {
        try {
          const storageService = StorageFactory.getStorageService();
          await storageService.delete(oldImageUrl);
        } catch (error) {
          // Log error but don't fail the update
          console.error('Error deleting old project image:', error);
        }
      }
    }

    // Update all fields explicitly
    if (body.title !== undefined) project.title = body.title;
    if (body.description !== undefined) project.description = body.description;
    if (body.image !== undefined) project.image = body.image;
    if (body.technologies !== undefined) project.technologies = body.technologies;
    if (body.liveUrl !== undefined) project.liveUrl = body.liveUrl;
    if (body.githubUrl !== undefined) project.githubUrl = body.githubUrl;
    // Explicitly handle content field - allow empty strings to be saved
    if ('content' in body) {
      project.content = body.content ?? '';
      project.markModified('content');
    }
    // Explicitly handle boolean fields to ensure false values are saved
    if (body.featured !== undefined) project.featured = Boolean(body.featured);
    if (body.isCurrentlyWorking !== undefined) project.isCurrentlyWorking = Boolean(body.isCurrentlyWorking);
    if (body.order !== undefined) project.order = body.order;

    // Save the updated project
    await project.save();

    // Revalidate the projects page, home page, and the specific project page
    revalidatePath('/projects');
    revalidatePath('/');
    revalidatePath(`/projects/${id}`);

    return NextResponse.json(project.toObject());
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    await connectDB();

    const { id } = await params;
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Delete the project image if it's a stored file
    if (project.image && (project.image.startsWith('/storage/') || project.image.includes('blob.vercel-storage.com'))) {
      try {
        const storageService = StorageFactory.getStorageService();
        await storageService.delete(project.image);
      } catch (error) {
        // Log error but don't fail the deletion
        console.error('Error deleting project image:', error);
      }
    }

    // Delete the project
    await Project.findByIdAndDelete(id);

    // Revalidate the projects page, home page, and the specific project page
    revalidatePath('/projects');
    revalidatePath('/');
    revalidatePath(`/projects/${id}`);

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}

