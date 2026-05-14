'use client';

import React from 'react';
import { motion } from 'framer-motion';

const IntroPanel: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 md:gap-10 max-w-2xl text-left relative">
      {/* Editorial Accent Line - Offset to the left to keep text flush */}
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: '100%' }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute left-[-32px] top-0 w-[1px] bg-gradient-to-b from-accent-amber/50 via-accent-amber/10 to-transparent hidden md:block"
      />

      <div className="flex flex-col gap-2">
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] text-accent-amber/60 font-mono"
        >
          Software Engineer
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-foreground text-6xl md:text-[9.5rem] font-black leading-[0.8] -ml-1.5"
        >
          MANISH
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        className="flex flex-col gap-6"
      >
        <p className="text-foreground/50 text-lg md:text-2xl leading-tight font-light tracking-tight max-w-lg">
          Building scalable web applications and high-performance digital products with modern technologies including React, Next.js, Node.js, and TypeScript. 
        </p>
        
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-amber shadow-[0_0_12px_rgba(214,168,106,0.8)] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/40 font-mono">
              System Online
            </span>
          </div>
          <div className="h-[1px] w-8 bg-white/[0.05]" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/20 font-mono">
            Available for Hire
          </span>
        </div>

      </motion.div>
    </div>
  );
};

export default IntroPanel;
