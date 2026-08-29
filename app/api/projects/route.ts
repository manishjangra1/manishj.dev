import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Project from '@/lib/models/Project';
import { requireAuth } from '@/lib/auth';
import { slugify } from '@/lib/utils/slug';

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json(projects);
  } catch (error: unknown) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const body = await request.json();
    
    // Ensure slug is provided or generated from title
    const slug = body.slug ? slugify(body.slug) : slugify(body.title || 'project');

    // Ensure boolean fields are explicitly set
    const projectData = {
      ...body,
      slug,
      featured: Boolean(body.featured),
      isCurrentlyWorking: Boolean(body.isCurrentlyWorking),
      published: body.published !== undefined ? Boolean(body.published) : true,
    };
    
    const project = await Project.create(projectData);

    // Revalidate public cache
    revalidatePath('/');
    revalidatePath(`/work/${slug}`);

    return NextResponse.json(project.toObject(), { status: 201 });
  } catch (error: unknown) {
    const err = error as Error;
    if (err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
