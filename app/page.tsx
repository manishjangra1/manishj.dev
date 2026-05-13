import ProfileCard from '@/components/ProfileCard';
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Tools from '@/components/sections/Tools';
import Blog from '@/components/sections/Blog';
import { DataProvider } from '@/contexts/DataContext';
import connectDB from '@/lib/db';
import Settings from '@/lib/models/Settings';
import Project from '@/lib/models/Project';
import Skill from '@/lib/models/Skill';
import ExperienceModel from '@/lib/models/Experience';
import BlogPost from '@/lib/models/BlogPost';

export const dynamic = 'force-dynamic';

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
    <main className="min-h-screen">
      <DataProvider initialData={data}>
        <Navigation />
        
        <div className="main-container">
          <div className="main-grid">
            {/* Left Column: Fixed Profile Card */}
            <aside className="sticky top-[40px]">
              <ProfileCard />
            </aside>

            {/* Right Column: Scrollable Content */}
            <div className="flex flex-col gap-[100px]">
              <Hero />
              <Projects />
              <Experience />
              <Tools />
              <Blog />
              
              <footer className="py-20 border-t border-white/5 flex justify-between items-center opacity-30 text-[10px] uppercase tracking-widest font-bold">
                 <span>© 2026 Manish</span>
                 <span>Made in Framer</span>
              </footer>
            </div>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-[6000] items-end">
          <button className="bg-[#FF5F2E] text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">
            Use Template for Free
          </button>
          <button className="bg-[#C5FF41] text-black px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">
            More Templates
          </button>
          <div className="bg-white border border-black/5 px-3 py-2 rounded-lg flex items-center gap-2 shadow-xl">
            <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H12V6H6L0 0Z" fill="black"/>
              <path d="M0 6H6L12 12H0V6Z" fill="black"/>
              <path d="M0 12H6L12 18H0V12Z" fill="black"/>
            </svg>
            <span className="text-[10px] font-bold text-black uppercase tracking-tight">Made in Framer</span>
          </div>
        </div>
      </DataProvider>
    </main>
  );
}
