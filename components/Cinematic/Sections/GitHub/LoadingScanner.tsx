'use client';

import React from 'react';
import { motion } from 'framer-motion';

const LoadingScanner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-20">
      <div className="relative w-64 h-64 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-accent-amber/20 rounded-full border-t-accent-amber/60 shadow-[0_0_20px_rgba(214,168,106,0.15)]"
        />
        
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border border-white/[0.03] rounded-full"
        >
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-accent-amber shadow-[0_0_15px_rgba(214,168,106,0.5)]"
          />
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="relative w-16 h-16 bg-accent-amber/5 backdrop-blur-md border border-accent-amber/20 flex items-center justify-center"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        >
          <div className="w-8 h-8 bg-accent-amber/10 rounded-full blur-xl" />
        </motion.div>

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{ 
              duration: 3, 
              delay: i * 0.3,
              repeat: Infinity 
            }}
            className="absolute w-1 h-1 bg-accent-amber rounded-full shadow-[0_0_10px_rgba(214,168,106,0.5)]"
            style={{
              top: `${50 + 40 * Math.sin((i * 60 * Math.PI) / 180)}%`,
              left: `${50 + 40 * Math.cos((i * 60 * Math.PI) / 180)}%`,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-3">
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-foreground/40 font-mono text-[10px] uppercase tracking-[0.6em]"
        >
          Initializing Protocol
        </motion.span>
        <div className="flex gap-1.5">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
              className="w-1 h-1 bg-accent-amber rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScanner;
