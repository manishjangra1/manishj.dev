'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X, FileText, Home, Briefcase, Code2, History, Github, User, Mail, Search, Sun, Moon } from 'lucide-react';
import { useExperienceStore, Section } from '@/lib/store/experience-store';
import { useData } from '@/contexts/DataContext';
import { useTheme } from '@/contexts/ThemeContext';

const navItems: { label: string; id: Section; icon: any }[] = [
  { label: 'Home', id: 'home', icon: Home },
  { label: 'Projects', id: 'projects', icon: Briefcase },
  { label: 'Experience', id: 'experience', icon: History },
  { label: 'GitHub', id: 'github', icon: Github },
  { label: 'Skills', id: 'skills', icon: Code2 },
  { label: 'About', id: 'about', icon: User },
  { label: 'Contact', id: 'contact', icon: Mail },
];

export const Navbar: React.FC = () => {
  const { activeSection, setActiveSection, setIsCommandPaletteOpen } = useExperienceStore();
  const { settings } = useData();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset scroll slightly for navbar height
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id as Section);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-100 w-full transition-all duration-300 border-b ${
      scrolled 
        ? 'bg-background/85 backdrop-blur-md border-border-standard shadow-md' 
        : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / GitHub Avatar */}
        <button 
          onClick={() => handleScrollTo('home')}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border-standard bg-surface-secondary flex items-center justify-center transition-all group-hover:border-accent-amber/50">
            <img 
              src="https://github.com/manishjangra1.png"
              alt="Manish Jangra"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-foreground/40 group-hover:text-foreground/75 transition-colors">
            Portfolio
          </span>
        </button>
 
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 glass py-1.5 px-3 rounded-full">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest transition-all cursor-pointer ${
                  isActive ? 'text-accent-amber' : 'text-foreground/50 hover:text-foreground/80'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-navbar-indicator"
                    className="absolute inset-0 bg-accent-amber/5 border border-accent-amber/10 rounded-full z-[-1]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions (Search CTA & Theme & Resume) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-8 h-8 rounded-lg glass hover:bg-surface-secondary flex items-center justify-center text-foreground/45 hover:text-accent-secondary transition-colors cursor-pointer"
            title="Search palette"
          >
            <Search size={14} />
          </button>

          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg glass hover:bg-surface-secondary flex items-center justify-center text-foreground/45 hover:text-accent-secondary transition-colors cursor-pointer"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {settings?.resumeUrl && (
            <a
              href={settings.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-1.5 bg-transparent border border-border-standard hover:bg-surface-secondary text-[10px] font-bold uppercase tracking-wider text-foreground hover:text-accent-secondary transition-colors duration-200 rounded-[14px] cursor-pointer shadow-xs"
            >
              <FileText size={12} />
              <span>Resume</span>
            </a>
          )}
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg glass hover:bg-surface-secondary flex items-center justify-center text-foreground/45 hover:text-accent-secondary transition-colors cursor-pointer"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-8 h-8 rounded-lg glass hover:bg-surface-secondary flex items-center justify-center text-foreground/45 hover:text-accent-secondary transition-colors cursor-pointer"
          >
            <Search size={14} />
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 rounded-lg glass hover:bg-surface-secondary flex items-center justify-center text-foreground/50 hover:text-accent-secondary transition-colors cursor-pointer"
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border-standard bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleScrollTo(item.id)}
                      className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-black/5 text-accent-amber border border-black/5' 
                          : 'hover:bg-surface-secondary text-foreground/60 border border-transparent'
                      }`}
                    >
                      <item.icon size={16} className={isActive ? 'text-accent-amber' : 'text-foreground/40'} />
                      <span className="text-[11px] uppercase tracking-widest font-bold">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {settings?.resumeUrl && (
                <a
                  href={settings.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 bg-transparent border border-border-standard hover:bg-surface-secondary flex items-center justify-center gap-2.5 text-[10px] font-bold uppercase tracking-wider text-foreground hover:text-accent-secondary transition-colors duration-200 rounded-[14px] shadow-sm mt-2"
                >
                  <FileText size={14} />
                  <span>Download Resume</span>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
