'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { IExperience } from '@/lib/models/Experience';
import { format } from 'date-fns';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

interface ExperienceProps {
  experiences: IExperience[];
}

export default function Experience({ experiences }: ExperienceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { colors } = useTheme();

  return (
    <section 
      id="experience" 
      className="py-24 px-6 sm:px-8 lg:px-12"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: colors.textPrimary }}
          >
            Experience
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ 
              background: `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`
            }}
          />
        </motion.div>

        {experiences.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center py-12 min-h-[300px] flex items-center justify-center"
            style={{ color: colors.textSecondary }}
          >
            <div>
              <div className="text-6xl mb-4">💼</div>
              <p className="text-lg">No experience entries yet. Check back soon!</p>
            </div>
          </motion.div>
        ) : (
          <div className="relative pl-12 md:pl-0">
            <motion.div 
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 rounded-full transform md:-translate-x-1/2"
              style={{
                background: `linear-gradient(to bottom, ${colors.gradientFrom}, ${colors.gradientTo})`,
                transformOrigin: 'top',
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            
            <div className="space-y-12">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp._id?.toString() || i}
                  initial={{ opacity: 0, x: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                  transition={{ delay: i * 0.2 + 0.3, duration: 0.6 }}
                  className={`relative flex items-center ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                    <div 
                      className="backdrop-blur-lg rounded-2xl p-6 border"
                      style={{
                        backgroundColor: colors.cardBg,
                        borderColor: colors.cardBorder,
                      }}
                    >
                      <div className={`flex items-center gap-4 mb-4 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                        {exp.logo && (
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden border" style={{ borderColor: colors.cardBorder }}>
                            <Image
                              src={exp.logo}
                              alt={exp.company}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className={i % 2 === 0 ? 'md:text-right' : ''}>
                          <h3 
                            className="text-xl font-bold"
                            style={{ color: colors.textPrimary }}
                          >
                            {exp.role}
                          </h3>
                          <p style={{ color: colors.textSecondary }}>{exp.company}</p>
                        </div>
                      </div>
                      <p 
                        className="text-sm mb-4"
                        style={{ color: colors.textSecondary }}
                      >
                        {format(new Date(exp.startDate), 'MMM yyyy')} -{' '}
                        {exp.current
                          ? 'Present'
                          : exp.endDate
                          ? format(new Date(exp.endDate), 'MMM yyyy')
                          : 'Present'}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                      <ul className="space-y-2">
                        {exp.description?.map((desc, j) => (
                          <li 
                            key={j} 
                            className="text-sm flex items-start gap-2"
                            style={{ color: colors.textSecondary }}
                          >
                            <span className="mt-1" style={{ color: colors.gradientFrom }}>•</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <motion.div 
                    className="absolute -left-4 md:left-1/2 w-4 h-4 rounded-full border-4 transform -translate-x-1/2 z-10"
                    style={{
                      backgroundColor: colors.gradientFrom,
                      borderColor: colors.background,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: i * 0.2 + 0.5, duration: 0.4, type: 'spring', stiffness: 200 }}
                  />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

