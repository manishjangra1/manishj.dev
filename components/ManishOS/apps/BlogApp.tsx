'use client';

import React from 'react';
import { useOS } from '@/contexts/OSContext';

const BlogApp: React.FC = () => {
  const { resolvedTheme } = useOS();

  return (
    <div className={`h-full p-8 overflow-y-auto custom-scrollbar transition-colors duration-500 ${
      resolvedTheme === 'dark' ? 'bg-zinc-900/50 text-white' : 'bg-white/50 text-zinc-900'
    }`}>
      <h2 className="text-2xl font-bold mb-8">Latest Insights</h2>
      <div className="grid grid-cols-1 gap-6">
        {[
          { title: 'The Future of Spatial Computing', date: 'May 12, 2026', read: '5 min read' },
          { title: 'Optimizing Framer Motion for Desktop Web', date: 'April 28, 2026', read: '8 min read' },
          { title: 'Designing Glassmorphic Interfaces', date: 'April 15, 2026', read: '12 min read' }
        ].map((post, i) => (
          <div key={i} className={`p-6 rounded-2xl border transition-all hover:scale-[1.01] cursor-pointer ${
            resolvedTheme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5 shadow-sm'
          }`}>
            <div className="text-xs opacity-50 mb-2">{post.date} • {post.read}</div>
            <h3 className="text-lg font-bold">{post.title}</h3>
            <div className="mt-4 text-blue-500 text-sm font-medium">Read Article →</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogApp;
