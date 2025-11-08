import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/lib/models/Project';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const body = await request.json();
    
    // Ensure boolean fields are explicitly set (even if false)
    const projectData = {
      ...body,
      featured: body.featured ?? false,
      isCurrentlyWorking: body.isCurrentlyWorking ?? false,
    };
    
    const project = await Project.create(projectData);

    return NextResponse.json(project.toObject(), { status: 201 });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

