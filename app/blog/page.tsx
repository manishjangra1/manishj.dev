import Navigation from '@/components/Navigation';
import Blog from '@/components/sections/Blog';
import Footer from '@/components/Footer';
import connectDB from '@/lib/db';
import Settings from '@/lib/models/Settings';
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

    const blogPosts = await BlogPost.find({ published: true })
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();

    return {
      settings: serialize(settings) || {},
      blogPosts: serialize(blogPosts) || [],
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      settings: {},
      blogPosts: [],
    };
  }
}

export default async function BlogPage() {
  const { settings, blogPosts } = await getData();

  return (
    <main className="min-h-screen w-full">
      <Navigation />
      <div className="pt-20">
        <Blog posts={blogPosts as any} showAll={true} />
      </div>
      <Footer socialLinks={settings?.socialLinks} />
    </main>
  );
}

