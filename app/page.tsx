import DesktopEngine from '@/components/ManishOS/DesktopEngine';
import connectDB from '@/lib/db';
import Settings from '@/lib/models/Settings';
import Project from '@/lib/models/Project';
import Skill from '@/lib/models/Skill';
import ExperienceModel from '@/lib/models/Experience';
import BlogPost from '@/lib/models/BlogPost';
import { DataProvider } from '@/contexts/DataContext';

// Enable on-demand revalidation for this page
export const dynamic = 'force-dynamic';

// Helper function to serialize Mongoose documents to plain objects
function serialize(data: any): any {
  return JSON.parse(JSON.stringify(data));
}

async function getData() {
  try {
    await connectDB();

    let settings = await Settings.findOne().lean();
    if (!settings) {
      const newSettings = await Settings.create({});
      settings = JSON.parse(JSON.stringify(newSettings));
    }

    const [projects, skills, experiences, blogPosts] = await Promise.all([
      Project.find().sort({ order: 1, createdAt: -1 }).lean(),
      Skill.find().sort({ order: 1, category: 1 }).lean(),
      ExperienceModel.find().sort({ order: 1, startDate: -1 }).lean(),
      BlogPost.find({ published: true }).sort({ publishedAt: -1, createdAt: -1 }).lean(),
    ]);

    return {
      settings: serialize(settings) || {},
      projects: serialize(projects) || [],
      skills: serialize(skills) || [],
      experience: serialize(experiences) || [],
      blogPosts: serialize(blogPosts) || [],
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      settings: {},
      projects: [],
      skills: [],
      experience: [],
      blogPosts: [],
    };
  }
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="min-h-screen w-full bg-black overflow-hidden">
      <DataProvider initialData={data}>
        <DesktopEngine />
      </DataProvider>
    </main>
  );
}
