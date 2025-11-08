import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Blog from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import connectDB from '@/lib/db';
import Settings from '@/lib/models/Settings';
import Project from '@/lib/models/Project';
import Skill from '@/lib/models/Skill';
import ExperienceModel from '@/lib/models/Experience';
import BlogPost from '@/lib/models/BlogPost';

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
      BlogPost.find({ published: true }).sort({ publishedAt: -1, createdAt: -1 }).limit(6).lean(),
    ]);

    return {
      settings: serialize(settings) || {},
      projects: serialize(projects) || [],
      skills: serialize(skills) || [],
      experiences: serialize(experiences) || [],
      blogPosts: serialize(blogPosts) || [],
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      settings: {},
      projects: [],
      skills: [],
      experiences: [],
      blogPosts: [],
    };
  }
}

export default async function Home() {
  const { settings, projects, skills, experiences, blogPosts } = await getData();

  return (
    <main className="min-h-screen w-full">
      <Navigation />
      <Hero 
        heroText={settings?.heroText} 
        siteTitle={settings?.siteTitle}
        heroButton1Text={settings?.heroButton1Text}
        heroButton2Text={settings?.heroButton2Text}
        resumeUrl={settings?.resumeUrl}
      />
      <About 
        aboutText={settings?.aboutText}
        aboutText2={settings?.aboutText2}
        aboutTechStack={settings?.aboutTechStack}
        aboutIcon={settings?.aboutIcon}
      />
      <Skills skills={skills as any} />
      <Projects projects={projects as any} />
      <Experience experiences={experiences as any} />
      <Blog posts={blogPosts as any} />
      <Contact 
        socialLinks={settings?.socialLinks}
        contactHeading={settings?.contactHeading}
        contactDescription={settings?.contactDescription}
      />
      <Footer socialLinks={settings?.socialLinks} />
      </main>
  );
}
