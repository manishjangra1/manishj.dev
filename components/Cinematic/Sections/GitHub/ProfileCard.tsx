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
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="glass p-8 rounded-[2rem] border-white/[0.05] shadow-xl relative group"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-amber/[0.03] blur-3xl -mr-10 -mt-10 group-hover:bg-accent-amber/[0.06] transition-colors duration-700" />
      
      <div className="relative flex items-center gap-6">
        {/* Avatar Section */}
        <div className="relative shrink-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 border border-white/[0.05] rounded-full border-dashed"
          />
          <div className="w-16 h-16 rounded-full overflow-hidden border border-white/[0.1] relative z-10">
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-1000" />
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent-amber border-2 border-background rounded-full z-20 shadow-sm" />
        </div>
        
        <div className="flex flex-col min-w-0">
          <div className="text-xl font-bold text-foreground tracking-tight uppercase truncate">{user.name}</div>
          <span className="text-foreground/20 font-mono text-[7px] uppercase tracking-[0.4em] mt-1.5">
            Full Stack Developer
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-10">
        {/* Bio */}
        <p className="text-foreground/45 text-[11px] leading-relaxed line-clamp-2 italic font-light">
          &quot;Building scalable digital experiences.&quot;
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass p-5 rounded-2xl border border-white/[0.03] flex flex-col gap-1 hover:border-accent-amber/20 transition-all duration-500">
            <div className="flex items-center gap-2 text-foreground/30">
              <Users size={12} />
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold">Followers</span>
            </div>
            <span className="text-2xl font-bold text-foreground tracking-tighter">{user.followers.totalCount}</span>
          </div>
          <div className="glass p-5 rounded-2xl border border-white/[0.03] flex flex-col gap-1 hover:border-accent-amber/20 transition-all duration-500">
            <div className="flex items-center gap-2 text-foreground/30">
              <BookOpen size={12} />
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold">Repos</span>
            </div>
            <span className="text-2xl font-bold text-foreground tracking-tighter">{user.repositories.totalCount}</span>
          </div>
        </div>

        {/* Location & Link */}
        <div className="flex flex-col gap-4 pt-6 border-t border-white/[0.05]">
          {user.location && (
            <div className="flex items-center gap-4 text-foreground/40 group/item cursor-default">
              <MapPin size={14} className="text-accent-amber/40 group-hover/item:text-accent-amber transition-colors" />
              <span className="text-[11px] font-medium tracking-tight">{user.location}</span>
            </div>
          )}
          {user.websiteUrl && (
            <a 
              href={user.websiteUrl} 
              target="_blank" 
              className="flex items-center gap-4 text-foreground/40 hover:text-foreground transition-all group/link"
            >
              <LinkIcon size={14} className="text-accent-amber/40 group-hover/link:text-accent-amber" />
              <span className="text-[11px] font-medium tracking-tight">{user.websiteUrl.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
        </div>

        {/* Activity Status Bar */}
        <div className="mt-2 flex items-center justify-between px-5 py-2.5 bg-white/[0.01] rounded-xl border border-white/[0.05]">
          <div className="flex items-center gap-3">
            <Activity size={12} className="text-accent-amber/30 animate-pulse" />
            <span className="text-[8px] uppercase tracking-[0.4em] text-foreground/30 font-mono">Activity Status</span>
          </div>
          <span className="text-[8px] uppercase tracking-[0.3em] text-accent-amber/60 font-mono font-bold">Active</span>
        </div>
      </div>
    </motion.div>

  );
};

export default ProfileCard;
