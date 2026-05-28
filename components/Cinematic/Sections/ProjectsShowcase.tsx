'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useData, Project } from '@/contexts/DataContext';
import { useExperienceStore } from '@/lib/store/experience-store';
import { ExternalLink, Github, ChevronRight, ChevronLeft, Plus, Command } from 'lucide-react';

// Premium Spring Presets for expensive, tactile feel
const SPRING_CARD = {
  type: 'spring',
  stiffness: 110,
  damping: 18,
  mass: 0.6
};

const SPRING_DOCK = {
  type: 'spring',
  stiffness: 170,
  damping: 22,
  mass: 0.5
};

const ProjectsShowcase: React.FC = () => {
  const { projects } = useData();
  const { setSelectedProject, setProjectDetailsOpen, setIsCommandPaletteOpen } = useExperienceStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredDockIndex, setHoveredDockIndex] = useState<number | null>(null);
  
  // Track direction of slide transition: 1 = forward/right, -1 = backward/left
  const [direction, setDirection] = useState(0);

  // Refs array to track each dock button card for auto-scrolling
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Ref for the local horizontal scrollbar container
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const handleProjectSelect = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleViewDetails = () => {
    setSelectedProject(projects[currentIndex]);
    setProjectDetailsOpen(true);
  };

  // Apple-style mouse proximity radial spotlight glow coordinate handler
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    currentTarget.style.setProperty('--x', `${x}px`);
    currentTarget.style.setProperty('--y', `${y}px`);
  };

  // Centering Scroll Engine: Smoothly scrolls the local scroll container horizontally 
  // to center the active project card. Eliminates native scrollIntoView horizontal page shifts.
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const activeEl = itemRefs.current[currentIndex];
    
    if (scrollContainer && activeEl) {
      const containerWidth = scrollContainer.clientWidth;
      const elementOffset = activeEl.offsetLeft;
      const elementWidth = activeEl.clientWidth;
      
      // Exact centering formula
      const targetScrollLeft = elementOffset - (containerWidth / 2) + (elementWidth / 2);
      
      scrollContainer.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  // Keyboard control orchestrator (Arrows, numeric hotkeys, and CMD+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events when user is in input fields or command palette
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
      
      // Keys 1-9 direct hotkeys jumping
      if (/^[1-9]$/.test(e.key)) {
        const index = parseInt(e.key, 10) - 1;
        if (index < projects.length) {
          e.preventDefault();
          handleProjectSelect(index);
        }
      }

      // CMD+K or CTRL+K command palette trigger
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev, projects.length, currentIndex]);

  if (!projects || projects.length === 0) return null;

  const currentProject = projects[currentIndex];

  // Dynamic Theme Glow tailored to specific projects to elevate cinematic feeling
  const getThemeGlow = (index: number) => {
    const project = projects[index];
    if (!project) return 'rgba(214, 168, 106, 0.08)'; // Default warm amber
    const name = project.title.toLowerCase();
    if (name.includes('dayzo')) return 'rgba(214, 168, 106, 0.09)'; // Gold/Bronze
    if (name.includes('servyq')) return 'rgba(56, 136, 255, 0.09)'; // Cyber Blue
    if (name.includes('sahaayikaa') || name.includes('sahaayika')) return 'rgba(16, 185, 129, 0.09)'; // Emerald Green
    return 'rgba(214, 168, 106, 0.08)';
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between py-6 px-6 md:px-12 pointer-events-none select-none overflow-hidden">
      
      {/* 1. ARCHITECTURAL HEADER OVERVIEW */}
      <div className="w-full max-w-6xl flex justify-between items-center z-20 mt-4 pointer-events-auto shrink-0">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] uppercase tracking-[0.5em] text-accent-amber font-mono">
            SELECTED PROJECTS
          </span>
          <span className="text-foreground/30 text-[9px] font-mono flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-amber activity-pulse" />
            Project {currentIndex + 1} of {projects.length}
          </span>
        </div>

        {/* Floating Quick Navigation Hints */}
        <div className="hidden md:flex items-center gap-4 text-foreground/35 font-mono text-[9px] uppercase tracking-widest bg-white/[0.01] border border-white/[0.03] px-3 py-1.5 rounded-full backdrop-blur-md">
          <span className="flex items-center gap-1.5">
            <Command size={10} className="text-accent-amber" /> + K Search
          </span>
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <span>← / → Navigate</span>
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <span>Press 1-{projects.length}</span>
        </div>
      </div>

      {/* 2. SPATIAL DECK VIEWPORT (Height Optimized to fit laptop screens cleanly) */}
      <div className="w-full max-w-7xl flex-1 flex items-center justify-center relative z-10 my-1">

        {/* Spatial Deck Assembly with responsive container height */}
        <div className="flex-1 h-[320px] sm:h-[340px] md:h-[360px] lg:h-[380px] relative flex items-center justify-center pointer-events-auto overflow-visible">
          
          {/* Carousel Arrow Navigation - Left (Moved inside and absolutely positioned close to featured card) */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous Project"
            className="glass w-10 h-10 rounded-full hidden md:flex items-center justify-center text-foreground/45 border-white/[0.04] hover:text-accent-amber hover:border-accent-amber/30 hover:shadow-[0_0_24px_rgba(214,168,106,0.12)] transition-all duration-500 hover:scale-105 pointer-events-auto shrink-0 z-35 absolute left-[calc(50%-336px-56px)] top-1/2 -translate-y-1/2"
          >
            <ChevronLeft size={18} />
          </button>

          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            
            {/* Peeking Left Card Context */}
            {projects[currentIndex - 1] && (
              <motion.button
                key={`peek-left-${projects[currentIndex - 1]._id}`}
                onClick={() => handleProjectSelect(currentIndex - 1)}
                initial={{ opacity: 0, x: -180, rotateY: 35, scale: 0.65 }}
                animate={{ opacity: 0.22, x: -280, rotateY: 22, scale: 0.78, filter: 'blur(5px)' }}
                exit={{ opacity: 0, x: -360, scale: 0.6 }}
                transition={SPRING_CARD}
                className="absolute left-0 w-[200px] h-[240px] md:h-[270px] lg:h-[280px] rounded-3xl glass border border-white/[0.03] overflow-hidden cursor-pointer flex flex-col items-center justify-center hidden lg:flex select-none shadow-2xl hover:opacity-35 transition-opacity"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
                {projects[currentIndex - 1].image && (
                  <Image 
                    src={projects[currentIndex - 1].image!} 
                    alt="" 
                    fill 
                    sizes="200px" 
                    className="object-cover opacity-20 filter grayscale blur-[1px]" 
                  />
                )}
                <span className="z-20 text-[9px] uppercase font-mono tracking-[0.25em] text-foreground/40 mt-auto mb-6 text-center px-4 font-bold truncate w-full">
                  {projects[currentIndex - 1].title}
                </span>
              </motion.button>
            )}

            {/* FEATURED ACTIVE CARD CONTAINER */}
            <motion.div
              key={`active-space-${currentProject._id}`}
              custom={direction}
              initial={{ opacity: 0, scale: 0.93, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.93, y: -12, filter: 'blur(8px)' }}
              transition={SPRING_CARD}
              // Drag gesture orchestration on mobile
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={(e, info) => {
                const threshold = 80;
                if (info.offset.x < -threshold) next();
                else if (info.offset.x > threshold) prev();
              }}
              onClick={handleViewDetails}
              className="w-full max-w-2xl h-[290px] sm:h-[310px] md:h-[330px] lg:h-[350px] rounded-[2rem] glass border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col p-5 md:py-6 md:px-8 absolute left-0 right-0 top-0 bottom-0 mx-auto my-auto group z-20 cursor-pointer"
            >
              {/* Soft interior linear gradient for luxury styling */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.005] to-white/[0.015] pointer-events-none" />
              
              {/* Dynamic Project Corner Image overlay */}
              <div className="absolute top-0 right-0 w-[220px] h-[220px] pointer-events-none overflow-hidden opacity-25 group-hover:opacity-35 transition-opacity duration-700">
                {currentProject.image && (
                  <Image 
                    src={currentProject.image} 
                    alt="" 
                    fill 
                    sizes="300px"
                    className="object-cover filter blur-[3px]" 
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-background/50 to-background" />
              </div>

              {/* Main Card Grid */}
              <div className="h-full flex flex-col justify-between relative z-10">
                
                {/* Meta Tag & Title */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-amber shadow-[0_0_8px_rgba(214,168,106,0.6)]" />
                    <span className="text-[9px] uppercase tracking-[0.4em] text-accent-amber font-mono font-bold">
                      FEATURED PROJECT
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-[1.1] uppercase truncate w-full">
                    {currentProject.title}
                  </h2>
                </div>

                {/* Description Text with tightened clamps */}
                <p className="text-foreground/60 text-xs sm:text-sm md:text-[13.5px] leading-relaxed font-light max-w-lg line-clamp-2 my-2">
                  {currentProject.description}
                </p>

                {/* Tech stack tags grid */}
                <div className="flex flex-wrap gap-1.5 max-w-md my-1.5">
                  {currentProject.technologies?.slice(0, 5).map((tech: string) => (
                    <span 
                      key={tech} 
                      className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/[0.04] text-[8px] uppercase tracking-wider text-foreground/45 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {currentProject.technologies && currentProject.technologies.length > 5 && (
                    <span className="px-2 py-0.5 rounded bg-accent-amber/10 border border-accent-amber/25 text-[8px] uppercase tracking-widest text-accent-amber font-mono font-bold">
                      +{currentProject.technologies.length - 5} MORE
                    </span>
                  )}
                </div>

                {/* Premium Interactive Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-2 border-t border-white/[0.04] shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleViewDetails}
                    className="glass px-5 py-3 rounded-xl flex items-center gap-2.5 group relative overflow-hidden pointer-events-auto border border-white/[0.06] shadow-lg"
                  >
                    <Plus size={12} className="text-accent-amber group-hover:rotate-90 transition-transform duration-500" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground relative z-10">
                      View Details
                    </span>
                    <div className="absolute inset-0 bg-accent-amber/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent-amber/35" />
                  </motion.button>

                  <div className="flex gap-6 items-center">
                    {currentProject.liveUrl && (
                      <a 
                        href={currentProject.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-foreground/45 hover:text-accent-amber transition-all duration-300 group pointer-events-auto"
                      >
                        <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Live Link</span>
                      </a>
                    )}
                    {currentProject.githubUrl && (
                      <a 
                        href={currentProject.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 text-foreground/45 hover:text-accent-amber transition-all duration-300 group pointer-events-auto"
                      >
                        <Github size={12} />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Source</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Peeking Right Card Context */}
            {projects[currentIndex + 1] && (
              <motion.button
                key={`peek-right-${projects[currentIndex + 1]._id}`}
                onClick={() => handleProjectSelect(currentIndex + 1)}
                initial={{ opacity: 0, x: 180, rotateY: -35, scale: 0.65 }}
                animate={{ opacity: 0.22, x: 280, rotateY: -22, scale: 0.78, filter: 'blur(5px)' }}
                exit={{ opacity: 0, x: 360, scale: 0.6 }}
                transition={SPRING_CARD}
                className="absolute right-0 w-[200px] h-[240px] md:h-[270px] lg:h-[280px] rounded-3xl glass border border-white/[0.03] overflow-hidden cursor-pointer flex flex-col items-center justify-center hidden lg:flex select-none shadow-2xl hover:opacity-35 transition-opacity"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
                {projects[currentIndex + 1].image && (
                  <Image 
                    src={projects[currentIndex + 1].image!} 
                    alt="" 
                    fill 
                    sizes="200px" 
                    className="object-cover opacity-20 filter grayscale blur-[1px]" 
                  />
                )}
                <span className="z-20 text-[9px] uppercase font-mono tracking-[0.25em] text-foreground/40 mt-auto mb-6 text-center px-4 font-bold truncate w-full">
                  {projects[currentIndex + 1].title}
                </span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Carousel Arrow Navigation - Right (Moved inside and absolutely positioned close to featured card) */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next Project"
            className="glass w-10 h-10 rounded-full hidden md:flex items-center justify-center text-foreground/45 border-white/[0.04] hover:text-accent-amber hover:border-accent-amber/30 hover:shadow-[0_0_24px_rgba(214,168,106,0.12)] transition-all duration-500 hover:scale-105 pointer-events-auto shrink-0 z-35 absolute left-[calc(50%+336px+16px)] top-1/2 -translate-y-1/2"
          >
            <ChevronRight size={18} />
          </button>

        </div>

      </div>

      {/* 3. TACTILE PROGRESS TIMELINE INDICATOR */}
      <div className="w-full max-w-sm flex flex-col items-center gap-1.5 z-10 pointer-events-auto shrink-0 my-1">
        <div className="w-full h-[2px] bg-white/[0.03] rounded-full overflow-hidden relative border border-white/[0.005]">
          {/* Active progress color beam */}
          <motion.div 
            initial={{ width: '0%' }}
            animate={{ width: `${((currentIndex + 1) / projects.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            className="absolute left-0 top-0 h-full bg-accent-amber shadow-[0_0_8px_rgba(214,168,106,0.85)]"
          />
        </div>
        <div className="flex justify-between w-full text-[8px] font-mono tracking-[0.2em] text-foreground/20 uppercase font-semibold">
          <span>First</span>
          <span className="text-accent-amber/40">Navigator</span>
          <span>Last</span>
        </div>
      </div>

      {/* 4. PREMIUM PROJECT DOCK / PREVIEW RAIL (Margin raised to mb-16/mb-20 to float cleanly above navigation bar) */}
      <div className="w-full max-w-3xl relative z-20 pointer-events-auto shrink-0 mb-16 md:mb-20">
        {/* Soft edge masking masks */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />

        {/* Increased vertical padding py-5 md:py-6 px-6 flex items-center justify-start gap-3 md:gap-4 scroll-smooth */}
        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto scrollbar-hide py-5 md:py-6 px-6 flex items-center justify-start gap-3 md:gap-4 scroll-smooth"
        >
          {projects.map((project, index) => {
            const isActive = index === currentIndex;
            const isHovered = hoveredDockIndex === index;
            
            return (
              <motion.button
                key={`dock-item-${project._id}`}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onClick={() => handleProjectSelect(index)}
                onMouseEnter={() => setHoveredDockIndex(index)}
                onMouseLeave={() => setHoveredDockIndex(null)}
                onMouseMove={handleMouseMove}
                style={{ originY: 1 }} // Expand upward macOS-style
                animate={{
                  scale: isActive ? 1.08 : isHovered ? 1.02 : 1,
                  y: isActive ? -8 : 0
                }}
                transition={SPRING_DOCK}
                className={`relative shrink-0 w-[140px] md:w-[165px] h-[72px] rounded-xl flex items-center p-2 overflow-hidden transition-colors border group ${
                  isActive 
                    ? 'bg-transparent border-accent-amber/30 shadow-[0_8px_20px_rgba(214,168,106,0.06)]' 
                    : 'bg-transparent border-white/[0.04] hover:bg-white/[0.01] hover:border-white/[0.06]'
                }`}
              >
                {/* Micro spotlight hover spotlight (CSS coordinates custom variables) */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(214,168,106,0.06),transparent_60%)] transition-opacity duration-300 pointer-events-none" />

                {/* Left Mini Thumbnail */}
                <div className="w-9 h-9 rounded-lg overflow-hidden relative bg-transparent border border-white/[0.05] shrink-0">
                  {project.image && (
                    <Image 
                      src={project.image} 
                      alt="" 
                      fill 
                      sizes="60px"
                      className={`object-cover ${isActive ? 'filter-none opacity-80' : 'filter grayscale opacity-45 group-hover:grayscale-0 group-hover:opacity-65'} transition-all duration-500`}
                    />
                  )}
                </div>

                {/* Right Text Block */}
                <div className="flex flex-col text-left ml-2.5 overflow-hidden">
                  <span className={`text-[9.5px] uppercase tracking-wider font-bold truncate ${isActive ? 'text-accent-amber' : 'text-foreground/50 group-hover:text-foreground/75'} transition-colors`}>
                    {project.title}
                  </span>
                  
                  {/* Single technology tag */}
                  <span className="text-[7px] tracking-widest uppercase font-mono text-foreground/20 truncate mt-0.5">
                    {project.technologies?.[0] || 'Simulation'}
                  </span>
                </div>

                {/* Active bottom beam indicator */}
                {isActive && (
                  <motion.span 
                    layoutId="active-dock-beam"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent-amber shadow-[0_0_8px_rgba(214,168,106,1)] rounded-full z-15"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 5. BACKGROUND DEPTH & AMBIENT COLOR LIGHT MESH */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`ambient-bg-space-${currentProject._id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none"
        >
          {/* Custom color mesh blending */}
          <div 
            style={{ 
              background: `radial-gradient(circle at 50% 50%, ${getThemeGlow(currentIndex)}, transparent 70%)`,
              filter: 'blur(100px)'
            }}
            className="absolute inset-0 opacity-100" 
          />
          
          {/* High blur scale preview background */}
          {currentProject.image && (
            <Image 
              src={currentProject.image} 
              alt="" 
              fill
              sizes="80px"
              quality={10}
              priority
              className="object-cover scale-110 blur-[80px] opacity-25" 
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default ProjectsShowcase;
