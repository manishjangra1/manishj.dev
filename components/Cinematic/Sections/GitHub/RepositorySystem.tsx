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
      <div className="flex items-center gap-3">
        <div className="h-[1px] w-6 bg-white/10" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-mono">Repositories</span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {repositories.slice(0, 5).map((repo, index) => (
          <motion.div
            key={repo.name}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: -10 }}
            className="glass p-5 rounded-2xl border-white/5 hover:border-accent-blue/30 transition-all group relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-accent-blue/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative flex items-center justify-between gap-6">
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-accent-blue" />
                  <h4 className="text-sm font-bold text-white tracking-tight uppercase group-hover:text-accent-blue transition-colors">
                    {repo.name}
                  </h4>
                </div>
                <p className="text-[11px] text-white/40 line-clamp-1 group-hover:text-white/60 transition-colors">
                  {repo.description || "Experimental engineering project."}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5 text-white/30 group-hover:text-white/60 transition-colors">
                  <Star size={12} className="text-yellow-500/50" />
                  <span className="text-[11px] font-bold">{repo.stargazerCount}</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/30 group-hover:text-white/60 transition-colors">
                  <GitFork size={12} className="text-accent-blue/50" />
                  <span className="text-[11px] font-bold">{repo.forkCount}</span>
                </div>
                <a 
                  href={repo.url} 
                  target="_blank" 
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-white/20 hover:text-white hover:bg-accent-blue transition-all"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Architecture Tags */}
            <div className="mt-3 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
              {repo.languages.edges.slice(0, 3).map((edge: any) => (
                <span 
                  key={edge.node.name} 
                  className="px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/5 text-[9px] font-bold text-white/30"
                >
                  {edge.node.name}
                </span>
              ))}
              {repo.repositoryTopics.nodes.slice(0, 2).map((topic: any) => (
                <span 
                  key={topic.topic.name} 
                  className="px-2 py-0.5 rounded-full bg-accent-blue/5 border border-accent-blue/10 text-[9px] font-bold text-accent-blue/50"
                >
                  #{topic.topic.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        className="mt-2 py-3 w-full glass rounded-xl border-white/5 text-[10px] uppercase tracking-[0.3em] text-white/20 hover:text-white hover:bg-white/5 transition-all"
      >
        View All Repositories
      </motion.button>
    </div>
  );
};

export default RepositorySystem;
