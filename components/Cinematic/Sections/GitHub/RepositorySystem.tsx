'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, Terminal } from 'lucide-react';

interface RepositorySystemProps {
  repositories: any[];
}

const RepositorySystem: React.FC<RepositorySystemProps> = ({ repositories }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="h-[1px] w-8 bg-accent-amber/30" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/30 font-mono">Repository Architecture</span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {repositories.slice(0, 5).map((repo, index) => (
          <motion.div
            key={repo.name}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            whileHover={{ x: -6 }}
            className="glass p-6 rounded-2xl border-white/[0.05] hover:border-accent-amber/20 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-accent-amber/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative flex items-center justify-between gap-6">
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="flex items-center gap-3">
                  <Terminal size={12} className="text-accent-amber/60" />
                  <h4 className="text-sm font-bold text-foreground tracking-tight uppercase group-hover:text-accent-amber transition-colors duration-500">
                    {repo.name}
                  </h4>
                </div>
                <p className="text-[11px] text-foreground/35 line-clamp-1 group-hover:text-foreground/60 transition-colors duration-500 font-light">
                  {repo.description || "Architectural engineering module."}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5 text-foreground/20 group-hover:text-foreground/50 transition-colors duration-500">
                  <Star size={12} className="text-accent-amber/40" />
                  <span className="text-[11px] font-bold">{repo.stargazerCount}</span>
                </div>
                <div className="flex items-center gap-1.5 text-foreground/20 group-hover:text-foreground/50 transition-colors duration-500">
                  <GitFork size={12} className="text-accent-amber/30" />
                  <span className="text-[11px] font-bold">{repo.forkCount}</span>
                </div>
                <a 
                  href={repo.url} 
                  target="_blank" 
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-foreground/20 hover:text-accent-amber hover:border-accent-amber/30 transition-all duration-500"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              {repo.languages.edges.slice(0, 3).map((edge: any) => (
                <span 
                  key={edge.node.name} 
                  className="px-2.5 py-0.5 rounded-md bg-white/[0.02] border border-white/[0.05] text-[9px] font-bold text-foreground/30"
                >
                  {edge.node.name}
                </span>
              ))}
              {repo.repositoryTopics.nodes.slice(0, 2).map((topic: any) => (
                <span 
                  key={topic.topic.name} 
                  className="px-2.5 py-0.5 rounded-md bg-accent-amber/[0.03] border border-accent-amber/10 text-[9px] font-bold text-accent-amber/40"
                >
                  #{topic.topic.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button 
        whileHover={{ scale: 1.02, y: -2 }}
        className="mt-2 py-3.5 w-full glass rounded-xl border-white/[0.05] text-[10px] uppercase tracking-[0.3em] text-foreground/20 hover:text-accent-amber hover:border-accent-amber/20 transition-all duration-700"
      >
        Expand Full Repository Index
      </motion.button>
    </div>
  );
};

export default RepositorySystem;
