import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import BlogPost from '@/lib/models/BlogPost';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const published = searchParams.get('published');

    let query: any = {};
    if (published === 'true') {
      query.published = true;
    }

    const posts = await BlogPost.find(query).sort({ publishedAt: -1, createdAt: -1 }).lean();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    await connectDB();

    const body = await request.json();
    if (body.published && !body.publishedAt) {
      body.publishedAt = new Date();
    }
    
    // Ensure boolean fields are explicitly set (even if false)
    const postData = {
      ...body,
      featured: body.featured ?? false,
    };
    
    const post = await BlogPost.create(postData);

    return NextResponse.json(post.toObject(), { status: 201 });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}

