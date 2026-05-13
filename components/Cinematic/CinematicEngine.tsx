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

import ProjectsShowcase from './Sections/ProjectsShowcase';
import AboutStory from './Sections/AboutStory';
import SkillsGrid from './Sections/SkillsGrid';
import ExperienceTimeline from './Sections/ExperienceTimeline';
import ContactSection from './Sections/ContactSection';
import ProjectDetails from './Sections/ProjectDetails';

const CinematicEngine: React.FC = () => {
  const { isLoaded, setLoaded, activeSection } = useExperienceStore();

  useEffect(() => {
    // Simulate loading for the sequence
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [setLoaded]);

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden font-sans selection:bg-accent-blue/30">
      {/* Noise Overlay */}
      <div className="noise" />
      
      {/* Background Atmosphere & 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* Sections Layer (Spatial) */}
      <div className="absolute inset-0 z-5">
        <AnimatePresence mode="wait">
          {activeSection === 'projects' && <ProjectsShowcase key="projects" />}
          {activeSection === 'about' && <AboutStory key="about" />}
          {activeSection === 'skills' && <SkillsGrid key="skills" />}
          {activeSection === 'experience' && <ExperienceTimeline key="experience" />}
          {activeSection === 'contact' && <ContactSection key="contact" />}
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
              className="pointer-events-auto"
            >
              <IntroPanel />
            </motion.div>
            <div className="pointer-events-auto self-end md:self-auto">
              <CommunicationNodes />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="p-6 md:p-12 flex justify-center items-end pointer-events-auto">
            <NavigationDock />
          </div>
        </motion.div>
      )}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Command Palette */}
      <CommandPalette />
      <ProjectDetails />
    </div>
  );
};

export default CinematicEngine;
