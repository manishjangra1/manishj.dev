'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LanguageConstellationProps {
  languages: Array<[string, { size: number; color: string }]>;
}

const LanguageConstellation: React.FC<LanguageConstellationProps> = ({ languages }) => {
  const totalSize = languages.reduce((acc, curr) => acc + curr[1].size, 0);

  return (
    <div className="bento-card relative overflow-hidden h-[340px] flex flex-col justify-between group w-full">
      {/* Title */}
      <div className="relative z-10 flex flex-col gap-1">
        <span className="text-[9px] uppercase tracking-[0.4em] text-accent-amber font-mono font-bold">Tech Stack</span>
        <h3 className="text-xl font-bold text-foreground uppercase tracking-tight">Code Makeup</h3>
      </div>

      {/* Constellation Canvas Grid */}
      <div className="relative flex-1 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-700">
          {languages.map((_, i) => (
            i > 0 && (
              <motion.line
                key={i}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, delay: i * 0.15 }}
                x1="50%" y1="50%"
                x2={`${50 + 35 * Math.cos((i * 360 / languages.length) * Math.PI / 180)}%`}
                y2={`${50 + 35 * Math.sin((i * 360 / languages.length) * Math.PI / 180)}%`}
                stroke="rgba(214,168,106,0.4)"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
            )
          ))}
        </svg>

        {/* Center Node */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: 360 
          }}
          transition={{ 
            scale: { duration: 6, repeat: Infinity },
            rotate: { duration: 30, repeat: Infinity, ease: "linear" }
          }}
          className="relative z-10 w-12 h-12 rounded-full border border-border-standard flex items-center justify-center bg-surface-secondary backdrop-blur-xl"
        >
          <div className="w-8 h-8 rounded-full bg-accent-amber/5 blur-lg" />
          <span className="absolute text-[6px] font-bold text-foreground/20 uppercase tracking-[0.3em] text-center leading-tight">Languages</span>
        </motion.div>

        {/* Orbit nodes */}
        {languages.map(([name, data], i) => {
          const angle = (i * 360 / languages.length) * Math.PI / 180;
          const radius = 33;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          const percentage = (data.size / totalSize) * 100;

          return (
            <motion.div
              key={name}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              style={{ top: `${y}%`, left: `${x}%` }}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group/node"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="relative flex flex-col items-center"
              >
                <div 
                  className="w-4 h-4 rounded-full border border-border-standard flex items-center justify-center transition-all duration-500 group-hover/node:border-accent-amber/50 group-hover/node:shadow-[0_0_15px_rgba(214,168,106,0.2)]"
                  style={{ backgroundColor: `${data.color}15` }}
                >
                  <div 
                    className="w-1.5 h-1.5 rounded-full" 
                    style={{ backgroundColor: data.color }}
                  />
                </div>
                
                <div className="absolute top-full mt-2 opacity-0 group-hover/node:opacity-100 transition-opacity duration-300 whitespace-nowrap flex flex-col items-center pointer-events-none z-30">
                  <span className="text-[9px] font-bold text-foreground uppercase tracking-tight">{name}</span>
                  <span className="text-[7.5px] text-accent-amber/70 font-mono">{percentage.toFixed(1)}%</span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer / Summary description */}
      <div className="relative z-10 pt-3 border-t border-border-standard text-[8px] font-mono text-foreground/20 uppercase tracking-widest flex justify-between">
        <span>Languages Map</span>
        <span className="text-accent-amber/50">Constellation</span>
      </div>
    </div>
  );
};

export default LanguageConstellation;
