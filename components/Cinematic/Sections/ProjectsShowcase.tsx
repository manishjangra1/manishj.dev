'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { ExternalLink, Github, ChevronRight, ChevronLeft } from 'lucide-react';

const ProjectsShowcase: React.FC = () => {
  const { projects } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => setCurrentIndex((prev) => (prev + 1) % projects.length), [projects.length]);
  const prev = useCallback(() => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length), [projects.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  if (!projects || projects.length === 0) return null;

  const currentProject = projects[currentIndex];

  return (
    <div className="absolute inset-0 flex items-center justify-center p-24 pointer-events-none">
      <div className="w-full max-w-6xl flex justify-between items-center pointer-events-auto">
        
        {/* Navigation Left */}
        <button 
          onClick={prev}
          className="glass w-12 h-12 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Project Content */}
        <div className="flex-1 px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject._id}
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[10px] uppercase tracking-[0.4em] text-accent-blue font-mono mb-2"
                >
                  Featured Project {currentIndex + 1}/{projects.length}
                </motion.span>
                <h2 className="text-6xl font-extrabold tracking-tighter text-white">
                  {currentProject.title.toUpperCase()}
                </h2>
              </div>

              <p className="text-white/60 text-lg max-w-xl leading-relaxed">
                {currentProject.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {currentProject.technologies?.map((tech: string) => (
                  <span key={tech} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-widest text-white/40">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-6 mt-4">
                {currentProject.liveUrl && (
                  <a href={currentProject.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-accent-blue transition-colors group">
                    <span className="text-sm font-medium tracking-tight">Live Experience</span>
                    <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                )}
                {currentProject.githubUrl && (
                  <a href={currentProject.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                    <span className="text-sm font-medium tracking-tight">Source Code</span>
                    <Github size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Right */}
        <button 
          onClick={next}
          className="glass w-12 h-12 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Background Image / Preview (Cinematic) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProject._id + '-bg'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-[-1] overflow-hidden"
        >
          {currentProject.image && (
            <img 
              src={currentProject.image} 
              alt="" 
              className="w-full h-full object-cover scale-110 blur-2xl opacity-50" 
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProjectsShowcase;
