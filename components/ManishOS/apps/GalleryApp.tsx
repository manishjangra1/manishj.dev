'use client';

import React from 'react';
import { useOS } from '@/contexts/OSContext';

const GalleryApp: React.FC = () => {
  const { resolvedTheme } = useOS();

  return (
    <div className={`h-full p-6 overflow-y-auto custom-scrollbar transition-colors duration-500 ${
      resolvedTheme === 'dark' ? 'bg-zinc-900/50 text-white' : 'bg-white/50 text-zinc-900'
    }`}>
      <h2 className="text-xl font-medium mb-6">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div 
            key={i} 
            className={`aspect-square rounded-lg border transition-colors flex items-center justify-center text-4xl ${
              resolvedTheme === 'dark' 
                ? 'bg-white/5 border-white/10 hover:border-white/30' 
                : 'bg-black/5 border-black/5 hover:border-black/20'
            }`}
          >
            🖼️
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryApp;
