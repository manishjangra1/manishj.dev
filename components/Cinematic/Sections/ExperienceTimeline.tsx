'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const { experience } = useData();

  if (!experience || experience.length === 0) return null;

  return (
    <div className="w-full relative py-6">
      {/* Central Line for desktop, Left line for mobile */}
      <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-foreground/10 via-foreground/5 to-transparent -translate-x-1/2" />

      <div className="space-y-12">
        {experience.map((exp, index) => {
          // Alternate left and right cards on desktop
          const isLeft = index % 2 === 0;
          
          return (
            <div 
              key={exp._id} 
              className={`relative flex flex-col lg:flex-row items-start lg:items-center w-full ${
                isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Timeline Center Dot Node */}
              <div className="absolute left-4 lg:left-1/2 w-4 h-4 rounded-full bg-background border border-accent-amber -translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_10px_rgba(214,168,106,0.3)]">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
              </div>

              {/* Bento Card Element Wrapper */}
              <div className={`w-full lg:w-[calc(50%-2rem)] pl-10 lg:pl-0 ${
                isLeft ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:text-left'
              }`}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bento-card group relative"
                >
                 <div className="relative z-10 space-y-4">
                  {/* Meta tag */}
                  <div className={`flex items-center gap-2 text-[9px] font-mono tracking-widest text-accent-amber font-bold ${
                    isLeft ? 'lg:justify-end' : 'lg:justify-start'
                  }`}>
                    <Calendar size={10} />
                    <span>
                      {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()} — {exp.isCurrent ? 'PRESENT' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase() : 'PRESENT'}
                    </span>
                  </div>

                  {/* Header Title */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-foreground uppercase tracking-tight group-hover:text-accent-amber transition-colors">
                      {exp.role}
                    </h3>
                    <div className={`flex flex-wrap items-center gap-2 text-sm text-foreground/50 font-medium ${
                      isLeft ? 'lg:justify-end' : 'lg:justify-start'
                    }`}>
                      <span className="text-foreground/75 font-semibold">{exp.company}</span>
                      {exp.location && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-foreground/15 hidden lg:block" />
                          <div className="flex items-center gap-1 text-foreground/30 font-mono text-[9px] uppercase">
                            <MapPin size={9} />
                            <span>{exp.location}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Achievements bullet list */}
                  <ul className={`space-y-2.5 text-xs text-foreground/60 leading-relaxed font-light flex flex-col ${
                    isLeft ? 'lg:items-end' : 'lg:items-start'
                  }`}>
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} className={`flex gap-3 text-left ${
                        isLeft ? 'lg:flex-row-reverse lg:text-right' : 'lg:text-left'
                      }`}>
                        <span className="text-accent-amber/35 mt-1 shrink-0 font-mono">/</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Badges footer */}
                  <div className={`flex flex-wrap gap-1.5 pt-4 border-t border-border-standard ${
                    isLeft ? 'lg:justify-end' : 'lg:justify-start'
                  }`}>
                    {exp.technologies?.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2 py-0.5 rounded bg-surface-secondary border border-border-standard text-[8px] uppercase tracking-wider text-foreground/50 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  </div>
                </motion.div>
              </div>

              {/* Blank side spacer card matching vertical height */}
              <div className="hidden lg:block w-[calc(50%-2rem)]" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
