'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';

const ExperienceTimeline: React.FC = () => {
  const { experience } = useData();

  return (
    <div className="absolute inset-0 flex items-center justify-center p-8 md:p-24 pointer-events-none">
      <div className="w-full max-w-5xl h-full max-h-[85vh] pointer-events-auto overflow-y-auto scrollbar-hide px-8 pb-40 pt-12">
        <div className="flex flex-col gap-24 relative">
          {/* Vertical Line */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent ml-[-20px]" />

          {experience.map((exp, index) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="relative flex flex-col gap-4"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-24px] top-2 w-2 h-2 rounded-full bg-accent-purple shadow-[0_0_10px_#8b5cf6]" />

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-accent-purple font-mono mb-1">
                    {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                  <h3 className="text-4xl font-bold text-white tracking-tight">
                    {exp.role.toUpperCase()}
                  </h3>
                  <span className="text-lg text-white/40 font-medium">
                    {exp.company}
                  </span>
                </div>
                
                {exp.location && (
                  <span className="text-[10px] uppercase tracking-widest text-white/20 font-mono">
                    {exp.location}
                  </span>
                )}
              </div>

              <div className="max-w-3xl">
                <ul className="flex flex-col gap-3">
                  {exp.description.map((point, i) => (
                    <li key={i} className="text-white/60 leading-relaxed text-sm flex gap-3">
                      <span className="text-accent-purple/40 mt-1.5">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {exp.technologies?.map((tech) => (
                  <span key={tech} className="px-2 py-1 rounded border border-white/5 bg-white/[0.02] text-[9px] uppercase tracking-widest text-white/30">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
