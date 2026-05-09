'use client';

import React from 'react';
import { useOS } from '@/contexts/OSContext';
import { useExperience } from '@/hooks/useData';
import { format } from 'date-fns';

const ExperienceApp: React.FC = () => {
  const { resolvedTheme } = useOS();
  const { experience, isLoading, error } = useExperience();

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

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'MMM yyyy');
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className={`h-full p-8 overflow-y-auto custom-scrollbar transition-colors duration-500 ${
      resolvedTheme === 'dark' ? 'bg-zinc-900/50 text-white' : 'bg-white/50 text-zinc-900'
    }`}>
      <h2 className="text-2xl font-bold mb-10 flex items-center gap-4">
        Professional Journey
        <span className="h-px flex-1 bg-current opacity-10"></span>
      </h2>
      <div className="space-y-16 max-w-3xl">
        {experience.map((job) => (
          <div key={job._id} className="relative pl-10 border-l-2 border-blue-500/20 group">
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-blue-500 bg-zinc-900 group-hover:scale-125 transition-transform" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-xl font-bold group-hover:text-blue-500 transition-colors">{job.role}</h3>
                <div className={`text-sm font-medium ${resolvedTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {job.company} {job.location && `• ${job.location}`}
                </div>
              </div>
              <div className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 whitespace-nowrap self-start">
                {formatDate(job.startDate)} — {job.isCurrent ? 'Present' : (job.endDate ? formatDate(job.endDate) : '')}
              </div>
            </div>

            <p className={`text-sm leading-relaxed mb-4 opacity-80 ${resolvedTheme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
              {job.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {(job.technologies || []).map(tech => (
                <span key={tech} className={`text-[10px] px-2 py-0.5 rounded bg-zinc-500/5 border ${
                  resolvedTheme === 'dark' ? 'border-white/5 text-zinc-400' : 'border-black/5 text-zinc-600'
                }`}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {experience.length === 0 && (
        <div className="h-full flex items-center justify-center opacity-50">
          No records found in the simulation timeline.
        </div>
      )}
    </div>
  );
};

export default ExperienceApp;
