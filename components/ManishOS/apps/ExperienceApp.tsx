'use client';

import React from 'react';
import { useOS } from '@/contexts/OSContext';
import { useExperience } from '@/hooks/useData';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`h-full p-8 overflow-y-auto custom-scrollbar transition-colors duration-500 ${
        resolvedTheme === 'dark' ? 'bg-zinc-900/50 text-white' : 'bg-white/50 text-zinc-900'
      }`}
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-10 flex items-center gap-4">
        Professional Journey
        <span className="h-px flex-1 bg-current opacity-10"></span>
      </motion.h2>
      
      <div className="space-y-16 max-w-4xl">
        {experience.map((job) => (
          <motion.div 
            key={job._id} 
            variants={itemVariants}
            className="relative pl-12 border-l-2 border-blue-500/20 group pb-4"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-blue-500 bg-zinc-900 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
              <div className="flex items-start gap-4">
                {/* Company Logo */}
                <div className={`w-14 h-14 rounded-2xl border flex-shrink-0 overflow-hidden flex items-center justify-center bg-white ${
                  resolvedTheme === 'dark' ? 'border-white/10' : 'border-black/5'
                }`}>
                  {job.logo ? (
                    <img src={job.logo} alt={job.company} className="w-full h-full object-contain p-2" />
                  ) : (
                    <span className="text-xl font-bold text-zinc-400">{job.company.charAt(0)}</span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold group-hover:text-blue-500 transition-colors tracking-tight">
                    {job.role}
                  </h3>
                  <div className={`text-sm font-semibold flex flex-wrap items-center gap-x-2 ${
                    resolvedTheme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                  }`}>
                    <span className="text-blue-400/80">{job.company}</span>
                    {job.location && (
                      <>
                        <span className="opacity-30">•</span>
                        <span className="opacity-80">{job.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 whitespace-nowrap self-start md:mt-1 shadow-sm">
                {formatDate(job.startDate)} — {job.isCurrent || job.current ? 'Present' : (job.endDate ? formatDate(job.endDate) : 'N/A')}
              </div>
            </div>

            {/* Bullet Points Description */}
            <ul className={`space-y-3 mb-6 ml-1`}>
              {(Array.isArray(job.description) ? job.description : [job.description]).map((bullet, idx) => (
                <li 
                  key={idx} 
                  className={`text-sm leading-relaxed flex gap-3 opacity-80 ${
                    resolvedTheme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
                  }`}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/50 flex-shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {(job.technologies || []).map(tech => (
                <span key={tech} className={`text-[10px] px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                  resolvedTheme === 'dark' 
                    ? 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20' 
                    : 'bg-black/5 border-black/5 text-zinc-600 hover:border-black/10'
                }`}>
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {experience.length === 0 && (
        <div className="h-full flex items-center justify-center opacity-50">
          No records found in the simulation timeline.
        </div>
      )}
    </motion.div>
  );
};

export default ExperienceApp;
