'use client';

import React from 'react';
import { motion } from 'framer-motion';

const IntroPanel: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-8 max-w-md text-left">
      <div className="flex flex-col">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-white/40 mb-2 font-mono"
        >
          Creative Developer
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-5xl md:text-8xl"
        >
          MANISH
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="flex flex-col gap-4"
      >
        <p className="text-white/60 leading-relaxed">
          Building cinematic digital experiences and immersive interfaces. 
          Obsessed with pixels that breathe and interactions that feel alive.
        </p>
        
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_10px_#06b6d4]" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
            Available for next-gen projects
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default IntroPanel;
