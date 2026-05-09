'use client';

import React from 'react';
import { useOS } from '@/contexts/OSContext';
import { useBlog } from '@/hooks/useData';
import { format } from 'date-fns';

const BlogApp: React.FC = () => {
  const { resolvedTheme } = useOS();
  const { blogPosts, isLoading, error } = useBlog();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-500 p-4 text-center">
        {error}
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'MMMM d, yyyy');
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className={`h-full p-8 overflow-y-auto custom-scrollbar transition-colors duration-500 ${
      resolvedTheme === 'dark' ? 'bg-zinc-900/50 text-white' : 'bg-white/50 text-zinc-900'
    }`}>
      <h2 className="text-2xl font-bold mb-10 flex items-center gap-4">
        Latest Insights
        <span className="h-px flex-1 bg-current opacity-10"></span>
      </h2>
      <div className="grid grid-cols-1 gap-8 max-w-4xl">
        {blogPosts.map((post) => (
          <div 
            key={post._id} 
            className={`group p-8 rounded-3xl border transition-all hover:translate-x-2 cursor-pointer ${
              resolvedTheme === 'dark' 
                ? 'bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-blue-500/30' 
                : 'bg-black/5 border-black/5 shadow-sm hover:bg-white hover:shadow-xl hover:border-blue-500/20'
            }`}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {(post.tags || []).map(tag => (
                <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
              <span className="text-xs opacity-40 ml-auto">{formatDate(post.createdAt)}</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-500 transition-colors line-clamp-2">
              {post.title}
            </h3>
            
            <p className={`text-sm leading-relaxed mb-6 line-clamp-3 opacity-70 ${
              resolvedTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              {post.excerpt}
            </p>

            <div className="flex items-center gap-2 text-blue-500 text-sm font-bold tracking-tight">
              Read Insight 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        ))}
      </div>
      {blogPosts.length === 0 && (
        <div className="h-full flex items-center justify-center opacity-50">
          The simulation logs are currently empty. Check back later for fresh transmissions.
        </div>
      )}
    </div>
  );
};

export default BlogApp;
