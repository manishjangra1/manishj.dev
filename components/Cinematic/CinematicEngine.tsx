'use client';

import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperienceStore, Section } from '@/lib/store/experience-store';
import { useData } from '@/contexts/DataContext';
import { Navbar } from './UI/Navbar';

// Core Sections
import ProjectsShowcase from './Sections/ProjectsShowcase';
import AboutStory from './Sections/AboutStory';
import SkillsGrid from './Sections/SkillsGrid';
import ExperienceTimeline from './Sections/ExperienceTimeline';
import ContactSection from './Sections/ContactSection';
import GitHubSection from './Sections/GitHub/GitHubSection';

// Overlays
import CommandPalette from './UI/CommandPalette';
import ProjectDetails from './Sections/ProjectDetails';
import WhatsAppNode from './UI/WhatsAppNode';
import LiquidGlassCursor from './UI/LiquidGlassCursor';

// Icons & Lucide
import { ArrowDown, FileText, Briefcase, Zap, Terminal, Globe, Calendar, MapPin, Sparkles, Code2 } from 'lucide-react';
import Image from 'next/image';

const CinematicEngine: React.FC = () => {
  const { isLoaded, setLoaded, setActiveSection } = useExperienceStore();
  const { projects, experience, settings } = useData();

  useEffect(() => {
    // Quick load sequence
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, [setLoaded]);

  // Intersection Observer for scroll-aware navigation
  useEffect(() => {
    if (!isLoaded) return;

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as Section);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ['home', 'skills', 'projects', 'experience', 'github', 'about', 'contact'];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoaded, setActiveSection]);

  // Dynamic Metrics Calculation
  const stats = useMemo(() => {
    // 1. Years of Experience calculation
    const startYear = experience.length > 0 
      ? Math.min(...experience.map(e => new Date(e.startDate).getFullYear()))
      : 2021;
    const years = new Date().getFullYear() - startYear;

    // 2. Technologies count calculation
    const uniqueTechs = new Set([
      ...projects.flatMap(p => p.technologies || []),
      ...experience.flatMap(e => e.technologies || []),
    ]);

    return {
      years: years || 4,
      projectsCount: projects.length || 8,
      techsCount: uniqueTechs.size || 15,
    };
  }, [projects, experience]);

  const featuredProject = useMemo(() => {
    return projects.find(p => p.featured) || projects[0];
  }, [projects]);

  const currentWork = useMemo(() => {
    return experience.find(e => e.isCurrent || e.current) || experience[0];
  }, [experience]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleViewFeaturedDetails = () => {
    if (featuredProject) {
      const store = useExperienceStore.getState();
      store.setSelectedProject(featuredProject);
      store.setProjectDetailsOpen(true);
    }
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-200">
        <div className="flex flex-col items-center gap-6">
          <div className="w-48 h-px bg-foreground/10 relative overflow-hidden">
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 w-24 h-full bg-accent-amber"
            />
          </div>
          <span className="text-[9px] uppercase tracking-[0.4em] text-foreground/30 font-mono">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background overflow-x-hidden font-sans text-foreground selection:bg-accent-amber/20 selection:text-accent-amber scroll-smooth">
      {/* Noise Texture */}
      <div className="noise" />

      {/* Vignette Depth Overlay */}
      <div className="vignette" />

      {/* Architectural Grid backdrop */}
      <div className="micro-grid z-0" />

      {/* Sticky Header */}
      <Navbar />

      {/* Scrollable Layout Container */}
      <div className="responsive-container pt-24 pb-12 flex flex-col gap-[72px] md:gap-[96px] lg:gap-[120px] relative z-10">
        
        {/* ========================================================================= */}
        {/* HERO BENTO GRID SECTION */}
        {/* ========================================================================= */}
        <section id="home" className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 scroll-mt-24">
          
          {/* Card 1: Name + Editorial Intro (md:col-span-2 lg:col-span-3) */}
          <div className="md:col-span-2 lg:col-span-3 bento-card flex flex-col justify-between min-h-[380px] group relative overflow-hidden">
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-pulse shadow-[0_0_8px_rgba(214,168,106,0.6)]" />
                <span className="text-[9px] uppercase font-mono tracking-[0.4em] text-accent-amber font-bold">
                  Open to Opportunities
                </span>
              </div>
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-foreground uppercase leading-[0.85]">
                Manish Jangra
              </h1>
              <p className="text-xl sm:text-2xl font-light text-foreground/75 leading-snug tracking-tight max-w-xl">
                Full Stack Engineer specializing in high-quality web applications, system integrations, and modern software solutions.
              </p>
            </div>

            {/* Dynamic Statistics Block */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border-standard">
              <div className="p-4 rounded-[20px] bg-surface-secondary border border-border-standard flex flex-col gap-1">
                <span className="text-2xl font-bold text-accent-amber font-mono tracking-tight">{stats.years}+</span>
                <span className="text-[8px] font-mono uppercase tracking-widest text-text-muted font-bold">Experience</span>
              </div>
              <div className="p-4 rounded-[20px] bg-surface-secondary border border-border-standard flex flex-col gap-1">
                <span className="text-2xl font-bold text-foreground font-mono tracking-tight">{stats.projectsCount}</span>
                <span className="text-[8px] font-mono uppercase tracking-widest text-text-muted font-bold">Projects</span>
              </div>
              <div className="p-4 rounded-[20px] bg-surface-secondary border border-border-standard flex flex-col gap-1">
                <span className="text-2xl font-bold text-foreground font-mono tracking-tight">{stats.techsCount}</span>
                <span className="text-[8px] font-mono uppercase tracking-widest text-text-muted font-bold">Tech Stack</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="relative z-10 flex flex-wrap items-center gap-4 pt-6">
              <button
                onClick={() => handleScrollTo('projects')}
                className="px-6 h-11 bg-accent-amber hover:bg-accent-secondary text-[#121417] text-[10px] uppercase font-bold tracking-widest transition-colors duration-200 rounded-[16px] cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                <span>View Projects</span>
                <ArrowDown size={12} />
              </button>

              <button
                onClick={() => handleScrollTo('skills')}
                className="px-6 h-11 bg-transparent border border-border-standard hover:bg-foreground/5 text-foreground text-[10px] uppercase font-bold tracking-widest transition-colors duration-200 rounded-[16px] flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Code2 size={12} />
                <span>View Skills</span>
              </button>
            </div>
          </div>

          {/* Card 2: Resume / Briefing Card (md:col-span-1 lg:col-span-1) */}
          <div className="md:col-span-1 lg:col-span-1 bento-card flex flex-col justify-between min-h-[380px] relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2 text-foreground/30 font-mono text-[9px] uppercase tracking-widest">
                <FileText size={12} className="text-accent-amber" />
                <span>Professional Resume</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground uppercase tracking-tight">Resume Summary</h3>
                <p className="text-xs text-foreground/50 leading-relaxed font-light">
                  Software Engineer specializing in scalable backend systems and full-stack applications. Experienced in building production-ready solutions using Node.js, TypeScript, NestJS, PostgreSQL, Redis, and AWS, with expertise in APIs, distributed systems, authentication, and performance optimization.
                </p>
              </div>
            </div>

            <div className="relative z-10 space-y-4 pt-6 border-t border-border-standard">
              {settings?.resumeUrl && (
                <a
                  href={settings.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-transparent border border-border-standard hover:bg-foreground/5 text-foreground text-[10px] font-bold uppercase tracking-widest transition-colors duration-200 rounded-[16px] flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Globe size={12} />
                  <span>View Resume</span>
                </a>
              )}
            </div>
          </div>

          {/* Card 3: Featured Project Spot (md:col-span-1 lg:col-span-2) */}
          <div className="md:col-span-1 lg:col-span-2 bento-card flex flex-col justify-between min-h-[280px] group relative overflow-hidden cursor-pointer" onClick={handleViewFeaturedDetails}>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 text-accent-amber font-mono text-[9px] uppercase tracking-widest font-bold">
                <Briefcase size={12} />
                <span>Featured Project</span>
              </div>
              <h3 className="text-2xl font-black text-foreground uppercase tracking-tight truncate w-full group-hover:text-accent-amber transition-colors">
                {featuredProject?.title || 'Featured Project'}
              </h3>
              <p className="text-xs text-foreground/50 leading-relaxed font-light line-clamp-2">
                {featuredProject?.description}
              </p>
            </div>
            <div className="relative z-10 flex items-center justify-between pt-6 border-t border-border-standard">
              <span className="text-[8px] font-mono text-foreground/20 uppercase tracking-widest">Technical Specs</span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-accent-amber group-hover:translate-x-1 transition-transform">View Details →</span>
            </div>
          </div>

          {/* Card 4: Active Work Status Card (md:col-span-1 lg:col-span-1) */}
          <div className="md:col-span-1 lg:col-span-1 bento-card flex flex-col justify-between min-h-[280px] relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 text-foreground/30 font-mono text-[9px] uppercase tracking-widest">
                <Calendar size={12} className="text-accent-amber" />
                <span>Current Status</span>
              </div>
              {currentWork ? (
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-accent-amber font-bold">
                    {currentWork.role}
                  </span>
                  <h3 className="text-xl font-bold text-foreground uppercase tracking-tight">{currentWork.company}</h3>
                  <p className="text-xs text-foreground/50 leading-relaxed font-light line-clamp-2">
                    {currentWork.description[0]}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-foreground uppercase">Available</h3>
                  <p className="text-xs text-foreground/50 font-light leading-relaxed">Open to new full-time software engineering opportunities.</p>
                </div>
              )}
            </div>
            <div className="relative z-10 pt-6 border-t border-border-standard">
              <button 
                onClick={() => handleScrollTo('experience')}
                className="text-[9px] font-mono uppercase tracking-widest text-foreground/40 hover:text-accent-amber transition-colors cursor-pointer"
              >
                View Full Timeline →
              </button>
            </div>
          </div>

          {/* Card 5: High-Level Skills summary (md:col-span-1 lg:col-span-1) */}
          <div className="md:col-span-1 lg:col-span-1 bento-card flex flex-col justify-between min-h-[280px] relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 text-foreground/30 font-mono text-[9px] uppercase tracking-widest">
                <Zap size={12} className="text-accent-amber" />
                <span>Key Skills</span>
              </div>
              <h3 className="text-xl font-bold text-foreground uppercase tracking-tight">Tech Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'AI Systems'].map(tech => (
                  <span key={tech} className="px-2 py-1 rounded bg-surface-secondary border border-border-standard text-[8px] uppercase tracking-wider text-foreground/60 font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative z-10 pt-6 border-t border-border-standard">
              <button 
                onClick={() => handleScrollTo('skills')}
                className="text-[9px] font-mono uppercase tracking-widest text-foreground/40 hover:text-accent-amber transition-colors cursor-pointer"
              >
                View All Skills →
              </button>
            </div>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* SKILLS SECTION */}
        {/* ========================================================================= */}
        <section id="skills" className="w-full space-y-8 scroll-mt-24">
          <div className="flex flex-col gap-1 border-l-2 border-accent-amber pl-4">
            <span className="text-[9px] uppercase tracking-[0.5em] text-accent-amber font-mono font-bold">
              Skills Overview
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground uppercase">
              Technical Skills
            </h2>
          </div>
          <SkillsGrid />
        </section>

        {/* ========================================================================= */}
        {/* PROJECTS SECTION */}
        {/* ========================================================================= */}
        <section id="projects" className="w-full space-y-8 scroll-mt-24">
          <div className="flex flex-col gap-1 border-l-2 border-accent-amber pl-4">
            <span className="text-[9px] uppercase tracking-[0.5em] text-accent-amber font-mono font-bold">
              My Projects
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground uppercase">
              Selected Projects
            </h2>
          </div>
          <ProjectsShowcase />
        </section>

        {/* ========================================================================= */}
        {/* EXPERIENCE TIMELINE SECTION */}
        {/* ========================================================================= */}
        <section id="experience" className="w-full space-y-8 scroll-mt-24">
          <div className="flex flex-col gap-1 border-l-2 border-accent-amber pl-4">
            <span className="text-[9px] uppercase tracking-[0.5em] text-accent-amber font-mono font-bold">
              Career Timeline
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground uppercase">
              Work Experience
            </h2>
          </div>
          <ExperienceTimeline />
        </section>

        {/* ========================================================================= */}
        {/* GITHUB INTEGRATION SECTION */}
        {/* ========================================================================= */}
        <section id="github" className="w-full space-y-8 scroll-mt-24">
          <div className="flex flex-col gap-1 border-l-2 border-accent-amber pl-4">
            <span className="text-[9px] uppercase tracking-[0.5em] text-accent-amber font-mono font-bold">
              GitHub Projects
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground uppercase">
              GitHub Activity
            </h2>
          </div>
          <GitHubSection />
        </section>

        {/* ========================================================================= */}
        {/* ABOUT / PHILOSOPHY SECTION */}
        {/* ========================================================================= */}
        <section id="about" className="w-full space-y-8 scroll-mt-24">
          <div className="flex flex-col gap-1 border-l-2 border-accent-amber pl-4">
            <span className="text-[9px] uppercase tracking-[0.5em] text-accent-amber font-mono font-bold">
              My Story
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground uppercase">
              About Manish
            </h2>
          </div>
          <AboutStory />
        </section>

        {/* ========================================================================= */}
        {/* CONTACT SECTION */}
        {/* ========================================================================= */}
        <section id="contact" className="w-full space-y-8 scroll-mt-24">
          <div className="flex flex-col gap-1 border-l-2 border-accent-amber pl-4">
            <span className="text-[9px] uppercase tracking-[0.5em] text-accent-amber font-mono font-bold">
              Contact Information
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground uppercase">
              Get in Touch
            </h2>
          </div>
          <ContactSection />
        </section>

        {/* ========================================================================= */}
        {/* FOOTER */}
        {/* ========================================================================= */}
        <footer className="w-full pt-12 border-t border-border-standard flex flex-col sm:flex-row justify-between items-center gap-6 text-foreground/40 font-mono text-[9px] uppercase tracking-widest mt-12">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
            <span>© {new Date().getFullYear()} Manish Jangra. All Rights Reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Chandigarh, India</span>
          </div>
        </footer>

      </div>

      {/* Global Command Palette search bar portal */}
      <CommandPalette />
      <ProjectDetails />
      <LiquidGlassCursor />

      {/* Dynamic WhatsApp floating node */}
      <div className="fixed bottom-6 right-6 z-90 pointer-events-auto">
        <WhatsAppNode />
      </div>
    </div>
  );
};

export default CinematicEngine;
