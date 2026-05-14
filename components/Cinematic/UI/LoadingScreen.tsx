'use client';

import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 240 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="h-[1px] bg-foreground/10 relative"
        >
          <motion.div
            initial={{ left: "-20%" }}
            animate={{ left: "120%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 w-20 h-full bg-accent-amber shadow-[0_0_20px_rgba(214,168,106,0.3)]"
          />
        </motion.div>
        <div className="flex flex-col items-center gap-2">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-[9px] uppercase tracking-[0.5em] text-foreground/40 font-mono"
          >
            Establishing Architectural Layer
          </motion.span>
          <span className="text-[8px] uppercase tracking-[0.2em] text-foreground/20 font-mono">
            System v2.0 // Premium
          </span>
        </div>
      </div>
    </motion.div>

  );
};

export default LoadingScreen;
