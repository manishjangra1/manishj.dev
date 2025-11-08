'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { getResumeDownloadUrl } from '@/lib/utils/resume';

interface ResumeDownloadButtonProps {
  resumeUrl?: string;
}

export default function ResumeDownloadButton({ resumeUrl }: ResumeDownloadButtonProps) {
  const { colors } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  if (!resumeUrl) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.a
        href={getResumeDownloadUrl(resumeUrl)}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 backdrop-blur-lg rounded-full border shadow-xl transition-all flex items-center justify-center"
        style={{
          backgroundColor: colors.cardBg,
          borderColor: colors.cardBorder,
        }}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        aria-label="Download Resume"
      >
        <Download 
          className="w-6 h-6 transition-colors" 
          style={{ color: colors.textPrimary }}
        />
      </motion.a>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap backdrop-blur-lg border pointer-events-none"
            style={{
              backgroundColor: colors.cardBg,
              borderColor: colors.cardBorder,
              color: colors.textPrimary,
            }}
          >
            Download Resume
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

