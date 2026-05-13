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

    return results.slice(0, 8);
  }, [query, projects, skills, experience]);

  const combinedList = useMemo(() => {
    return query ? [...filteredResults, ...staticActions] : staticActions;
  }, [query, filteredResults, staticActions]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item: any) => {
    if (item.type === 'navigation') {
      setActiveSection(item.id as Section);
    } else if (item.type === 'project') {
      setActiveSection('projects');
      setSelectedProject(item);
      setTimeout(() => setProjectDetailsOpen(true), 800);
    } else if (item.type === 'skill') {
      setActiveSection('skills');
    } else if (item.type === 'experience') {
      setActiveSection('experience');
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
        <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-xl glass rounded-3xl overflow-hidden shadow-2xl border-white/10"
          >
            <div className="p-5 border-b border-white/10 flex items-center gap-4">
              <Search className="text-accent-blue" size={20} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anything... (projects, skills, story)"
                className="bg-transparent border-none outline-none text-white w-full text-lg placeholder:text-white/20"
              />
              <div className="flex items-center gap-1 px-2 py-1 glass rounded text-[10px] text-white/40 font-mono">
                <CommandIcon size={10} /> K
              </div>
            </div>

            <div className="p-3 max-h-[60vh] overflow-y-auto scrollbar-hide">
              {/* Dynamic Results */}
              {query && filteredResults.length > 0 && (
                <div className="mb-4">
                  <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-white/20 font-mono">Search Results</div>
                  {filteredResults.map((result: any, index: number) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <button
                        key={`${result.type}-${result._id}`}
                        onClick={() => handleSelect(result)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center justify-between p-3 rounded-2xl transition-colors group text-left ${isSelected ? 'bg-white/10' : 'hover:bg-white/5'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl glass flex items-center justify-center transition-colors ${isSelected ? 'text-accent-blue' : 'text-white/40 group-hover:text-accent-blue'}`}>
                            <result.icon size={18} />
                          </div>
                          <div className="flex flex-col">
                            <span className={`font-medium transition-colors ${isSelected ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>{result.label}</span>
                            <span className="text-[10px] text-white/20 uppercase tracking-widest">{result.type}</span>
                          </div>
                        </div>
                        <Zap size={14} className={`transition-colors ${isSelected ? 'text-accent-blue/60' : 'text-white/0 group-hover:text-accent-blue/40'}`} />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Static Navigation */}
              <div>
                <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-white/20 font-mono">
                  {query ? 'Navigation' : 'Quick Navigation'}
                </div>
                {staticActions.map((action, index) => {
                  const actualIndex = query ? index + filteredResults.length : index;
                  const isSelected = actualIndex === selectedIndex;
                  return (
                    <button
                      key={action.id}
                      onClick={() => handleSelect(action)}
                      onMouseEnter={() => setSelectedIndex(actualIndex)}
                      className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-colors group text-left ${isSelected ? 'bg-white/10' : 'hover:bg-white/5'}`}
                    >
                      <div className={`w-10 h-10 rounded-xl glass flex items-center justify-center transition-colors ${isSelected ? 'text-accent-blue' : 'text-white/40 group-hover:text-accent-blue'}`}>
                        <action.icon size={18} />
                      </div>
                      <span className={`transition-colors ${isSelected ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                        {action.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {query && filteredResults.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-white/20 text-sm">No matches found for &quot;{query}&quot;</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-white/[0.02] border-t border-white/10 flex justify-between items-center text-[10px] uppercase tracking-widest text-white/20 font-mono">
              <span>Press ESC to close</span>
              <div className="flex items-center gap-4">
                <span>↑↓ to navigate</span>
                <span>ENTER to select</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
