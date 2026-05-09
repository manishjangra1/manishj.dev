'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useOS } from '@/contexts/OSContext';
import { useProjects } from '@/hooks/useData';

const ProjectsApp: React.FC = () => {
  const { resolvedTheme } = useOS();
  const { projects, isLoading, error } = useProjects();

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

  return (
    <div className={`h-full p-6 overflow-y-auto custom-scrollbar transition-colors duration-500 ${
      resolvedTheme === 'dark' ? 'bg-zinc-900/50 text-white' : 'bg-white/50 text-zinc-900'
    }`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project._id}
            whileHover={{ y: -10 }}
            className={`aspect-video rounded-xl border overflow-hidden group relative transition-all ${
              resolvedTheme === 'dark' 
                ? 'bg-white/5 border-white/10' 
                : 'bg-black/5 border-black/5 shadow-sm'
            }`}
          >
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
              />
            ) : (
              <div className={`absolute inset-0 flex items-center justify-center text-4xl opacity-20 ${
                resolvedTheme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'
              }`}>
                {project.title.charAt(0)}
              </div>
            )}
            <div className={`absolute inset-0 bg-gradient-to-t ${
              resolvedTheme === 'dark' ? 'from-black/90 via-black/40 to-transparent' : 'from-black/60 via-black/20 to-transparent'
            }`} />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-lg font-medium text-white">{project.title}</h3>
              <p className="text-xs text-gray-300 line-clamp-1">{project.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {(project.tags || []).slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {(project.link || project.github) && (
              <a 
                href={project.link || project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <span className="text-white text-xs">→</span>
              </a>
            )}
          </motion.div>
        ))}
      </div>
      {projects.length === 0 && (
        <div className="h-full flex items-center justify-center opacity-50">
          No projects found in the simulation database.
        </div>
      )}
    </div>
  );
};

export default ProjectsApp;
