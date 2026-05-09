'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useOS } from '@/contexts/OSContext';
import { useSkills } from '@/hooks/useData';

const SkillsApp: React.FC = () => {
  const { resolvedTheme } = useOS();
  const { groupedSkills, isLoading, error } = useSkills();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

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

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`h-full p-8 overflow-y-auto custom-scrollbar transition-colors duration-500 ${
        resolvedTheme === 'dark' ? 'bg-zinc-900/50 text-white' : 'bg-white/50 text-zinc-900'
      }`}
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-8 flex items-center gap-3">
        Technical Skills
        <span className="h-px flex-1 bg-current opacity-10"></span>
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {Object.entries(groupedSkills).map(([category, skills]) => (
          <motion.div key={category} variants={itemVariants} className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-40 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              {category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map(skill => (
                <div 
                  key={skill._id} 
                  className={`group px-4 py-2 rounded-xl border text-sm transition-all hover:scale-105 ${
                    resolvedTheme === 'dark' 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-500/50' 
                      : 'bg-black/5 border-black/5 hover:bg-white hover:shadow-lg hover:border-blue-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {skill.icon && <span className="opacity-70 group-hover:opacity-100 transition-opacity text-base">{skill.icon}</span>}
                    <span className="font-medium">{skill.name}</span>
                  </div>
                  {skill.proficiency > 0 && (
                    <div className="mt-2 h-1 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-1000" 
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      {Object.keys(groupedSkills).length === 0 && (
        <div className="h-full flex items-center justify-center opacity-50">
          No skills registered in the simulation core.
        </div>
      )}
    </motion.div>
  );
};

export default SkillsApp;
