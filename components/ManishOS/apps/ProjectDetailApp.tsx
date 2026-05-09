'use client';

import React, { memo } from 'react';
import { useOS } from '@/contexts/OSContext';
import { useProjects } from '@/hooks/useData';
import { Github, Globe, ArrowLeft, Calendar, Tag, Briefcase, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Memoized Markdown component to prevent re-parsing on every re-render
const MemoizedMarkdown = memo(({ content, resolvedTheme }: { content: string, resolvedTheme: string }) => (
  <ReactMarkdown 
    components={{
      h1: ({node, ...props}) => <h1 className="text-2xl md:text-3xl font-bold mt-8 md:mt-10 mb-4 md:mb-6" {...props} />,
      h2: ({node, ...props}) => <h2 className="text-xl md:text-2xl font-bold mt-8 md:mt-10 mb-4 md:mb-5 border-b border-current/10 pb-2 md:pb-3" {...props} />,
      h3: ({node, ...props}) => <h3 className="text-lg md:text-xl font-bold mt-6 md:mt-8 mb-3 md:mb-4" {...props} />,
      p: ({node, ...props}) => <div className="mb-4 md:mb-6 leading-relaxed opacity-90 text-sm md:text-base" {...props} />,
      ul: ({node, ...props}) => <ul className="list-disc pl-5 md:pl-6 mb-4 md:mb-6 space-y-2 md:space-y-3 opacity-90 text-sm md:text-base" {...props} />,
      li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
      code: ({node, inline, ...props}: any) => 
        inline ? (
          <code className="bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded text-xs md:text-sm font-mono" {...props} />
        ) : (
          <pre className="bg-black/40 border border-white/10 p-4 md:p-6 rounded-xl md:rounded-2xl overflow-x-auto my-6 md:my-8 text-[11px] md:text-sm font-mono shadow-inner w-full max-w-full">
            <code {...props} className="block w-full" />
          </pre>
        ),
    }}
  >
    {content}
  </ReactMarkdown>
));

MemoizedMarkdown.displayName = 'MemoizedMarkdown';

const ProjectDetailApp: React.FC = () => {
  const { resolvedTheme, selectedProjectId, closeApp, isMobile } = useOS();
  const { projects, isLoading } = useProjects();

  const project = projects.find(p => p._id === selectedProjectId);

  if (isLoading && !project) {
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

  return (
    <div className={`h-full overflow-y-auto custom-scrollbar transition-colors duration-500 ${
      resolvedTheme === 'dark' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'
    }`}>
      {/* Visual Header / Banner */}
      {project.image && (
        <div className={`w-full relative overflow-hidden ${
          isMobile ? 'h-[200px]' : 'h-[450px]'
        }`}>
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${
            resolvedTheme === 'dark' 
              ? 'from-zinc-900 to-transparent' 
              : 'from-white to-transparent'
          }`} />
        </div>
      )}
      
      {/* Content Container */}
      <div className={`max-w-6xl mx-auto py-8 md:py-12 ${
        isMobile ? 'px-5 space-y-8' : 'px-12 space-y-12'
      }`}>
        {/* Project Header Info */}
        <section className="space-y-4 md:space-y-6">
          <div className="flex flex-wrap gap-2 md:gap-3">
            {project.isCurrentlyWorking && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] md:text-[10px] font-bold uppercase tracking-wider">
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Project
              </span>
            )}
            {project.featured && (
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[9px] md:text-[10px] font-bold uppercase tracking-wider">
                Featured
              </span>
            )}
          </div>
          
          <div className="space-y-2 md:space-y-4">
            <h1 className={`font-extrabold tracking-tighter ${
              isMobile ? 'text-4xl leading-tight' : 'text-7xl'
            }`}>
              {project.title}
            </h1>
            <p className={`font-medium leading-relaxed max-w-4xl opacity-90 ${
              isMobile ? 'text-lg' : 'text-2xl'
            } ${
              resolvedTheme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
            }`}>
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl bg-blue-500 text-white text-xs md:text-sm font-bold tracking-tight hover:bg-blue-600 transition-all hover:scale-105 shadow-xl shadow-blue-500/20 flex items-center gap-2 md:gap-3 group"
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
                className={`px-5 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl border text-xs md:text-sm font-bold transition-all flex items-center gap-2 md:gap-3 group ${
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
        </section>

        {/* Divider */}
        <div className="h-px w-full bg-current opacity-10" />

        {/* Details Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 ${
          isMobile ? 'gap-10' : 'gap-16'
        }`}>
          {/* Main Documentation */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <div className="prose prose-lg max-w-none w-full overflow-hidden">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 md:mb-8 opacity-40">
                <Info className="w-4 h-4" />
                Technical Documentation
              </div>
              
              <div className={`markdown-content w-full ${
                resolvedTheme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
              }`}>
                {project.content ? (
                  <MemoizedMarkdown content={project.content} resolvedTheme={resolvedTheme} />
                ) : (
                  <p className="opacity-50 italic text-sm">No additional documentation available for this project.</p>
                )}
              </div>
            </div>
          </div>

          {/* Metadata Sidebar */}
          <div className="space-y-8 md:space-y-12">
            {/* Tech Stack */}
            <section className="space-y-4 md:space-y-5">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-40">
                <Briefcase className="w-4 h-4" />
                Stack Architecture
              </div>
              <div className="flex flex-wrap gap-2">
                {(project.technologies || []).map((tech: string) => (
                  <div 
                    key={tech}
                    className={`px-3 py-1.5 md:py-2 rounded-lg md:rounded-xl border text-[10px] md:text-xs font-semibold ${
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

            {/* Project Stats */}
            <section className="space-y-4 md:space-y-6 pt-6 md:pt-8 border-t border-current/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-bold opacity-40 uppercase tracking-widest">
                  <Calendar className="w-4 h-4" />
                  Timeline
                </div>
                <div className="text-xs md:text-sm font-bold">
                  {project.updatedAt ? new Date(project.updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'In Progress'}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-bold opacity-40 uppercase tracking-widest">
                  <Tag className="w-4 h-4" />
                  Classification
                </div>
                <div className="text-[10px] md:text-sm font-bold px-2 md:px-3 py-1 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  Full Stack
                </div>
              </div>
            </section>

            {/* Action Bar */}
            <div className="pt-6 md:pt-10">
              <button 
                onClick={() => closeApp('projectDetail')}
                className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl border font-bold uppercase tracking-widest text-[9px] md:text-[10px] flex items-center justify-center gap-3 transition-all group shadow-sm ${
                  resolvedTheme === 'dark' 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' 
                    : 'bg-white border-black/5 hover:shadow-xl text-zinc-900'
                }`}
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Return to Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProjectDetailApp);
