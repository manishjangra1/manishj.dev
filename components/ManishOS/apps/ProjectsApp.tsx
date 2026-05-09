'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ProjectsApp: React.FC = () => {
  return (
    <div className="h-full bg-zinc-900/50 p-6 overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="aspect-video rounded-xl bg-white/5 border border-white/10 overflow-hidden group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <h3 className="text-lg font-medium text-white">Project {i}</h3>
              <p className="text-xs text-gray-400">Simulation District {i}</p>
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
