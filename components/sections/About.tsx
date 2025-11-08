'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface AboutProps {
  aboutText?: string;
  aboutText2?: string;
  aboutTechStack?: string[];
  aboutIcon?: string;
}

export default function About({ 
  aboutText = 'Passionate software developer with expertise in modern web technologies.',
  aboutText2,
  aboutTechStack = ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Three.js'],
  aboutIcon = '👨‍💻'
}: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { colors } = useTheme();

  return (
    <section 
      id="about" 
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
            About Me
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ 
              background: `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`
            }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div 
              className="aspect-square rounded-2xl p-8 backdrop-blur-lg border"
              style={{
                background: `linear-gradient(to bottom right, ${colors.gradientFrom}20, ${colors.gradientTo}20)`,
                borderColor: colors.cardBorder,
              }}
            >
              <div 
                className="w-full h-full rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(to bottom right, ${colors.gradientFrom}10, ${colors.gradientTo}10)`,
                }}
              >
                <div className="text-6xl">{aboutIcon}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <p 
              className="text-lg leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              {aboutText}
            </p>
            {aboutText2 && (
              <p 
                className="text-lg leading-relaxed"
                style={{ color: colors.textSecondary }}
              >
                {aboutText2}
              </p>
            )}
            {aboutTechStack && aboutTechStack.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-4">
                {aboutTechStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="px-4 py-2 backdrop-blur-lg rounded-xl border text-sm font-medium"
                  style={{
                    backgroundColor: colors.cardBg,
                    borderColor: colors.cardBorder,
                    color: colors.textPrimary,
                  }}
                >
                  {tech}
                </motion.span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

