'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LanguageConstellationProps {
  languages: Array<[string, { size: number; color: string }]>;
}

const LanguageConstellation: React.FC<LanguageConstellationProps> = ({ languages }) => {
  const totalSize = languages.reduce((acc, curr) => acc + curr[1].size, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="h-[1px] w-6 bg-white/10" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-mono">Top Languages</span>
      </div>

      <div className="glass p-8 rounded-[2rem] border-white/10 relative overflow-hidden h-64 flex items-center justify-center group">
        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full opacity-20 group-hover:opacity-40 transition-opacity">
          {languages.map((_, i) => (
            i > 0 && (
              <motion.line
                key={i}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.2 }}
                x1="50%" y1="50%"
                x2={`${50 + 35 * Math.cos((i * 360 / languages.length) * Math.PI / 180)}%`}
                y2={`${50 + 35 * Math.sin((i * 360 / languages.length) * Math.PI / 180)}%`}
                stroke="white"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
            )
          ))}
        </svg>

        {/* Central Hub */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: 360 
          }}
          transition={{ 
            scale: { duration: 4, repeat: Infinity },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
          className="relative z-10 w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] backdrop-blur-xl"
        >
          <div className="w-10 h-10 rounded-full bg-accent-blue/5 blur-lg" />
          <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] text-center leading-tight">Tech<br/>Stack</span>
        </motion.div>

        {/* Orbiting Nodes */}
        {languages.map(([name, data], i) => {
          const angle = (i * 360 / languages.length) * Math.PI / 180;
          const radius = 35; // %
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          const percentage = (data.size / totalSize) * 100;
          const nodeSize = Math.max(2, percentage / 2);

          return (
            <motion.div
              key={name}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              style={{ top: `${y}%`, left: `${x}%` }}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group/node"
            >
              <motion.div
                whileHover={{ scale: 1.5 }}
                className="relative flex flex-col items-center"
              >
                <div 
                  className="w-4 h-4 md:w-6 md:h-6 rounded-full border border-white/20 flex items-center justify-center shadow-2xl transition-all group-hover/node:border-accent-blue"
                  style={{ backgroundColor: `${data.color}22` }}
                >
                  <div 
                    className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" 
                    style={{ backgroundColor: data.color }}
                  />
                </div>
                
                <div className="absolute top-full mt-2 opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap flex flex-col items-center pointer-events-none">
                  <span className="text-[10px] font-bold text-white uppercase tracking-tighter">{name}</span>
                  <span className="text-[8px] text-accent-blue font-mono">{percentage.toFixed(1)}% Usage</span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageConstellation;
