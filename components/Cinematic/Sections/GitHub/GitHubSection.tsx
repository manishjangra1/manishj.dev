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
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <Shield className="text-red-500/50" size={48} />
      <span className="text-red-500/50 font-mono text-xs uppercase tracking-widest font-semibold text-center">
        Authentication Error: {error}
      </span>
      <button 
        onClick={() => window.location.reload()}
        className="glass px-6 py-2 rounded-xl text-[10px] uppercase tracking-widest text-white/40 hover:text-white"
      >
        Retry Connection
      </button>
    </div>
  );

  if (!data) return null;

  const languages = getLanguageStats(data.user.repositories.nodes);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex items-start justify-center p-6 md:p-12 pt-16 md:pt-20 overflow-hidden"
    >
      <div className="w-full max-w-7xl h-full flex flex-col md:flex-row gap-8 relative z-10 overflow-hidden">
        
        {/* Left Sidebar */}
        <div className="w-full md:w-[320px] flex flex-col gap-6 shrink-0 overflow-y-auto scrollbar-hide">
          <ProfileCard user={data.user} />
          <LanguageConstellation languages={languages} />
          
          <div className="glass p-6 rounded-[2rem] border-white/5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Cpu size={16} className="text-accent-blue" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-mono">Development Stats</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[10px] text-white/40 uppercase font-mono">Profile Activity</span>
                <span className="text-xs font-bold text-white/60">Active</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  className="h-full bg-white/20"
                />
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2">
                  <Zap size={12} className="text-accent-blue" />
                  <span className="text-[9px] uppercase font-mono text-white/30">Commit Frequency</span>
                </div>
                <span className="text-[9px] font-mono text-white/60">High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-8 min-w-0 overflow-y-auto scrollbar-hide pb-10">
          <ContributionGraph calendar={data.user.contributionsCollection.contributionCalendar} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ActivityTimeline events={data.events} />
            <RepositorySystem repositories={data.user.repositories.nodes} />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.015),transparent)]" />
      </div>
    </motion.div>
  );
};

export default GitHubSection;
