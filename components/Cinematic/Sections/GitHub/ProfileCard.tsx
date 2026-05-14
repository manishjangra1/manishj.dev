'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Activity, MapPin, Link as LinkIcon } from 'lucide-react';

interface ProfileCardProps {
  user: any;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass p-6 rounded-[2rem] border-white/10 shadow-2xl relative group"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 blur-3xl -mr-10 -mt-10 group-hover:bg-accent-blue/10 transition-colors" />
      
      <div className="relative flex items-center gap-6">
        {/* Avatar Section */}
        <div className="relative shrink-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-1.5 border border-white/5 rounded-full border-dashed"
          />
          <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 relative z-10 shadow-lg">
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-accent-blue border-2 border-black rounded-full z-20 shadow-md" />
        </div>
        
        <div className="flex flex-col min-w-0">
          <div className="text-lg font-bold text-white tracking-tighter uppercase truncate">{user.name}</div>
          <span className="text-white/20 font-mono text-[8px] uppercase tracking-[0.2em] mt-0.5">
            GitHub Contributor
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-8">
        {/* Bio */}
        <p className="text-white/40 text-[11px] leading-relaxed line-clamp-2 italic">
          "{user.bio}"
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-dark p-4 rounded-2xl border border-white/5 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-white/30">
              <Users size={14} />
              <span className="text-[10px] uppercase tracking-widest font-bold">Followers</span>
            </div>
            <span className="text-xl font-black text-white">{user.followers.totalCount}</span>
          </div>
          <div className="glass-dark p-4 rounded-2xl border border-white/5 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-white/30">
              <BookOpen size={14} />
              <span className="text-[10px] uppercase tracking-widest font-bold">Repos</span>
            </div>
            <span className="text-xl font-black text-white">{user.repositories.totalCount}</span>
          </div>
        </div>

        {/* Location & Link */}
        <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
          {user.location && (
            <div className="flex items-center gap-3 text-white/40 group/item cursor-default">
              <MapPin size={14} className="group-hover/item:text-accent-blue transition-colors" />
              <span className="text-[11px] font-medium">{user.location}</span>
            </div>
          )}
          {user.websiteUrl && (
            <a 
              href={user.websiteUrl} 
              target="_blank" 
              className="flex items-center gap-3 text-white/40 hover:text-white transition-all group/link"
            >
              <LinkIcon size={14} className="group-hover/link:text-accent-blue" />
              <span className="text-[11px] font-medium">{user.websiteUrl.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
        </div>

        {/* Activity Status Bar */}
        <div className="mt-4 flex items-center justify-between px-4 py-2 bg-white/[0.02] rounded-xl border border-white/5">
          <div className="flex items-center gap-2">
            <Activity size={12} className="text-accent-blue opacity-50" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono">Status Check</span>
          </div>
          <span className="text-[9px] uppercase tracking-[0.2em] text-accent-blue font-mono">Synchronized</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
