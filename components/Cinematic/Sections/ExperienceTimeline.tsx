'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';

const ExperienceTimeline: React.FC = () => {
  const { experience } = useData();

  return (
    <div className="absolute inset-0 flex items-center justify-center px-12 md:px-32 pointer-events-none">
      <div className="w-full max-w-6xl h-full max-h-[85vh] pointer-events-auto overflow-y-auto overflow-x-visible scrollbar-hide px-2 pb-40 pt-12">
        <div className="flex flex-col gap-24 relative">
          {/* Vertical Line */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/[0.05] to-transparent ml-[-20px]" />

          {experience.map((exp, index) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.1 }}
              className="relative flex flex-col gap-6"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-24px] top-2.5 w-2 h-2 rounded-full bg-accent-amber shadow-[0_0_10px_rgba(214,168,106,0.4)]" />

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-accent-amber font-mono mb-2">
                    {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()} — {exp.isCurrent ? 'PRESENT' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase() : 'PRESENT'}
                  </span>
                  <h3 className="text-3xl font-bold text-foreground tracking-tight">
                    {exp.role.toUpperCase()}
                  </h3>
                  <span className="text-base text-foreground/40 font-medium">
                    {exp.company}
                  </span>
                </div>
                
                {exp.location && (
                  <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/30 font-mono">
                    {exp.location.toUpperCase()}
                  </span>
                )}
              </div>

              <div className="max-w-3xl">
                <ul className="flex flex-col gap-4">
                  {exp.description.map((point, i) => (
                    <li key={i} className="text-foreground/65 leading-relaxed text-sm flex gap-4 font-light">
                      <span className="text-accent-amber/30 mt-1.5 shrink-0">/</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {exp.technologies?.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-md border border-white/[0.05] bg-white/[0.02] text-[9px] uppercase tracking-widest text-foreground/30">
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
