import { notFound } from 'next/navigation';
import connectDB from '@/lib/db';
import Project from '@/lib/models/Project';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProjectDetailsClient from '@/components/ProjectDetailsClient';
import Settings from '@/lib/models/Settings';

// Helper function to serialize Mongoose documents to plain objects
function serialize(data: any): any {
  return JSON.parse(JSON.stringify(data));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const project = await Project.findById(id).lean();

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const serializedProject = serialize(project);

  return {
    title: `${serializedProject.title} | Projects`,
    description: serializedProject.description,
    openGraph: {
      title: serializedProject.title,
      description: serializedProject.description,
      images: serializedProject.image ? [serializedProject.image] : [],
    },
  };
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const project = await Project.findById(id).lean();

  if (!project) {
    notFound();
  }

  const serializedProject = serialize(project);

  // Get settings for footer
  let settings = await Settings.findOne().lean();
  if (!settings) {
    settings = { socialLinks: {} };
  }
  const serializedSettings = serialize(settings);

  return (
    <main className="min-h-screen">
      <Navigation />
      <ProjectDetailsClient project={serializedProject} />
      <Footer socialLinks={serializedSettings.socialLinks} />
    </main>
  );
}

