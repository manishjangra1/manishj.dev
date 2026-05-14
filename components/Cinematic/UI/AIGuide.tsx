'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperienceStore } from '@/lib/store/experience-store';
import { Sparkles, Terminal } from 'lucide-react';

const AIGuide: React.FC = () => {
  const { guideMessage, setGuideMessage, isLoaded } = useExperienceStore();
  const [displayedText, setDisplayedText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<string | null>(null);

  // Typewriter Effect
  useEffect(() => {
    if (!guideMessage) {
      setDisplayedText('');
      return;
    }

    lastMessageRef.current = guideMessage;
    setDisplayedText('');
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText(guideMessage.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex >= guideMessage.length) {
        clearInterval(interval);
      }
    }, 25);

    // Auto-collapse after 5 seconds
    const collapseTimer = setTimeout(() => {
      setGuideMessage(null);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(collapseTimer);
    };
  }, [guideMessage, setGuideMessage]);

  const handleOrbClick = () => {
    if (guideMessage) {
      setGuideMessage(null);
    } else {
      // Re-trigger last message or a default greeting
      setGuideMessage(lastMessageRef.current || "Architect system online. How can I assist you today?");
    }
  };

  // Orb Mouse Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / 12;
      const y = (e.clientY - centerY) / 12;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isLoaded) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none"
    >
      <AnimatePresence>
        {guideMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 5, filter: 'blur(10px)' }}
            className="glass p-4 rounded-xl max-w-[320px] border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.4)] relative overflow-hidden pointer-events-auto mb-1"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-accent-amber/[0.05] blur-[30px] -mr-10 -mt-10" />
            
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-amber mt-1.5 shadow-[0_0_8px_rgba(214,168,106,0.6)] shrink-0" />
              <p className="text-[10px] text-foreground/75 leading-relaxed font-medium tracking-wide selection:bg-accent-amber/20 pl-0.5">
                {displayedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-0.5 h-2.5 bg-accent-amber ml-1 align-middle"
                />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Assistant Orb */}
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOrbClick}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: [0, -4, 0] 
        }}
        transition={{ 
          opacity: { delay: 2 },
          scale: { delay: 2, type: 'spring' },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="relative w-10 h-10 group pointer-events-auto"
      >
        {/* Core Glow */}
        <div className="absolute inset-0 bg-accent-amber/[0.08] blur-[20px] rounded-full" />
        
        {/* Outer Rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 border border-white/[0.05] rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 border border-accent-amber/[0.05] rounded-full"
        />

        {/* Main Orb Body */}
        <motion.div
          animate={{ 
            x: mousePos.x,
            y: mousePos.y
          }}
          transition={{ 
            x: { type: 'spring', damping: 15, stiffness: 150 },
            y: { type: 'spring', damping: 15, stiffness: 150 }
          }}
          className="w-full h-full glass rounded-full flex items-center justify-center border-white/[0.08] relative overflow-hidden group-hover:border-accent-amber/30 transition-colors duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        >
          {/* Inner Personality Core */}
          <motion.div 
            animate={{ 
              scale: isHovered ? 1.2 : 1,
              backgroundColor: isHovered ? '#D6A86A' : '#F5F1EA'
            }}
            className="w-3.5 h-3.5 rounded-full shadow-[0_0_15px_rgba(214,168,106,0.3)] z-10"
          />
          
          {/* Scanning Effect */}
          <motion.div
            animate={{ top: ['100%', '-100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-[1.5px] bg-accent-amber/30 blur-[1px] z-0"
          />

          {/* Ambient Particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0, 0.8, 0],
                y: [-20, 20],
                x: [-20, 20]
              }}
              transition={{ 
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.7
              }}
              className="absolute w-0.5 h-0.5 bg-foreground/40 rounded-full blur-[0.5px]"
            />
          ))}
        </motion.div>

        {/* Interaction Hint */}
        <AnimatePresence>
          {isHovered && !guideMessage && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: -10 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute right-full top-1/2 -translate-y-1/2 mr-4 glass px-3 py-1.5 rounded-full border-white/10"
            >
              <span className="text-[10px] uppercase tracking-widest text-foreground/40 whitespace-nowrap">Architect Online</span>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.button>
    </div>
  );
};

export default AIGuide;
