'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { ISkill } from '@/lib/models/Skill';
import { useTheme } from '@/contexts/ThemeContext';

const SkillSphere = dynamic(() => import('@/components/3d/SkillSphere'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] flex items-center justify-center" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Loading...</div>,
});

interface SkillsProps {
  skills: ISkill[];
}

export default function Skills({ skills }: SkillsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { colors } = useTheme();

  const skillsByCategory = {
    frontend: skills.filter((s) => s.category === 'frontend'),
    backend: skills.filter((s) => s.category === 'backend'),
    tools: skills.filter((s) => s.category === 'tools'),
    other: skills.filter((s) => s.category === 'other'),
  };

  const skillNames = skills.map((s) => s.name);

  // Calculate stats
  const totalSkills = skills.length;
  const avgProficiency = skills.length > 0 
    ? Math.round(skills.reduce((sum, s) => sum + s.proficiency, 0) / skills.length)
    : 0;

  return (
    <section 
      id="skills" 
      className="py-24 px-6 sm:px-8 lg:px-12"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: colors.textPrimary }}
          >
            Skills
          </h2>
          <div 
            className="w-24 h-1 mx-auto mb-8 rounded-full"
            style={{ 
              background: `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`
            }}
          />
          
          {/* Stats Cards */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="px-6 py-4 rounded-xl backdrop-blur-lg border"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
              }}
            >
              <div className="text-3xl font-bold mb-1" style={{ color: colors.gradientFrom }}>
                {totalSkills}
              </div>
              <div className="text-sm" style={{ color: colors.textSecondary }}>
                Total Skills
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="px-6 py-4 rounded-xl backdrop-blur-lg border"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
              }}
            >
              <div className="text-3xl font-bold mb-1" style={{ color: colors.gradientTo }}>
                {avgProficiency}%
              </div>
              <div className="text-sm" style={{ color: colors.textSecondary }}>
                Avg Proficiency
              </div>
            </motion.div>
          </div>
        </motion.div>

        {skills.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center py-12 min-h-[400px] flex items-center justify-center"
            style={{ color: colors.textSecondary }}
          >
            <div>
              <div className="text-6xl mb-4">🛠️</div>
              <p className="text-lg">No skills to display yet. Check back soon!</p>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-12">
            {/* 3D Component - Centered and Compact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center"
            >
              <div 
                className="w-full max-w-2xl rounded-2xl p-6 backdrop-blur-lg border"
                style={{
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                }}
              >
                <SkillSphere skills={skillNames} gradientFrom={colors.gradientFrom} gradientTo={colors.gradientTo} />
              </div>
            </motion.div>

            {/* Category Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => {
                if (categorySkills.length === 0) return null;
                
                const categoryAvg = Math.round(
                  categorySkills.reduce((sum, s) => sum + s.proficiency, 0) / categorySkills.length
                );

                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + categoryIndex * 0.1 }}
                    className="rounded-2xl p-6 backdrop-blur-lg border"
                    style={{
                      backgroundColor: colors.cardBg,
                      borderColor: colors.cardBorder,
                    }}
                  >
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 
                        className="text-2xl font-semibold capitalize"
                        style={{ color: colors.textPrimary }}
                      >
                        {category}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-sm font-medium"
                          style={{ color: colors.textSecondary }}
                        >
                          {categorySkills.length} skills
                        </span>
                        <div 
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`,
                            color: '#fff',
                          }}
                        >
                          {categoryAvg}%
                        </div>
                      </div>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-4">
                      {categorySkills.map((skill, i) => (
                        <motion.div
                          key={skill._id?.toString() || i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.7 + categoryIndex * 0.1 + i * 0.05 }}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span 
                              className="font-medium text-sm"
                              style={{ color: colors.textPrimary }}
                            >
                              {skill.name}
                            </span>
                            <span 
                              className="text-sm font-medium"
                              style={{ color: colors.textSecondary }}
                            >
                              {skill.proficiency}%
                            </span>
                          </div>
                          <div 
                            className="h-2 rounded-full overflow-hidden"
                            style={{ backgroundColor: colors.cardBorder }}
                          >
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                background: `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`,
                              }}
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.proficiency}%` } : {}}
                              transition={{ delay: 0.9 + categoryIndex * 0.1 + i * 0.05, duration: 1 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
