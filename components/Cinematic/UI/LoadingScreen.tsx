'use client';

import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-[1px] bg-white/20 relative"
        >
          <motion.div
            initial={{ left: "0%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 w-12 h-full bg-accent-blue shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono"
        >
          Initializing Environment
        </motion.span>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
