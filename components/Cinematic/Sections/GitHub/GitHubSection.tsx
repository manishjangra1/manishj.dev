'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchGitHubData, GitHubData, getLanguageStats } from '@/lib/github';
import LoadingScanner from './LoadingScanner';
import ProfileCard from './ProfileCard';
import ContributionGraph from './ContributionGraph';
import RepositorySystem from './RepositorySystem';
import ActivityTimeline from './ActivityTimeline';
import LanguageConstellation from './LanguageConstellation';
import { Terminal, Shield, Cpu, Zap } from 'lucide-react';

const GitHubSection: React.FC = () => {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const githubData = await fetchGitHubData();
        setData(githubData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return (
    <div className="absolute inset-0 flex items-center justify-center">
      <LoadingScanner />
    </div>
  );

  if (error) return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
      <Shield className="text-accent-amber/20" size={48} />
      <span className="text-foreground/40 font-mono text-[10px] uppercase tracking-[0.4em] text-center max-w-xs leading-loose">
        Protocol Error: <br />
        <span className="text-accent-amber/60">{error}</span>
      </span>
      <button 
        onClick={() => window.location.reload()}
        className="glass px-8 py-3 rounded-xl text-[10px] uppercase tracking-[0.3em] text-foreground/60 hover:text-accent-amber hover:border-accent-amber/30 transition-all duration-700"
      >
        Re-Establish Connection
      </button>
    </div>
  );

  if (!data) return null;

  const languages = getLanguageStats(data.user.repositories.nodes);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex items-start justify-center px-12 md:px-32 pt-16 md:pt-20 overflow-hidden"
    >
      <div className="w-full max-w-7xl h-full flex flex-col md:flex-row gap-8 relative z-10 overflow-hidden">
        
        {/* Left Sidebar */}
        <div className="w-full md:w-[320px] flex flex-col gap-6 shrink-0 overflow-y-auto scrollbar-hide pb-32">
          <ProfileCard user={data.user} />
          <LanguageConstellation languages={languages} />
          
          <div className="glass p-8 rounded-[2rem] border-white/[0.05] flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Cpu size={16} className="text-accent-amber" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/30 font-mono">Development Unit</span>
            </div>
            <div className="space-y-5">
              <div className="flex justify-between items-end">
                <span className="text-[9px] text-foreground/20 uppercase font-mono tracking-widest">Protocol State</span>
                <span className="text-[10px] font-bold text-accent-amber/70 uppercase tracking-tighter">Active</span>
              </div>
              <div className="h-[1px] bg-white/[0.05] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                  className="h-full bg-accent-amber/20 shadow-[0_0_10px_rgba(214,168,106,0.2)]"
                />
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2">
                  <Zap size={12} className="text-accent-amber/60" />
                  <span className="text-[9px] uppercase font-mono text-foreground/20 tracking-widest">Sync Frequency</span>
                </div>
                <span className="text-[10px] font-mono text-foreground/40 uppercase">Optimized</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-8 min-w-0 overflow-y-auto scrollbar-hide pb-40">
          <ContributionGraph calendar={data.user.contributionsCollection.contributionCalendar} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ActivityTimeline events={data.events} />
            <RepositorySystem repositories={data.user.repositories.nodes} />
          </div>
        </div>
      </div>


    </motion.div>
  );
};

export default GitHubSection;
