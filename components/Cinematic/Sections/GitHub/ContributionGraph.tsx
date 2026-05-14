'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ContributionGraphProps {
  calendar: any;
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ calendar }) => {
  const weeks = calendar.weeks;
  const totalContributions = calendar.totalContributions;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/30 font-mono mb-2">Activity Protocol</span>
          <h3 className="text-xl font-bold text-foreground tracking-tight uppercase">Contribution Timeline</h3>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/30 font-mono mb-2">Accumulated Data</span>
          <span className="text-xl font-bold text-foreground tracking-tighter">{totalContributions} UNITS</span>
        </div>
      </div>

      <div className="glass p-8 rounded-[2.5rem] border-white/[0.05] relative overflow-hidden group min-h-[160px]">
        {/* Subtly Animated Background Glow (Behind content) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(214,168,106,0.03),transparent_70%)] pointer-events-none z-0" />
        
        <div className="relative z-10 flex gap-2 h-32 md:h-40 overflow-x-auto scrollbar-hide">
          {weeks.map((week: any, weekIndex: number) => (
            <div key={weekIndex} className="flex flex-col gap-2 shrink-0">
              {week.contributionDays.map((day: any, dayIndex: number) => {
                const intensity = Math.min(day.contributionCount / 10, 1);
                return (
                  <motion.div
                    key={day.date}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: (weekIndex * 7 + dayIndex) * 0.001,
                      type: "spring",
                      stiffness: 400,
                      damping: 30
                    }}
                    whileHover={{ 
                      scale: 1.25,
                      zIndex: 50,
                      backgroundColor: 'rgba(214, 168, 106, 0.4)',
                      boxShadow: '0 0 15px rgba(214, 168, 106, 0.2)'
                    }}
                    className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-[2px] transition-all relative group/day"
                    style={{ 
                      backgroundColor: day.contributionCount > 0 
                        ? `rgba(214, 168, 106, ${0.1 + intensity * 0.6})` 
                        : 'rgba(255, 255, 255, 0.02)' 
                    }}
                  >
                    {/* Hover Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 glass rounded-xl text-[10px] font-bold text-foreground opacity-0 group-hover/day:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-[100] border border-white/[0.05] shadow-2xl">
                      <span className="text-accent-amber">{day.contributionCount} EVENTS</span> // {new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
                    </div>

                    {/* Subtle Pulse for high activity */}
                    {day.contributionCount > 5 && (
                      <motion.div
                        animate={{ opacity: [0.1, 0.4, 0.1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-accent-amber/20 rounded-[2px]"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 pt-6 border-t border-white/[0.05] flex items-center justify-between text-[9px] uppercase tracking-[0.3em] text-foreground/20 font-mono">
          <span>LATENT STATE</span>
          <div className="flex gap-2 items-center">
            {[0.1, 0.3, 0.6, 0.9].map(op => (
              <div key={op} className="w-2.5 h-2.5 rounded-[1px]" style={{ backgroundColor: `rgba(214, 168, 106, ${op})` }} />
            ))}
          </div>
          <span>PEAK ARCHITECTURE</span>
        </div>
      </div>
    </div>

  );
};

export default ContributionGraph;
