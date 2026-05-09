'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useOS } from '@/contexts/OSContext';

const ProjectsApp: React.FC = () => {
  const { resolvedTheme } = useOS();

  return (
    <div className={`h-full p-6 overflow-y-auto custom-scrollbar transition-colors duration-500 ${
      resolvedTheme === 'dark' ? 'bg-zinc-900/50 text-white' : 'bg-white/50 text-zinc-900'
    }`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className={`aspect-video rounded-xl border overflow-hidden group relative transition-all ${
              resolvedTheme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-black/5 border-black/5 shadow-sm'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-t ${
              resolvedTheme === 'dark' ? 'from-black/80 to-transparent' : 'from-black/20 to-transparent'
            }`} />
            <div className="absolute bottom-4 left-4">
              <h3 className={`text-lg font-medium transition-colors ${
                resolvedTheme === 'dark' ? 'text-white' : 'text-zinc-900'
              }`}>Project {i}</h3>
              <p className={`text-xs transition-colors ${
                resolvedTheme === 'dark' ? 'text-gray-400' : 'text-zinc-500'
              }`}>Simulation District {i}</p>
            </div>
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs">→</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsApp;
