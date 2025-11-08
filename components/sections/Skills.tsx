'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { ISkill } from '@/lib/models/Skill';

const SkillSphere = dynamic(() => import('@/components/3d/SkillSphere'), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] flex items-center justify-center text-white/50">Loading...</div>,
});

interface SkillsProps {
  skills: ISkill[];
}

export default function Skills({ skills }: SkillsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillsByCategory = {
    frontend: skills.filter((s) => s.category === 'frontend'),
    backend: skills.filter((s) => s.category === 'backend'),
    tools: skills.filter((s) => s.category === 'tools'),
    other: skills.filter((s) => s.category === 'other'),
  };

  const skillNames = skills.map((s) => s.name);

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto" />
        </motion.div>

        {skills.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center text-white/60 py-12 min-h-[500px] flex items-center justify-center"
          >
            <div>
              <div className="text-6xl mb-4">🛠️</div>
              <p className="text-lg">No skills to display yet. Check back soon!</p>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <SkillSphere skills={skillNames} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => {
                if (categorySkills.length === 0) return null;
                return (
                  <div key={category}>
                    <h3 className="text-2xl font-semibold text-white mb-4 capitalize">{category}</h3>
                    <div className="space-y-4">
                      {categorySkills.map((skill, i) => (
                        <motion.div
                          key={skill._id?.toString() || i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.6 + i * 0.1 }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white font-medium">{skill.name}</span>
                            <span className="text-white/60 text-sm">{skill.proficiency}%</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.proficiency}%` } : {}}
                              transition={{ delay: 0.8 + i * 0.1, duration: 1 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

