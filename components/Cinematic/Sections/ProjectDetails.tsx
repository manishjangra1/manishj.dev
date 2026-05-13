'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useExperienceStore } from '@/lib/store/experience-store';
import { X, Sparkles, Globe, Terminal } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ProjectDetails: React.FC = () => {
  const { isProjectDetailsOpen, setProjectDetailsOpen, selectedProject } = useExperienceStore();

  if (!selectedProject) return null;

  return (
    <AnimatePresence>
      {isProjectDetailsOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-12 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setProjectDetailsOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-6xl h-full max-h-[90vh] glass rounded-[2.5rem] overflow-hidden flex flex-col border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]"
          >
            {/* Header / Banner */}
            <div className="relative h-[30vh] md:h-[40vh] w-full shrink-0 overflow-hidden">
              {selectedProject.image && (
                <Image 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  fill
                  className="object-cover" 
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={() => setProjectDetailsOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-all hover:scale-110 z-10"
              >
                <X size={24} />
              </button>

              {/* Title & Stats Overlay */}
              <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Sparkles className="text-accent-blue" size={16} />
                    <span className="text-[10px] uppercase tracking-[0.4em] text-accent-blue font-mono">
                      Project Showcase
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-7xl font-extrabold tracking-tighter text-white">
                    {selectedProject.title.toUpperCase()}
                  </h2>
                </div>

                <div className="flex gap-4">
                  {selectedProject.liveUrl && (
                    <a 
                      href={selectedProject.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="glass px-6 py-3 rounded-2xl flex items-center gap-3 text-white hover:bg-white/10 transition-all group"
                    >
                      <Globe size={18} className="text-accent-blue" />
                      <span className="text-sm font-semibold tracking-tight uppercase">Launch Live</span>
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="glass px-6 py-3 rounded-2xl flex items-center gap-3 text-white hover:bg-white/10 transition-all group"
                    >
                      <Terminal size={18} className="text-white/60" />
                      <span className="text-sm font-semibold tracking-tight uppercase">Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide px-8 md:px-12 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                
                {/* Main Content (Markdown) */}
                <div className="lg:col-span-2 space-y-12">
                  <div className="prose prose-invert prose-lg max-w-none prose-p:text-white/60 prose-headings:text-white prose-strong:text-accent-blue prose-li:text-white/60">
                    <ReactMarkdown>
                      {selectedProject.content || selectedProject.description}
                    </ReactMarkdown>
                  </div>
                  
                  {/* Additional section if content is short */}
                  {!selectedProject.content && (
                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
                      <p className="text-white/40 italic text-sm">
                        This project represents a synthesis of design and technology, pushing the boundaries of what is possible within a cinematic web environment.
                      </p>
                    </div>
                  )}
                </div>

                {/* Sidebar / Specs */}
                <div className="space-y-12">
                  {/* Technologies */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-[1px] w-8 bg-white/20" />
                      <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono">
                        Tech Stack
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map(tech => (
                        <span key={tech} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-white/60">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Date / Metadata */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-[1px] w-8 bg-white/20" />
                      <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono">
                        Metadata
                      </span>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/20">Status</span>
                        <span className="text-accent-blue/60">{selectedProject.isCurrentlyWorking ? 'Active Development' : 'Production Ready'}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/20">Category</span>
                        <span className="text-white/40">Full Stack Experience</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer / Gradient Bleed */}
            <div className="h-12 bg-gradient-to-t from-[#030303]/40 to-transparent shrink-0 pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetails;
