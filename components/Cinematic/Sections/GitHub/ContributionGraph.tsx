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
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-mono mb-1">Activity Tracking</span>
          <h3 className="text-xl font-bold text-white tracking-tighter uppercase">Commit Contributions</h3>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-mono mb-1">Total Contributions</span>
          <span className="text-xl font-black text-white">{totalContributions} Units</span>
        </div>
      </div>

      <div className="glass p-8 rounded-[2rem] border-white/10 relative overflow-hidden group min-h-[160px]">
        {/* Subtly Animated Background Glow (Behind content) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.03),transparent_70%)] pointer-events-none z-0" />
        
        <div className="relative z-10 flex gap-1.5 h-32 md:h-40 overflow-x-auto scrollbar-hide">
          {weeks.map((week: any, weekIndex: number) => (
            <div key={weekIndex} className="flex flex-col gap-1.5 shrink-0">
              {week.contributionDays.map((day: any, dayIndex: number) => {
                const intensity = Math.min(day.contributionCount / 10, 1);
                return (
                  <motion.div
                    key={day.date}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: (weekIndex * 7 + dayIndex) * 0.002,
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      zIndex: 50,
                      backgroundColor: 'rgba(255, 255, 255, 0.2)'
                    }}
                    className="w-3 h-3 md:w-4 md:h-4 rounded-[1px] transition-all relative group/day"
                    style={{ 
                      backgroundColor: day.contributionCount > 0 
                        ? `rgba(255, 255, 255, ${0.05 + intensity * 0.4})` 
                        : 'rgba(255, 255, 255, 0.02)' 
                    }}
                  >
                    {/* Hover Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 glass rounded-lg text-[9px] font-bold text-white opacity-0 group-hover/day:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100] shadow-2xl">
                      <span className="text-white/60">{day.contributionCount} commits</span> on {new Date(day.date).toLocaleDateString()}
                    </div>

                    {/* Subtle Pulse for high activity */}
                    {day.contributionCount > 5 && (
                      <motion.div
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-white/20 rounded-[1px]"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/20 font-mono">
          <span>Lower Activity</span>
          <div className="flex gap-1.5 items-center">
            {[0.1, 0.3, 0.6, 1].map(op => (
              <div key={op} className="w-2.5 h-2.5 rounded-[1px]" style={{ backgroundColor: `rgba(59, 130, 246, ${op})` }} />
            ))}
          </div>
          <span>Peak Activity</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;
