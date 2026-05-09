'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useOS } from '@/contexts/OSContext';
import { useProjects } from '@/hooks/useData';
import { Github, Globe, ArrowLeft, Calendar, Tag, Briefcase } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ProjectDetailApp: React.FC = () => {
  const { resolvedTheme, selectedProjectId, closeApp } = useOS();
  const { projects, isLoading } = useProjects();

  const project = projects.find(p => p._id === selectedProjectId);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 opacity-50">
        <p>Project details not found.</p>
        <button 
          onClick={() => closeApp('projectDetail')}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm"
        >
          Close Window
        </button>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`h-full overflow-y-auto custom-scrollbar transition-colors duration-500 ${
        resolvedTheme === 'dark' ? 'bg-zinc-900/50 text-white' : 'bg-white/50 text-zinc-900'
      }`}
    >
      {/* Hero Header Section */}
      <div className="relative w-full min-h-[400px] flex items-end">
        {project.image && (
          <div className="absolute inset-0 z-0">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${
              resolvedTheme === 'dark' 
                ? 'from-zinc-950 via-zinc-950/60 to-zinc-950/20' 
                : 'from-white via-white/60 to-white/20'
            }`} />
          </div>
        )}
        
        <div className="relative z-10 p-8 md:p-12 w-full max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.isCurrentlyWorking && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Project
                </span>
              )}
              {project.featured && (
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter drop-shadow-2xl">
              {project.title}
            </h1>
            
            <p className="text-xl md:text-2xl opacity-80 max-w-2xl font-medium leading-tight">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-2xl bg-blue-500 text-white text-sm font-bold tracking-tight hover:bg-blue-600 transition-all hover:scale-105 shadow-xl shadow-blue-500/20 flex items-center gap-3 group"
                >
                  <Globe className="w-4 h-4 transition-transform group-hover:rotate-12" />
                  Live Preview
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-2xl border text-sm font-bold transition-all flex items-center gap-3 group ${
                    resolvedTheme === 'dark' 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
                      : 'bg-white border-black/5 shadow-sm hover:shadow-md hover:border-black/10'
                  }`}
                >
                  <Github className="w-4 h-4 transition-transform group-hover:scale-110" />
                  Source Code
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Detail Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 p-8 md:p-12 max-w-6xl mx-auto">
        {/* Main Content */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
          <div className="prose prose-invert max-w-none">
            <div className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2 ${
              resolvedTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
            }`}>
              <span className="w-8 h-px bg-current opacity-20"></span>
              Documentation
            </div>
            
            <div className={`markdown-content leading-relaxed text-lg ${
              resolvedTheme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
            }`}>
              {project.content ? (
                <ReactMarkdown 
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4 border-b border-white/10 pb-2" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
                    p: ({node, ...props}) => <div className="mb-4 opacity-80" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-2 opacity-80" {...props} />,
                    code: ({node, inline, ...props}: any) => 
                      inline ? (
                        <code className="bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded text-sm" {...props} />
                      ) : (
                        <pre className="bg-black/40 border border-white/10 p-4 rounded-xl overflow-x-auto my-4 text-sm">
                          <code {...props} />
                        </pre>
                      ),
                  }}
                >
                  {project.content}
                </ReactMarkdown>
              ) : (
                <p className="opacity-50 italic">Detailed documentation is being compiled by the simulation core...</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Sidebar Info */}
        <motion.div variants={itemVariants} className="space-y-10">
          {/* Tech Stack */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-40">
              <Briefcase className="w-4 h-4" />
              Technologies
            </div>
            <div className="flex flex-wrap gap-2">
              {(project.technologies || []).map((tech: string) => (
                <div 
                  key={tech}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium ${
                    resolvedTheme === 'dark' 
                      ? 'bg-white/5 border-white/10 text-zinc-300' 
                      : 'bg-black/5 border-black/5 text-zinc-600'
                  }`}
                >
                  {tech}
                </div>
              ))}
            </div>
          </section>

          {/* Metadata */}
          <section className="space-y-6 pt-6 border-t border-current/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold opacity-40 uppercase tracking-widest">
                <Calendar className="w-4 h-4" />
                Updated
              </div>
              <div className="text-sm font-medium">
                {project.updatedAt ? new Date(project.updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold opacity-40 uppercase tracking-widest">
                <Tag className="w-4 h-4" />
                Category
              </div>
              <div className="text-sm font-medium px-2 py-0.5 rounded bg-blue-500/10 text-blue-500">
                Full Stack
              </div>
            </div>
          </section>

          {/* Navigation */}
          <div className="pt-8">
            <button 
              onClick={() => closeApp('projectDetail')}
              className={`w-full py-4 rounded-2xl border font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all group ${
                resolvedTheme === 'dark' 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                  : 'bg-black/5 border-black/5 hover:bg-white hover:shadow-lg'
              }`}
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Return to Catalog
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectDetailApp;
