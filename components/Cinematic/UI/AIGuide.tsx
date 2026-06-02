'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperienceStore } from '@/lib/store/experience-store';
import { Sparkles } from 'lucide-react';

export const AIGuide: React.FC = () => {
  const { guideMessage, setGuideMessage, isLoaded, setIsCommandPaletteOpen } = useExperienceStore();
  const [displayedText, setDisplayedText] = useState('');

  // Typewriter Effect
  useEffect(() => {
    if (!guideMessage) {
      setDisplayedText('');
      return;
    }

    setDisplayedText('');
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText(guideMessage.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex >= guideMessage.length) {
        clearInterval(interval);
      }
    }, 25);

    // Auto-collapse after 4 seconds
    const collapseTimer = setTimeout(() => {
      setGuideMessage(null);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(collapseTimer);
    };
  }, [guideMessage, setGuideMessage]);

  if (!isLoaded) return null;

  return (
    <div className="fixed bottom-6 left-6 z-100 flex flex-col items-start gap-3 pointer-events-none">
      <AnimatePresence>
        {guideMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 5 }}
            className="glass px-4 py-2.5 rounded-xl max-w-[280px] border-border-standard shadow-2xl backdrop-blur-md relative overflow-hidden pointer-events-auto flex items-center gap-2.5"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent-amber shrink-0 animate-pulse shadow-[0_0_8px_rgba(214,168,106,0.6)]" />
            <p className="text-[10px] text-foreground/75 leading-relaxed font-mono font-bold tracking-wide">
              {displayedText}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIGuide;
