'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { Code, Database, Smartphone, Cloud, Cpu, Server } from 'lucide-react';

const categoryIcons: Record<string, any> = {
  'frontend': Code,
  'backend': Database,
  'mobile': Smartphone,
  'cloud': Cloud,
  'ai': Cpu,
  'devops': Server,
};

export const SkillsGrid: React.FC = () => {
  const { skills } = useData();

  if (!skills || skills.length === 0) return null;

  // Group skills by category
  const categories = Array.from(new Set(skills.map(s => s.category)));

  const getIconForCategory = (category: string) => {
    const key = category.toLowerCase();
    for (const [iconKey, value] of Object.entries(categoryIcons)) {
      if (key.includes(iconKey)) return value;
    }
    return Code; // Default fallback icon
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category, catIndex) => {
        const IconComponent = getIconForCategory(category);
        const categorySkills = skills.filter(s => s.category === category);
        
        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: catIndex * 0.05 }}
            className="bento-card group flex flex-col justify-between min-h-[220px]"
          >
            <div className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg glass border-border-standard flex items-center justify-center text-accent-amber">
                  <IconComponent size={14} />
                </div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-accent-amber font-mono font-bold">
                  {category}
                </h3>
              </div>

              {/* Skills Tags inside Bento Card */}
              <div className="grid grid-cols-2 gap-2">
                {categorySkills.map((skill) => (
                  <div
                    key={skill._id}
                    className="flex items-center justify-between p-2 rounded-lg bg-surface-secondary border border-border-standard group/skill hover:border-foreground/10 transition-colors duration-300"
                  >
                    <span className="text-xs font-light text-foreground/60 group-hover/skill:text-foreground transition-colors truncate">
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-amber/20 group-hover/skill:bg-accent-amber transition-colors" />
                      <span className="text-[9px] font-mono text-text-muted/40 group-hover/skill:text-accent-amber/70 transition-colors">
                        {skill.proficiency}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SkillsGrid;
