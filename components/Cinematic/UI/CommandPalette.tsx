'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command as CommandIcon, Home, Briefcase, User, Mail, Sparkles, History, Code2, Zap } from 'lucide-react';
import { useExperienceStore, Section } from '@/lib/store/experience-store';
import { useData } from '@/contexts/DataContext';

const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen: isOpen, setIsCommandPaletteOpen: setIsOpen, setActiveSection, setSelectedProject, setProjectDetailsOpen } = useExperienceStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { projects, skills, experience } = useData();

  const staticActions = useMemo(() => [
    { icon: Home, label: 'Go to Home', id: 'home', type: 'navigation' },
    { icon: Briefcase, label: 'View Projects', id: 'projects', type: 'navigation' },
    { icon: History, label: 'Experience History', id: 'experience', type: 'navigation' },
    { icon: Code2, label: 'Technical Skills', id: 'skills', type: 'navigation' },
    { icon: User, label: 'Read Story', id: 'about', type: 'navigation' },
    { icon: Mail, label: 'Get in Touch', id: 'contact', type: 'navigation' },
  ], []);

  const filteredResults = useMemo(() => {
    if (!query) return [];

    const searchStr = query.toLowerCase();
    const results: any[] = [];

    projects.forEach(p => {
      if (p.title.toLowerCase().includes(searchStr) || p.description.toLowerCase().includes(searchStr)) {
        results.push({ ...p, type: 'project', icon: Briefcase, label: p.title });
      }
    });

    skills.forEach(s => {
      if (s.name.toLowerCase().includes(searchStr)) {
        results.push({ ...s, type: 'skill', icon: Zap, label: s.name });
      }
    });

    experience.forEach(e => {
      if (e.company.toLowerCase().includes(searchStr) || e.role.toLowerCase().includes(searchStr)) {
        results.push({ ...e, type: 'experience', icon: History, label: `${e.role} @ ${e.company}` });
      }
    });

    return results.slice(0, 6);
  }, [query, projects, skills, experience]);

  const combinedList = useMemo(() => {
    return query ? [...filteredResults, ...staticActions] : staticActions;
  }, [query, filteredResults, staticActions]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item: any) => {
    if (item.type === 'navigation') {
      const element = document.getElementById(item.id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        setActiveSection(item.id as Section);
      }
    } else if (item.type === 'project') {
      const element = document.getElementById('projects');
      if (element) {
        window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      }
      setSelectedProject(item);
      setTimeout(() => setProjectDetailsOpen(true), 600);
    } else if (item.type === 'skill') {
      const element = document.getElementById('skills');
      if (element) {
        window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      }
    } else if (item.type === 'experience') {
      const element = document.getElementById('experience');
      if (element) {
        window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      }
    }
    
    setIsOpen(false);
    setQuery('');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (!isOpen) return;

      if (e.key === 'Escape') setIsOpen(false);
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % combinedList.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + combinedList.length) % combinedList.length);
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSelect(combinedList[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen, combinedList, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-1000 flex items-start justify-center pt-[15vh] px-4 bg-black/15 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-xl bg-surface-primary/85 border border-border-standard rounded-2xl overflow-hidden shadow-lg backdrop-blur-xl"
          >
            {/* Input area */}
            <div className="p-4 border-b border-border-standard flex items-center gap-3.5 bg-surface-secondary/20">
              <Search className="text-accent-amber shrink-0" size={18} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search details..."
                className="bg-transparent border-none outline-none text-foreground w-full text-[14px] placeholder:text-text-muted/40 font-light"
              />
              <div className="flex items-center gap-1.5 px-2 py-1 bg-surface-secondary border border-border-standard rounded-lg text-[9px] text-text-muted/70 font-mono">
                <CommandIcon size={8} /> K
              </div>
            </div>

            {/* List items area */}
            <div className="p-2 max-h-[50vh] overflow-y-auto scrollbar-hide">
              {/* Dynamic Results */}
              {query && filteredResults.length > 0 && (
                <div className="mb-2">
                  <div className="px-3 py-1.5 text-[8.5px] uppercase tracking-[0.25em] text-text-muted/50 font-mono font-bold">Search Results</div>
                  {filteredResults.map((result: any, index: number) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <button
                        key={`${result.type}-${result._id}`}
                        onClick={() => handleSelect(result)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-150 group text-left ${isSelected ? 'bg-surface-secondary border border-border-standard' : 'border border-transparent hover:bg-surface-secondary/30'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isSelected ? 'bg-accent-amber/10 text-accent-amber' : 'bg-surface-secondary text-text-muted/65'}`}>
                            <result.icon size={14} />
                          </div>
                          <div className="flex flex-col">
                            <span className={`text-[12px] font-bold transition-colors ${isSelected ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>{result.label}</span>
                            <span className="text-[7.5px] text-text-muted/55 font-mono uppercase tracking-widest">{result.type}</span>
                          </div>
                        </div>
                        <Zap size={10} className={`transition-colors duration-150 ${isSelected ? 'text-accent-amber/70' : 'text-white/0'}`} />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Static Navigation Actions */}
              <div>
                <div className="px-3 py-1.5 text-[8.5px] uppercase tracking-[0.25em] text-text-muted/50 font-mono font-bold">
                  {query ? 'Navigation' : 'Quick Actions'}
                </div>
                {staticActions.map((action, index) => {
                  const actualIndex = query ? index + filteredResults.length : index;
                  const isSelected = actualIndex === selectedIndex;
                  return (
                    <button
                      key={action.id}
                      onClick={() => handleSelect(action)}
                      onMouseEnter={() => setSelectedIndex(actualIndex)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-150 group text-left ${isSelected ? 'bg-surface-secondary border border-border-standard' : 'border border-transparent hover:bg-surface-secondary/30'}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isSelected ? 'bg-accent-amber/10 text-accent-amber' : 'bg-surface-secondary text-text-muted/65'}`}>
                        <action.icon size={14} />
                      </div>
                      <span className={`text-[12px] font-bold transition-colors ${isSelected ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                        {action.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {query && filteredResults.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-text-muted/40 text-xs font-mono">No matching records found.</p>
                </div>
              )}
            </div>

            {/* Sticky keybindings footer */}
            <div className="p-3 bg-surface-secondary/30 border-t border-border-standard flex justify-between items-center text-[9px] uppercase tracking-[0.2em] text-text-muted/60 font-mono font-semibold">
              <span>Esc to close</span>
              <div className="flex items-center gap-4">
                <span>↑↓ to navigate</span>
                <span>Enter to execute</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
