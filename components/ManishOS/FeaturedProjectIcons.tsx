'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useOS } from '@/contexts/OSContext';
import { useProjects } from '@/hooks/useData';

const FeaturedProjectIcons: React.FC = () => {
  const { resolvedTheme, openApp, setSelectedProjectId } = useOS();
  const { projects } = useProjects();

  const featuredProjects = projects.filter(p => p.featured);

  if (featuredProjects.length === 0) return null;

  const handleClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    openApp('projectDetail');
  };

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {featuredProjects.map((project, index) => (
        <motion.div
          key={project._id}
          drag
          dragMomentum={false}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onDoubleClick={() => handleClick(project._id)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
          className="absolute flex flex-col items-center gap-2 w-24 cursor-pointer group select-none pointer-events-auto"
          style={{
            top: 100 + index * 120,
            left: 24,
          }}
        >
          {/* Icon - Project Image */}
          <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center border shadow-xl transition-all duration-500 backdrop-blur-xl overflow-hidden ${
            resolvedTheme === 'dark'
              ? 'bg-white/10 border-white/20 group-hover:bg-white/20 group-hover:border-white/30 shadow-blue-500/10'
              : 'bg-white/60 border-black/5 group-hover:bg-white group-hover:shadow-2xl'
          }`}>
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <span className={`text-2xl font-bold ${
                resolvedTheme === 'dark' ? 'text-white/60' : 'text-zinc-400'
              }`}>
                {project.title.charAt(0)}
              </span>
            )}
          </div>

          {/* Label */}
          <span className={`text-[11px] font-bold tracking-wide px-2 py-0.5 rounded-lg transition-all duration-500 text-center leading-tight line-clamp-1 ${
            resolvedTheme === 'dark'
              ? 'text-white/80 bg-black/40 border border-white/5 group-hover:text-white group-hover:bg-black/60'
              : 'text-zinc-800 bg-white/60 shadow-sm border border-black/5 group-hover:bg-white'
          }`}>
            {project.title}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturedProjectIcons;
