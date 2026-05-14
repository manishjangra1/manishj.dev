'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, GitMerge, Package, PlayCircle } from 'lucide-react';

interface ActivityTimelineProps {
  events: any[];
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ events }) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'PushEvent': return GitCommit;
      case 'PullRequestEvent': return GitPullRequest;
      case 'PullRequestReviewEvent': return GitMerge;
      case 'CreateEvent': return Package;
      default: return PlayCircle;
    }
  };

  const formatEventMessage = (event: any) => {
    const type = event.type;
    const repo = event.repo.name.split('/')[1];
    
    switch (type) {
      case 'PushEvent': 
        const commits = event.payload.commits?.length || 0;
        return `Committed ${commits} updates to ${repo}`;
      case 'PullRequestEvent':
        return `${event.payload.action} PR in ${repo}`;
      case 'CreateEvent':
        return `Initialized new node: ${repo}`;
      case 'WatchEvent':
        return `Starred ${repo}`;
      default:
        return `Active in ${repo}`;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="h-[1px] w-6 bg-white/10" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-mono">Recent Activity</span>
      </div>

      <div className="space-y-3 relative">
        {/* Continuous Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-white/[0.03]" />

        {events.slice(0, 8).map((event, index) => {
          const Icon = getEventIcon(event.type);
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-6 group cursor-default"
            >
              <div className="relative z-10 w-12 h-12 rounded-full glass border-white/5 flex items-center justify-center shrink-0 group-hover:border-accent-blue/30 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all">
                <Icon size={16} className="text-white/40 group-hover:text-accent-blue transition-colors" />
                
                {/* Pulse for very recent events */}
                {index === 0 && (
                  <motion.div 
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-accent-blue rounded-full"
                  />
                )}
              </div>

              <div className="flex-1 flex flex-col gap-0.5">
                <span className="text-[11px] font-bold text-white group-hover:text-accent-blue transition-colors uppercase tracking-tight">
                  {formatEventMessage(event)}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-white/20 font-mono">
                  {new Date(event.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Synchronized
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityTimeline;
