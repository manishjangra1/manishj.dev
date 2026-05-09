'use client';

import React from 'react';
import { Github, Linkedin, Twitter, Mail, Globe, FileText } from 'lucide-react';
import { useOS } from '@/contexts/OSContext';
import { useSettings } from '@/hooks/useData';

const AboutApp: React.FC = () => {
  const { resolvedTheme } = useOS();
  const { settings, isLoading, error } = useSettings();

  const SOCIAL_ICONS: Record<string, any> = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail,
    portfolio: Globe,
    website: Globe
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-500 p-4 text-center">
        {error}
      </div>
    );
  }

  const profile = {
    name: settings?.siteTitle || 'Manish Jangra',
    role: settings?.heroText || 'Full Stack Developer',
    bio: settings?.siteDescription || 'Spatial Computing Enthusiast',
    aboutText: settings?.aboutText || 'I am a full-stack developer dedicated to bridging the gap between traditional web experiences and immersive spatial computing.',
    aboutImage: settings?.aboutImage || '',
  };

  return (
    <div className={`h-full p-8 overflow-y-auto custom-scrollbar flex flex-col md:flex-row gap-12 transition-colors duration-500 ${
      resolvedTheme === 'dark' ? 'bg-zinc-900/50 text-white' : 'bg-white/50 text-zinc-900'
    }`}>
      <div className="w-full md:w-1/3 space-y-6">
        <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl relative overflow-hidden group">
          {profile.aboutImage ? (
            <img 
              src={profile.aboutImage} 
              alt={profile.name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-8xl">👨‍💻</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight">{profile.name}</h2>
          <p className={`text-lg font-medium ${resolvedTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            {profile.role}
          </p>
          <p className="text-sm opacity-60 italic">{profile.bio}</p>
        </div>
      </div>
      
      <div className="flex-1 space-y-10">
        <section>
          <h3 className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2 ${
            resolvedTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
          }`}>
            <span className="w-8 h-px bg-current opacity-20"></span>
            The Story
          </h3>
          <div className={`leading-relaxed text-lg transition-colors space-y-4 ${
            resolvedTheme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'
          }`}>
            {profile.aboutText.split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        <section>
          <h3 className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2 ${
            resolvedTheme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
          }`}>
            <span className="w-8 h-px bg-current opacity-20"></span>
            Connect
          </h3>
          <div className="flex flex-wrap gap-3">
            {settings?.resumeUrl && (
              <a 
                href={settings.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-2xl bg-blue-500 text-white text-sm font-bold tracking-tight hover:bg-blue-600 transition-all hover:scale-105 shadow-xl shadow-blue-500/20 flex items-center gap-3 group"
              >
                <FileText className="w-4 h-4 transition-transform group-hover:rotate-6" />
                Download Resume
              </a>
            )}
            {settings?.socialLinks && Object.entries(settings.socialLinks).map(([platform, url]) => {
              if (!url) return null;
              const Icon = SOCIAL_ICONS[platform.toLowerCase()] || Globe;
              return (
                <a 
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-2xl border text-sm font-bold capitalize transition-all flex items-center gap-3 group ${
                    resolvedTheme === 'dark' 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
                      : 'bg-white border-black/5 shadow-sm hover:shadow-md hover:border-black/10'
                  }`}
                >
                  <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  {platform}
                </a>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutApp;
