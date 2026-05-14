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
        className="w-full glass h-10 px-4 rounded-xl flex items-center justify-between group hover:border-accent-amber/30 transition-all duration-700 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
      >
        <div className="flex items-center gap-3">
          <Search size={14} className="text-foreground/30 group-hover:text-accent-amber transition-colors duration-500" />
          <span className="text-[11px] text-foreground/20 group-hover:text-foreground/40 transition-colors duration-500 font-medium">
            Search everything...
          </span>
        </div>
        
        <div className="flex items-center gap-1 px-1.5 py-0.5 glass rounded-md border-white/5 bg-white/[0.02] text-[9px] text-foreground/20 font-mono">
          <Command size={8} />
          <span>K</span>
        </div>
      </button>
    </motion.div>
  );
};

export default TopSearchBar;
