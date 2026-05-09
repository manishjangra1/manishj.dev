'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ProfileCard: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Top Tag */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="inline-flex items-center px-4 py-1.5 rounded-xl border border-white/40 bg-white/5 backdrop-blur-md self-start"
      >
        <span className="text-sm font-semibold text-white">Steve Mac</span>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="w-[380px] p-10 rounded-[40px] border border-white/15 bg-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group"
      >
        {/* Subtle Inner Glow */}
        <div className="absolute inset-0 rounded-[40px] border border-white/5 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col gap-8">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 shadow-xl bg-neutral-800">
            <Image 
              src="/avatar.png" 
              alt="Steve Mac" 
              width={96} 
              height={96} 
              className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[28px] font-bold text-white tracking-tight leading-none whitespace-nowrap">
              Steve — <span className="opacity-70 font-medium text-[26px]">Creative Designer</span>
            </h2>
            <p className="text-white/60 leading-[1.6] text-[17px] font-medium">
              Crafting thoughtful digital experiences with clarity and purpose.
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3 pt-2">
            <div className="relative flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)]" />
              <div className="absolute w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-60" />
            </div>
            <span className="text-[17px] font-medium text-white/80">Available for work</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCard;
