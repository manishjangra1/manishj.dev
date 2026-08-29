import 'server-only';
import connectDB from '@/lib/db';
import Project from '@/lib/models/Project';
import { toProjectRowProps, type ProjectDbDoc } from './mappers';
import { PROJECT_ROWS, type ProjectRowData } from '@/lib/constants/copy';

export async function getPublicWorkList(): Promise<ProjectRowData[]> {
  try {
    await connectDB();
    const rawProjects = await Project.find({ published: { $ne: false } })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    if (rawProjects && rawProjects.length > 0) {
      const sanitized = JSON.parse(JSON.stringify(rawProjects)) as ProjectDbDoc[];
      return sanitized.map(toProjectRowProps);
    }
  } catch (error) {
    console.error('getPublicWorkList error, falling back to static constants:', error);
  }

  return PROJECT_ROWS;
}
