'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperienceStore } from '@/lib/store/experience-store';
import Scene from './Scene/Scene';
import IntroPanel from './UI/IntroPanel';
import CommunicationNodes from './UI/CommunicationNodes';
import NavigationDock from './UI/NavigationDock';
import CustomCursor from './Effects/CustomCursor';
import LoadingScreen from './UI/LoadingScreen';
import CommandPalette from './UI/CommandPalette';
import TopSearchBar from './UI/TopSearchBar';
import AIGuide from './UI/AIGuide';
import { History } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

import ProjectsShowcase from './Sections/ProjectsShowcase';
import AboutStory from './Sections/AboutStory';
import SkillsGrid from './Sections/SkillsGrid';
import ExperienceTimeline from './Sections/ExperienceTimeline';
import ContactSection from './Sections/ContactSection';
import ProjectDetails from './Sections/ProjectDetails';
import GitHubSection from './Sections/GitHub/GitHubSection';

const CinematicEngine: React.FC = () => {
  const { isLoaded, setLoaded, activeSection, setGuideMessage } = useExperienceStore();

  useEffect(() => {
    // Simulate loading for the sequence
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [setLoaded]);

  // AI Guide: Onboarding
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setGuideMessage("Explore the different sections to know more about me.");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, setGuideMessage]);

  // AI Guide: Contextual Lines
  useEffect(() => {
    if (!isLoaded) return;
    
    const messages: Record<string, string> = {
      projects: "You are now viewing the Projects section. Select a project to view its details.",
      about: "You are now viewing the About section. Here is more information about my background.",
      skills: "You are now viewing the Technical Skills section. These are my areas of expertise.",
      experience: "You are now viewing the Experience section. This is my professional career timeline.",
      contact: "You are now viewing the Contact section. Feel free to reach out to me here.",
      github: "Synchronizing live development activity and repository data.",
      home: "Welcome back to the Home screen. I am ready to assist you."
    };

    if (messages[activeSection]) {
      // Delay slightly to feel reactive
      const timer = setTimeout(() => {
        setGuideMessage(messages[activeSection]);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [activeSection, isLoaded, setGuideMessage]);

  // AI Guide: Idle Re-engagement
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    
    const resetTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (isLoaded) {
          setGuideMessage("Still exploring? There's more hidden inside the workspace.");
        }
      }, 30000); // 30 seconds idle
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      clearTimeout(idleTimer);
    };
  }, [isLoaded, setGuideMessage]);

  return (
    <div className="relative w-screen h-screen bg-background overflow-hidden font-sans selection:bg-accent-amber/20 selection:text-accent-amber">
      {/* Noise Overlay */}
      <div className="noise" />
      
      {/* Architectural Grid */}
      <div className="micro-grid" />
      
      {/* Background Atmosphere & 3D Scene — hidden during loading to prevent WebGL bleed-through */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {isLoaded && <Scene />}
      </motion.div>

      {/* Sections Layer (Spatial) */}
      <div className="absolute inset-0 z-5">
        <AnimatePresence mode="wait">
          {activeSection === 'projects' && <ProjectsShowcase key="projects" />}
          {activeSection === 'about' && <AboutStory key="about" />}
          {activeSection === 'skills' && <SkillsGrid key="skills" />}
          {activeSection === 'experience' && <ExperienceTimeline key="experience" />}
          {activeSection === 'contact' && <ContactSection key="contact" />}
          {activeSection === 'github' && <GitHubSection key="github" />}
        </AnimatePresence>
      </div>

      {/* UI Overlay */}
      <AnimatePresence>
        {!isLoaded && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="relative z-10 w-full h-full flex flex-col pointer-events-none"
        >
          {/* Top/Mid Section */}
          <div className="flex-1 flex flex-col md:flex-row justify-between p-6 md:p-12 gap-8">
            <motion.div 
              animate={{ 
                opacity: activeSection === 'home' ? 1 : 0,
                x: activeSection === 'home' ? 0 : -50,
                filter: activeSection === 'home' ? 'blur(0px)' : 'blur(10px)'
              }}
              className={activeSection === 'home' ? 'pointer-events-auto' : 'pointer-events-none'}
            >
              <IntroPanel />
            </motion.div>
            <div className={activeSection === 'home' ? 'pointer-events-auto self-end md:self-auto' : 'pointer-events-none self-end md:self-auto'}>
              <CommunicationNodes />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="p-6 md:p-12 flex justify-center items-end pointer-events-auto">
            <NavigationDock />
            
            {/* Archive Link (Bottom Left) */}
            <motion.a
              href="https://v1.manishj.dev"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: activeSection === 'home' ? 1 : 0, 
                x: activeSection === 'home' ? 0 : -20 
              }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="absolute bottom-12 left-12 flex items-center gap-3 px-5 py-3 glass rounded-2xl border-white/[0.05] pointer-events-auto hover:bg-white/[0.02] transition-all duration-700 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-accent-amber/[0.03] opacity-0 group-hover:opacity-100 transition-opacity" />
              <History size={16} className="text-foreground/20 group-hover:text-accent-amber transition-colors duration-500 relative z-10" />
              <div className="flex flex-col relative z-10">
                <span className="text-[11px] font-bold tracking-tight text-foreground/60 group-hover:text-foreground transition-colors duration-500">V1 Portfolio</span>
                <span className="text-[8px] font-mono tracking-[0.3em] text-foreground/20 uppercase">Archive</span>
              </div>
            </motion.a>
          </div>
        </motion.div>
      )}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Command Palette */}
      <CommandPalette />
      <TopSearchBar />
      <AIGuide />
      <ProjectDetails />
    </div>
  );
};

export default CinematicEngine;
