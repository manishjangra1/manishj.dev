'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Command } from 'lucide-react';
import { useExperienceStore } from '@/lib/store/experience-store';

const TopSearchBar: React.FC = () => {
  const { setIsCommandPaletteOpen, isLoaded } = useExperienceStore();

  if (!isLoaded) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1 }}
      className="absolute top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[320px] px-4 pointer-events-auto"
    >
      <button
        onClick={() => setIsCommandPaletteOpen(true)}
        className="w-full glass h-10 px-4 rounded-xl flex items-center justify-between group hover:border-accent-blue/50 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
      >
        <div className="flex items-center gap-3">
          <Search size={14} className="text-white/40 group-hover:text-accent-blue transition-colors" />
          <span className="text-[11px] text-white/20 group-hover:text-white/40 transition-colors font-medium">
            Search everything...
          </span>
        </div>
        
        <div className="flex items-center gap-1 px-1.5 py-0.5 glass rounded-md border-white/5 bg-white/5 text-[9px] text-white/20 font-mono">
          <Command size={8} />
          <span>K</span>
        </div>
      </button>
    </motion.div>
  );
};

export default TopSearchBar;
