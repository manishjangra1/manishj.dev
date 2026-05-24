'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ContributionGraphProps {
  calendar: any;
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ calendar }) => {
  const totalContributions = calendar.totalContributions;

  // Pre-calculate and format all days once to avoid expensive date operations during render
  const formattedWeeks = useMemo(() => {
    return calendar.weeks.map((week: any) => ({
      contributionDays: week.contributionDays.map((day: any) => {
        const dateObj = new Date(day.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }).toUpperCase();
        const intensity = Math.min(day.contributionCount / 10, 1);
        return {
          ...day,
          formattedDate,
          intensity,
        };
      })
    }));
  }, [calendar.weeks]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/30 font-mono mb-2">Contribution Activity</span>
          <h3 className="text-xl font-bold text-foreground tracking-tight uppercase">Contribution Timeline</h3>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/30 font-mono mb-2">Total Contributions</span>
          <span className="text-xl font-bold text-foreground tracking-tighter">{totalContributions} Contributions</span>
        </div>
      </div>

      <div className="glass p-8 rounded-[2.5rem] border-white/[0.05] relative overflow-hidden group">
        {/* Subtly Animated Background Glow (Behind content) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(214,168,106,0.03),transparent_70%)] pointer-events-none z-0" />
        
        <div className="relative z-10 flex gap-1 overflow-x-auto scrollbar-hide pb-2">
          {formattedWeeks.map((week: any, weekIndex: number) => (
            <motion.div 
              key={weekIndex} 
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: weekIndex * 0.012,
                duration: 0.4,
                ease: 'easeOut'
              }}
              className="flex flex-col gap-1 shrink-0"
            >
              {week.contributionDays.map((day: any) => (
                <div
                  key={day.date}
                  className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-[2px] transition-all relative group/day shrink-0 hover:scale-125 hover:z-50 hover:bg-accent-amber/45 hover:shadow-[0_0_15px_rgba(214,168,106,0.3)] cursor-default"
                  style={{ 
                    backgroundColor: day.contributionCount > 0 
                      ? `rgba(214,168,106, ${0.12 + day.intensity * 0.58})` 
                      : 'rgba(255, 255, 255, 0.02)' 
                  }}
                >
                  {/* Hover Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 glass rounded-xl text-[10px] font-bold text-foreground opacity-0 group-hover/day:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-[100] border border-white/[0.05] shadow-2xl">
                    <span className="text-accent-amber">{day.contributionCount} EVENTS</span> // {day.formattedDate}
                  </div>

                  {/* Subtle CSS Pulse for high activity */}
                  {day.contributionCount > 5 && (
                    <div className="absolute inset-0 bg-accent-amber/20 rounded-[2px] activity-pulse" />
                  )}
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[9px] uppercase tracking-[0.3em] text-foreground/20 font-mono">
          <span>Low Activity</span>
          <div className="flex gap-2 items-center">
            {[0.1, 0.3, 0.6, 0.9].map(op => (
              <div key={op} className="w-2.5 h-2.5 rounded-[1px]" style={{ backgroundColor: `rgba(214,168,106, ${op})` }} />
            ))}
          </div>
          <span>Peak Activity</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;
