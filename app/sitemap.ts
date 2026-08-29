import { MetadataRoute } from 'next';
import connectDB from '@/lib/db';
import Project from '@/lib/models/Project';
import { MOCK_CASE_STUDIES } from '@/lib/constants/copy';

interface SitemapProject {
  slug: string;
  updatedAt?: Date | string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://manishj.dev';
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  try {
    await connectDB();
    const projects = (await Project.find({ published: { $ne: false } })
      .select('slug updatedAt')
      .lean()) as unknown as SitemapProject[];

    if (projects && projects.length > 0) {
      projects.forEach((p) => {
        if (p.slug) {
          routes.push({
            url: `${baseUrl}/work/${p.slug}`,
            lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
          });
        }
      });
      return routes;
    }
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);
  }

  // Fallback to static slugs
  Object.keys(MOCK_CASE_STUDIES).forEach((slug) => {
    routes.push({
      url: `${baseUrl}/work/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  return routes;
}
