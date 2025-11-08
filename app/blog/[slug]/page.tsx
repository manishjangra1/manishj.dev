import { notFound } from 'next/navigation';
import connectDB from '@/lib/db';
import BlogPost from '@/lib/models/BlogPost';
import { format } from 'date-fns';
import Image from 'next/image';
import Navigation from '@/components/Navigation';

// Helper function to serialize Mongoose documents to plain objects
function serialize(data: any): any {
  return JSON.parse(JSON.stringify(data));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB();
  const { slug } = await params;
  const post = await BlogPost.findOne({ slug, published: true }).lean();

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const serializedPost = serialize(post);

  return {
    title: `${serializedPost.title} | Blog`,
    description: serializedPost.excerpt,
    openGraph: {
      title: serializedPost.title,
      description: serializedPost.excerpt,
      images: serializedPost.coverImage ? [serializedPost.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  await connectDB();
  const { slug } = await params;
  const post = await BlogPost.findOne({ slug, published: true }).lean();

  if (!post) {
    notFound();
  }

  const serializedPost = serialize(post);

  return (
    <main className="min-h-screen bg-slate-900">
      <Navigation />
      <article className="max-w-4xl mx-auto px-4 py-20">
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {serializedPost.tags?.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-purple-600/20 text-purple-300 rounded-full border border-purple-600/30"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{serializedPost.title}</h1>
          {serializedPost.publishedAt && (
            <p className="text-slate-400">
              {format(new Date(serializedPost.publishedAt), 'MMMM dd, yyyy')}
            </p>
          )}
        </header>

        {serializedPost.coverImage && (
          <div className="relative w-full h-96 mb-12 rounded-2xl overflow-hidden">
            <Image
              src={serializedPost.coverImage}
              alt={serializedPost.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-invert prose-lg max-w-none text-slate-300"
          dangerouslySetInnerHTML={{ __html: serializedPost.content }}
        />
      </article>
    </main>
  );
}

