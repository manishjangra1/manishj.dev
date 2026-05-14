'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';

const SkillsGrid: React.FC = () => {
  const { skills } = useData();

  // Group skills by category
  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <div className="absolute inset-0 flex items-center justify-center px-12 md:px-32 pointer-events-none">
      <div className="w-full max-w-6xl h-full max-h-[85vh] pointer-events-auto overflow-y-auto overflow-x-visible scrollbar-hide pb-40 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-2">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: catIndex * 0.1 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-accent-amber/40" />
                <h3 className="text-[10px] uppercase tracking-[0.4em] text-accent-amber font-mono">
                  {category}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {skills
                  .filter(s => s.category === category)
                  .map((skill) => (
                    <motion.div
                      key={skill._id}
                      whileHover={{ y: -2, scale: 1.02, borderColor: 'rgba(214, 168, 106, 0.2)' }}
                      className="glass px-4 py-3.5 rounded-lg flex items-center justify-between group transition-all duration-500 w-full"
                    >
                      <span className="text-[13px] font-medium text-foreground/60 group-hover:text-foreground transition-colors truncate tracking-tight">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-foreground/10 group-hover:bg-accent-amber transition-colors" />
                        <span className="text-[9px] font-mono text-foreground/20 group-hover:text-accent-amber/60 transition-colors">
                          {skill.proficiency}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsGrid;
