'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, Terminal } from 'lucide-react';

interface RepositorySystemProps {
  repositories: any[];
}

const RepositorySystem: React.FC<RepositorySystemProps> = ({ repositories }) => {
  return (
    <div className="bento-card relative overflow-hidden h-[340px] flex flex-col justify-between group w-full space-y-4">
      {/* Title */}
      <div className="relative z-10 flex flex-col gap-1">
        <span className="text-[9px] uppercase tracking-[0.4em] text-accent-amber font-mono font-bold">Featured Repositories</span>
        <h3 className="text-xl font-bold text-foreground uppercase tracking-tight">Active Repos</h3>
      </div>

      {/* Repos list container */}
      <div className="relative z-10 flex-1 overflow-y-auto scrollbar-hide space-y-2.5 pr-1">
        {repositories.slice(0, 4).map((repo, index) => (
          <motion.div
            key={repo.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="p-3.5 rounded-xl border border-border-standard bg-surface-secondary/40 hover:border-accent-amber/20 hover:bg-surface-secondary transition-all duration-300 group/item flex items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0 flex items-center gap-3">
              <Terminal size={12} className="text-accent-amber/60 shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-foreground tracking-tight uppercase group-hover/item:text-accent-amber transition-colors truncate">
                  {repo.name}
                </h4>
                <p className="text-[9.5px] text-foreground/30 truncate font-light mt-0.5">
                  {repo.description || "Software repository."}
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-4 shrink-0 font-mono text-[9.5px]">
              <div className="flex items-center gap-1 text-foreground/20 group-hover/item:text-foreground/45 transition-colors">
                <Star size={10} className="text-accent-amber/50" />
                <span>{repo.stargazerCount}</span>
              </div>
              <div className="flex items-center gap-1 text-foreground/20 group-hover/item:text-foreground/45 transition-colors">
                <GitFork size={10} className="text-accent-amber/40" />
                <span>{repo.forkCount}</span>
              </div>
              <a 
                href={repo.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-7 h-7 rounded-lg glass border-border-standard flex items-center justify-center text-foreground/25 hover:text-accent-amber hover:border-accent-amber/30 transition-all"
              >
                <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer link */}
      <div className="relative z-10 pt-3 border-t border-border-standard text-[8px] font-mono text-foreground/20 uppercase tracking-widest flex justify-between">
        <span>GitHub Hub</span>
        <a 
          href="https://github.com/manishjangra1" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-accent-amber transition-colors"
        >
          View Profile →
        </a>
      </div>
    </div>
  );
};

export default RepositorySystem;
