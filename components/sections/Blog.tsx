'use client';

import { useData } from '@/contexts/DataContext';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Blog() {
  const { blogPosts } = useData();

  return (
    <section id="blog" className="flex flex-col gap-12">
      <div className="flex flex-col">
        <h2 className="flex flex-col">
          <span>Latest</span>
          <span className="h1-grey">Thoughts</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {blogPosts.slice(0, 3).map((post: any, index: number) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="dark-card group cursor-pointer flex items-center justify-between hover:bg-[#262626] transition-colors"
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-black uppercase tracking-tight">{post.title}</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} — Research</p>
            </div>

            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
              <ArrowUpRight size={20} className="text-white/20" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
