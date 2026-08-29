import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Project from '@/lib/models/Project';
import { requireAuth } from '@/lib/auth';
import { StorageFactory } from '@/lib/storage/StorageFactory';
import { slugify } from '@/lib/utils/slug';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const project = await Project.findById(id).lean();
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error: unknown) {
    console.error('Error fetching project by id:', error);
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

    const previousSlug = project.slug;

    // Check if image is being changed and delete old image
    if (body.image !== undefined && body.image !== project.image) {
      const oldImageUrl = project.image;
      if (oldImageUrl && (oldImageUrl.startsWith('/storage/') || oldImageUrl.includes('blob.vercel-storage.com'))) {
        try {
          const storageService = StorageFactory.getStorageService();
          await storageService.delete(oldImageUrl);
        } catch (error) {
          console.error('Error deleting old project image:', error);
        }
      }
    }

    // Update all fields explicitly
    if (body.title !== undefined) project.title = body.title;
    if (body.slug !== undefined) project.slug = slugify(body.slug);
    if (body.kicker !== undefined) project.kicker = body.kicker;
    if (body.year !== undefined) project.year = body.year;
    if (body.role !== undefined) project.role = body.role;
    if (body.imageAlt !== undefined) project.imageAlt = body.imageAlt;
    if (body.description !== undefined) project.description = body.description;
    if (body.image !== undefined) project.image = body.image;
    if (body.technologies !== undefined) project.technologies = body.technologies;
    if (body.liveUrl !== undefined) project.liveUrl = body.liveUrl;
    if (body.githubUrl !== undefined) project.githubUrl = body.githubUrl;
    if (body.caseStudy !== undefined) project.caseStudy = body.caseStudy;
    
    if ('content' in body) {
      project.content = body.content ?? '';
      project.markModified('content');
    }
    if (body.featured !== undefined) project.featured = Boolean(body.featured);
    if (body.isCurrentlyWorking !== undefined) project.isCurrentlyWorking = Boolean(body.isCurrentlyWorking);
    if (body.published !== undefined) project.published = Boolean(body.published);
    if (body.order !== undefined) project.order = body.order;

    await project.save();

    // Revalidate the public cache
    revalidatePath('/');
    if (previousSlug) revalidatePath(`/work/${previousSlug}`);
    if (project.slug) revalidatePath(`/work/${project.slug}`);

    return NextResponse.json(project.toObject());
  } catch (error: unknown) {
    const err = error as Error;
    if (err.message === 'Unauthorized') {
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

    if (project.image && (project.image.startsWith('/storage/') || project.image.includes('blob.vercel-storage.com'))) {
      try {
        const storageService = StorageFactory.getStorageService();
        await storageService.delete(project.image);
      } catch (error) {
        console.error('Error deleting project image:', error);
      }
    }

    const slug = project.slug;
    await Project.findByIdAndDelete(id);

    revalidatePath('/');
    if (slug) revalidatePath(`/work/${slug}`);

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error: unknown) {
    const err = error as Error;
    if (err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
