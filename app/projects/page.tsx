import Navigation from '@/components/Navigation';
import Projects from '@/components/sections/Projects';
import Footer from '@/components/Footer';
import connectDB from '@/lib/db';
import Settings from '@/lib/models/Settings';
import Project from '@/lib/models/Project';

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

    const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();

    return {
      settings: serialize(settings) || {},
      projects: serialize(projects) || [],
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      settings: {},
      projects: [],
    };
  }
}

export default async function ProjectsPage() {
  const { settings, projects } = await getData();

  return (
    <main className="min-h-screen w-full">
      <Navigation />
      <div className="pt-20">
        <Projects projects={projects as any} showAll={true} />
      </div>
      <Footer socialLinks={settings?.socialLinks} />
    </main>
  );
}

