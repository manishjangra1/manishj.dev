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
      className="glass p-8 rounded-[2.5rem] border-white/10 shadow-2xl relative overflow-hidden group"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 blur-3xl -mr-10 -mt-10 group-hover:bg-accent-blue/10 transition-colors" />
      
      <div className="relative flex flex-col gap-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 border border-white/10 rounded-full border-dashed"
            />
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 relative z-10 shadow-xl">
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-accent-blue border-2 border-black rounded-full z-20 shadow-lg" />
          </div>
          
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold text-white tracking-tighter uppercase leading-tight">{user.name}</div>
            <span className="text-white/20 font-mono text-[9px] uppercase tracking-widest mt-1">
              GitHub Contributor
            </span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-white/50 text-sm leading-relaxed">
          {user.bio}
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
