'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command as CommandIcon, Home, Briefcase, User, Mail, Sparkles } from 'lucide-react';
import { useExperienceStore, Section } from '@/lib/store/experience-store';

const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setActiveSection } = useExperienceStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const actions: { icon: any; label: string; id: Section | 'special' }[] = [
    { icon: Home, label: 'Go to Home', id: 'home' },
    { icon: Briefcase, label: 'View Projects', id: 'projects' },
    { icon: User, label: 'Read Story', id: 'about' },
    { icon: Mail, label: 'Get in Touch', id: 'contact' },
    { icon: Sparkles, label: 'Toggle Atmosphere', id: 'special' },
  ];

  const handleAction = (id: Section | 'special') => {
    if (id !== 'special') {
      setActiveSection(id as Section);
    }
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[20vh] px-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-xl glass rounded-2xl overflow-hidden shadow-2xl border-white/10"
          >
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <Search className="text-white/40" size={20} />
              <input
                autoFocus
                placeholder="Search or jump to..."
                className="bg-transparent border-none outline-none text-white w-full text-lg placeholder:text-white/20"
              />
              <div className="flex items-center gap-1 px-2 py-1 glass rounded text-[10px] text-white/40 font-mono">
                <CommandIcon size={10} /> K
              </div>
            </div>

            <div className="p-2">
              {actions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleAction(action.id)}
                  className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="w-8 h-8 flex items-center justify-center text-white/40 group-hover:text-accent-blue transition-colors">
                    <action.icon size={18} />
                  </div>
                  <span className="text-white/80 group-hover:text-white transition-colors">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="p-4 bg-white/[0.02] border-t border-white/10 flex justify-between items-center text-[10px] uppercase tracking-widest text-white/20 font-mono">
              <span>Press ESC to close</span>
              <span>Use arrow keys to navigate</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
