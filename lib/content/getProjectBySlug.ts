import 'server-only';
import connectDB from '@/lib/db';
import Project from '@/lib/models/Project';
import { toCaseStudyData, type ProjectDbDoc } from './mappers';
import { MOCK_CASE_STUDIES, type CaseStudyData } from '@/lib/constants/copy';

export async function getProjectBySlug(slug: string): Promise<CaseStudyData | null> {
  const cleanSlug = slug.toLowerCase().trim();

  try {
    await connectDB();

    const projectDoc = await Project.findOne({
      slug: cleanSlug,
      published: { $ne: false },
    }).lean();

    if (projectDoc) {
      // Find all published projects to determine previous and next project for pager
      const allProjects = (await Project.find({ published: { $ne: false } })
        .sort({ order: 1, createdAt: -1 })
        .select('title slug')
        .lean()) as Array<{ title: string; slug: string }>;

      const currentIndex = allProjects.findIndex((p) => p.slug === cleanSlug);
      const prevProject =
        currentIndex > 0
          ? { title: allProjects[currentIndex - 1].title, slug: allProjects[currentIndex - 1].slug }
          : undefined;
      const nextProject =
        currentIndex >= 0 && currentIndex < allProjects.length - 1
          ? { title: allProjects[currentIndex + 1].title, slug: allProjects[currentIndex + 1].slug }
          : undefined;

      const serializedDoc = JSON.parse(JSON.stringify(projectDoc)) as ProjectDbDoc;
      return toCaseStudyData(serializedDoc, prevProject, nextProject);
    }
  } catch (error) {
    console.error(`getProjectBySlug database error for slug "${slug}":`, error);
  }

  // Fallback to static mock case study if present
  if (MOCK_CASE_STUDIES[cleanSlug]) {
    return MOCK_CASE_STUDIES[cleanSlug];
  }

  return null;
}

export async function getAllProjectSlugs(): Promise<string[]> {
  try {
    await connectDB();
    const projects = (await Project.find({ published: { $ne: false } })
      .select('slug')
      .lean()) as Array<{ slug: string }>;

    if (projects && projects.length > 0) {
      return projects.map((p) => p.slug).filter(Boolean);
    }
  } catch (error) {
    console.error('getAllProjectSlugs error:', error);
  }

  return Object.keys(MOCK_CASE_STUDIES);
}
