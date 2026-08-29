import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Settings, { ISettings } from '@/lib/models/Settings';
import { getResumeDownloadUrl } from '@/lib/utils/resume';

export async function GET() {
  try {
    await connectDB();
    const settings = await Settings.findOne().lean<ISettings | null>();

    if (settings && settings.resumeUrl) {
      const resumeUrl = getResumeDownloadUrl(settings.resumeUrl);
      if (resumeUrl) {
        return NextResponse.redirect(resumeUrl, 307);
      }
    }
  } catch (error) {
    console.error('Error fetching resume URL:', error);
  }

  // Fallback to static resume in public folder
  return NextResponse.redirect(new URL('/resume.pdf', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'), 307);
}
