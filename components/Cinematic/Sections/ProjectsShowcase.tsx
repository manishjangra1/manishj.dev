'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { useExperienceStore } from '@/lib/store/experience-store';
import { ExternalLink, Github, ChevronRight, ChevronLeft, Plus } from 'lucide-react';

const ProjectsShowcase: React.FC = () => {
  const { projects } = useData();
  const { setSelectedProject, setProjectDetailsOpen } = useExperienceStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => setCurrentIndex((prev) => (prev + 1) % projects.length), [projects.length]);
  const prev = useCallback(() => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length), [projects.length]);

  const handleViewDetails = () => {
    setSelectedProject(projects[currentIndex]);
    setProjectDetailsOpen(true);
  };

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
    <div className="absolute inset-0 flex items-center justify-center px-12 md:px-32 pointer-events-none">
      <div className="w-full max-w-6xl flex justify-between items-center pointer-events-auto">
        
        {/* Navigation Left */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="glass w-12 h-12 rounded-full flex items-center justify-center text-foreground/40 hover:text-accent-amber transition-all duration-500 hover:scale-105 relative z-[20] pointer-events-auto shrink-0"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Project Content */}
        <div className="flex-1 px-12 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject._id}
              initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[9px] uppercase tracking-[0.5em] text-accent-amber font-mono mb-2"
                >
                  Project Sequence {currentIndex + 1}/{projects.length}
                </motion.span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                  {currentProject.title.toUpperCase()}
                </h2>
              </div>

              <p className="text-foreground/65 text-base md:text-lg max-w-xl leading-relaxed line-clamp-3 font-light">
                {currentProject.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {currentProject.technologies?.map((tech: string) => (
                  <span key={tech} className="px-3 py-1 rounded-md border border-white/[0.05] bg-white/[0.02] text-[9px] uppercase tracking-widest text-foreground/40 font-medium">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-8 mt-8">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleViewDetails}
                  className="glass px-8 py-4 rounded-xl flex items-center gap-4 group relative overflow-hidden"
                >
                  <Plus size={16} className="text-accent-amber group-hover:rotate-90 transition-transform duration-500" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground relative z-10">View Details</span>
                  <div className="absolute inset-0 bg-accent-amber/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent-amber/20" />
                </motion.button>

                <div className="flex gap-8">
                  {currentProject.liveUrl && (
                    <a href={currentProject.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground/50 hover:text-accent-amber transition-all duration-300 group">
                      <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Live</span>
                    </a>
                  )}
                  {currentProject.githubUrl && (
                    <a href={currentProject.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground/50 hover:text-accent-amber transition-all duration-300 group">
                      <Github size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Source</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Right */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="glass w-12 h-12 rounded-full flex items-center justify-center text-foreground/40 hover:text-accent-amber transition-all duration-500 hover:scale-105 relative z-[20] pointer-events-auto shrink-0"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Background Image / Preview (Cinematic) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProject._id + '-bg'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-[-1] overflow-hidden"
        >
          {currentProject.image && (
            <img 
              src={currentProject.image} 
              alt="" 
              className="w-full h-full object-cover scale-105 blur-3xl opacity-40" 
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default ProjectsShowcase;
