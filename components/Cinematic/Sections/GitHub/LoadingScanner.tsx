'use client';

import React from 'react';
import { motion } from 'framer-motion';

const LoadingScanner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-20">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Outer Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-accent-blue/20 rounded-full border-t-accent-blue shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        />
        
        {/* Inner Scanning Line */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border border-white/5 rounded-full"
        >
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-accent-blue shadow-[0_0_15px_#3b82f6]"
          />
        </motion.div>

        {/* Central Hexagon Core */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="relative w-16 h-16 bg-accent-blue/10 backdrop-blur-md border border-accent-blue/50 flex items-center justify-center"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        >
          <div className="w-8 h-8 bg-accent-blue/20 rounded-full blur-xl" />
        </motion.div>

        {/* Particle Points */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{ 
              duration: 2, 
              delay: i * 0.3,
              repeat: Infinity 
            }}
            className="absolute w-1 h-1 bg-accent-blue rounded-full shadow-[0_0_10px_#3b82f6]"
            style={{
              top: `${50 + 40 * Math.sin((i * 60 * Math.PI) / 180)}%`,
              left: `${50 + 40 * Math.cos((i * 60 * Math.PI) / 180)}%`,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-2">
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/40 font-mono text-[10px] uppercase tracking-[0.5em]"
        >
          Fetching GitHub Data
        </motion.span>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-accent-blue rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScanner;
