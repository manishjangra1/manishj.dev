'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchGitHubData, GitHubData, getLanguageStats } from '@/lib/github';
import LoadingScanner from './LoadingScanner';
import ContributionGraph from './ContributionGraph';
import RepositorySystem from './RepositorySystem';
import LanguageConstellation from './LanguageConstellation';
import { Shield } from 'lucide-react';

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
    <div className="w-full flex items-center justify-center min-h-[300px]">
      <LoadingScanner />
    </div>
  );

  if (error) return (
    <div className="w-full flex flex-col items-center justify-center gap-6 min-h-[300px]">
      <Shield className="text-accent-amber/20" size={48} />
      <span className="text-foreground/45 font-mono text-[10px] uppercase tracking-[0.4em] text-center max-w-xs leading-loose">
        Protocol Error: <br />
        <span className="text-accent-amber/60">{error}</span>
      </span>
      <button 
        onClick={() => window.location.reload()}
        className="glass px-8 py-3 rounded-xl text-[10px] uppercase tracking-[0.3em] text-foreground/60 hover:text-accent-amber hover:border-accent-amber/30 transition-all duration-700 cursor-pointer"
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
      className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      {/* 1. Contribution Graph Bento Card (Col span 3) */}
      <div className="lg:col-span-3">
        <ContributionGraph calendar={data.user.contributionsCollection.contributionCalendar} />
      </div>

      {/* 2. Language Distribution (Col span 1) */}
      <div className="lg:col-span-1">
        <LanguageConstellation languages={languages} />
      </div>

      {/* 3. Top Repositories List (Col span 2) */}
      <div className="lg:col-span-2">
        <RepositorySystem repositories={data.user.repositories.nodes} />
      </div>
    </motion.div>
  );
};

export default GitHubSection;
