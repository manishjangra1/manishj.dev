'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AIAssistant: React.FC = () => {
  return (
    <div className="fixed top-8 right-8 z-50">
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 90, 180, 270, 360],
          boxShadow: [
            "0 0 20px rgba(59,130,246,0.3)",
            "0 0 40px rgba(168,85,247,0.5)",
            "0 0 20px rgba(59,130,246,0.3)"
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-12 h-12 rounded-full relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-indigo-600 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
        
        {/* Core */}
        <div className="absolute inset-[30%] rounded-full bg-white blur-[2px] opacity-90" />
        
        {/* Interaction Ring */}
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-full border border-white/30"
        />
      </motion.div>
      
      {/* Small status light */}
      <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-zinc-900 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
    </div>
  );
};

export default AIAssistant;
