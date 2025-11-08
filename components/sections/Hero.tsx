'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ChevronDown, Download } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { getResumeDownloadUrl } from '@/lib/utils/resume';

const Hero3D = dynamic(() => import('@/components/3d/Hero3D'), {
  ssr: false,
  loading: () => null,
});

interface HeroProps {
  heroText?: string;
  siteTitle?: string;
  heroButton1Text?: string;
  heroButton2Text?: string;
  resumeUrl?: string;
}

export default function Hero({ 
  heroText = 'Full Stack Software Developer', 
  siteTitle = 'Portfolio',
  heroButton1Text = 'Learn More',
  heroButton2Text = 'View Projects',
  resumeUrl
}: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { colors } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ 
        background: `linear-gradient(to bottom right, ${colors.background}, ${colors.secondary}20, ${colors.background})`
      }}
    >
      <Hero3D />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      
      <motion.div
        className="relative z-10 text-center px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6"
          style={{ color: colors.textPrimary }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {siteTitle}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-10"
          style={{ color: colors.textSecondary }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {heroText}
        </motion.p>
        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.a
            href="#about"
            className="px-8 py-3.5 text-white rounded-xl font-semibold transition-all border"
            style={{
              background: `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`,
              borderColor: 'transparent',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {heroButton1Text}
          </motion.a>
          <motion.a
            href="#projects"
            className="px-8 py-3.5 backdrop-blur-lg rounded-xl font-semibold border transition-all"
            style={{
              backgroundColor: colors.cardBg,
              borderColor: colors.cardBorder,
              color: colors.textPrimary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.cardBorder;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.cardBg;
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {heroButton2Text}
          </motion.a>
          {resumeUrl && (
            <motion.a
              href={getResumeDownloadUrl(resumeUrl)}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 backdrop-blur-lg rounded-xl font-semibold border transition-all hidden items-center gap-2"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
                color: colors.textPrimary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.cardBorder;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.cardBg;
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              Download Resume
            </motion.a>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.5 }}
      >
        <a 
          href="#about" 
          className="transition-colors"
          style={{ color: colors.textSecondary }}
          onMouseEnter={(e) => e.currentTarget.style.color = colors.textPrimary}
          onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
        >
          <ChevronDown className="w-8 h-8" />
        </a>
      </motion.div>
    </section>
  );
}

