'use client';

import React from 'react';

const GalleryApp: React.FC = () => {
  return (
    <div className="h-full bg-zinc-900/50 p-6 overflow-y-auto custom-scrollbar">
      <h2 className="text-xl font-medium mb-6">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div 
            key={i} 
            className="aspect-square rounded-lg bg-white/5 border border-white/10 hover:border-white/30 transition-colors flex items-center justify-center text-4xl"
          >
            🖼️
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryApp;
