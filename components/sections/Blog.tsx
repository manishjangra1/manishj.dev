'use client';

import { useData } from '@/contexts/DataContext';
import Section from '../Section';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Blog() {
  const { blogPosts } = useData();

  const displayPosts = blogPosts.length > 0 ? blogPosts : [
    { _id: '1', title: 'The Future of Creative Engineering', slug: 'future-of-creative-engineering', createdAt: new Date(), excerpt: 'Exploring the intersection of art and architecture in modern web systems.' },
    { _id: '2', title: 'Why Minimalism is Luxurious', slug: 'minimalism-is-luxurious', createdAt: new Date(), excerpt: 'How restraint in design communicates confidence and premium taste.' },
    { _id: '3', title: 'Interaction as Narrative', slug: 'interaction-as-narrative', createdAt: new Date(), excerpt: 'Building digital experiences that tell stories through motion and response.' },
  ];

  return (
    <Section id="blog" className="bg-transparent pb-40">
      <div className="flex justify-between items-end mb-20">
        <div>
          <span className="label">The Journal</span>
          <h2 className="mt-4">Thoughts & <span className="text-accent italic">Research</span></h2>
        </div>
        <Link href="/blog" className="label hover:text-accent transition-colors underline decoration-accent/30 underline-offset-8">
          View All Posts
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {displayPosts.slice(0, 3).map((post: any, index: number) => (
          <BlogCard key={post._id} post={post} index={index} />
        ))}
      </div>
    </Section>
  );
}

function BlogCard({ post, index }: { post: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="flex flex-col gap-6 group"
    >
      <div className="aspect-[4/3] bg-foreground/5 overflow-hidden rounded-sm relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-100 transition-opacity duration-700">
           <span className="h2 italic">Post</span>
        </div>
        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-mono opacity-40">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
          <div className="h-[1px] w-12 bg-foreground/10 group-hover:w-full transition-all duration-700 group-hover:bg-accent/30" />
        </div>
        
        <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">{post.title}</h3>
        
        <p className="body text-xs opacity-50 line-clamp-2">
          {post.excerpt || post.content?.substring(0, 100) || "Exploring deep technical insights and design philosophies for the modern web."}
        </p>

        <Link 
          href={`/blog/${post.slug || post._id}`}
          className="mt-4 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 group/btn"
        >
          Read Article 
          <span className="w-6 h-[1px] bg-foreground/30 group-hover/btn:bg-accent group-hover/btn:w-10 transition-all duration-500" />
        </Link>
      </div>
    </motion.div>
  );
}
